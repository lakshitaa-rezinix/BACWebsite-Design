// Off-box backup of uploaded files (certificates + resumes) to S3.
//
//   node backup-to-s3.js            back up anything new or changed
//   node backup-to-s3.js --all      re-upload everything, ignoring the manifest
//   node backup-to-s3.js --restore  pull files from S3 that are missing locally
//
// WHY NOT `aws s3 sync`: sync lists the destination bucket to diff it, which
// needs s3:ListBucket. The bac-certificates-dev IAM user is currently granted
// object-level permissions only, so sync fails with AccessDenied. This script
// instead tracks what it has uploaded in a local manifest and only needs
// PutObject/GetObject. If ListBucket is added later, --restore gets more
// capable, but nothing here breaks either way.
//
// Local disk stays the source of truth; S3 is purely the durability net.
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

const UPLOAD_DIR = path.join(__dirname, "uploads");
const MANIFEST = path.join(__dirname, ".s3-backup-manifest.json");
const BUCKET = process.env.CERTIFICATES_BUCKET;
const REGION = process.env.AWS_REGION || "ap-south-1";
const PREFIX = "uploads/";

if (!BUCKET) {
  console.log("CERTIFICATES_BUCKET is not set — skipping backup.");
  process.exit(0);
}

// Credentials come from the environment, or from the instance role if the
// EC2 box has one attached (in which case the env vars can be omitted).
const s3 = new S3Client({ region: REGION });

const CONTENT_TYPES = { ".pdf": "application/pdf" };

function walk(dir, base = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs, rel));
    else if (entry.isFile() && !entry.name.startsWith(".")) {
      const st = fs.statSync(abs);
      out.push({ rel, abs, size: st.size, mtime: Math.floor(st.mtimeMs) });
    }
  }
  return out;
}

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

async function backup({ all }) {
  const files = walk(UPLOAD_DIR);
  if (!files.length) {
    console.log(`${new Date().toISOString()}  No files in ${UPLOAD_DIR} — nothing to back up.`);
    return;
  }

  const manifest = all ? {} : readManifest();
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const f of files) {
    const prev = manifest[f.rel];
    // Size + mtime is enough to spot a changed file; uploads are write-once in
    // practice, so this avoids hashing every PDF on every run.
    if (prev && prev.size === f.size && prev.mtime === f.mtime) {
      skipped++;
      continue;
    }
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: PREFIX + f.rel,
          Body: fs.createReadStream(f.abs),
          ContentLength: f.size,
          ContentType: CONTENT_TYPES[path.extname(f.rel).toLowerCase()] || "application/octet-stream",
          ServerSideEncryption: "AES256",
        })
      );
      manifest[f.rel] = { size: f.size, mtime: f.mtime, uploadedAt: new Date().toISOString() };
      uploaded++;
    } catch (err) {
      failed++;
      console.error(`  FAILED  ${f.rel}: ${err.name} — ${err.message}`);
    }
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(
    `${new Date().toISOString()}  Backup complete — ${uploaded} uploaded, ` +
      `${skipped} unchanged, ${failed} failed  (s3://${BUCKET}/${PREFIX})`
  );
  if (failed) process.exitCode = 1;
}

async function restore() {
  console.log(`Restoring from s3://${BUCKET}/${PREFIX} into ${UPLOAD_DIR}`);
  let keys = [];
  try {
    let token;
    do {
      const page = await s3.send(
        new ListObjectsV2Command({ Bucket: BUCKET, Prefix: PREFIX, ContinuationToken: token })
      );
      keys.push(...(page.Contents || []).map((o) => o.Key));
      token = page.IsTruncated ? page.NextContinuationToken : undefined;
    } while (token);
  } catch (err) {
    console.error(
      `Cannot list the bucket (${err.name}). Restore needs s3:ListBucket on\n` +
        `  arn:aws:s3:::${BUCKET}\n` +
        `Add it to the IAM policy, or restore by hand from the S3 console.`
    );
    process.exit(1);
  }

  let restored = 0;
  for (const key of keys) {
    const rel = key.slice(PREFIX.length);
    if (!rel) continue;
    const dest = path.join(UPLOAD_DIR, rel);
    if (fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    await new Promise((res, rej) =>
      obj.Body.pipe(fs.createWriteStream(dest)).on("finish", res).on("error", rej)
    );
    restored++;
  }
  console.log(`Restore complete — ${restored} file(s) written, ${keys.length} in bucket.`);
}

(async () => {
  if (process.argv.includes("--restore")) await restore();
  else await backup({ all: process.argv.includes("--all") });
})().catch((err) => {
  console.error("Backup failed:", err.name, "—", err.message);
  process.exit(1);
});
