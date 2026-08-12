// One-off migration: moves the blog posts that used to be hard-coded in
// src/app/data/blog-posts.ts into MongoDB so they can be edited from the admin
// panel. Safe to re-run — posts are matched on slug and skipped if present.
//
//   cd server && node seed-blog.js
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Blog = require("./models/Blog");

async function seedBlog() {
  const seedPath = path.join(__dirname, "blog-seed.json");
  if (!fs.existsSync(seedPath)) {
    console.error("blog-seed.json not found — nothing to migrate.");
    process.exit(1);
  }
  const posts = JSON.parse(fs.readFileSync(seedPath, "utf8"));

  await mongoose.connect(process.env.MONGODB_URI);

  let created = 0;
  let skipped = 0;
  for (const post of posts) {
    if (await Blog.exists({ slug: post.slug })) {
      skipped++;
      continue;
    }
    await Blog.create({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      date: new Date(post.date),
      author: post.author,
      category: post.category,
      isPublished: true,
    });
    created++;
  }

  console.log(`Blog migration complete — ${created} created, ${skipped} already present.`);
  await mongoose.disconnect();
}

seedBlog().catch((err) => {
  console.error("Blog migration failed:", err.message);
  process.exit(1);
});
