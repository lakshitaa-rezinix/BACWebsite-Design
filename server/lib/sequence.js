const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

/**
 * Allocate the next human-readable id, e.g. PT-2026-001 / CERT-2026-004.
 *
 * Two things this handles that a bare $inc does not:
 *
 *  1. Collisions. The counter and the documents can drift apart — a restore
 *     from backup, a manual deletion, or an edited counter all do it. Once the
 *     counter catches up to an id that already exists, the unique index makes
 *     create() fail with an opaque duplicate-key error and the public form
 *     breaks. So: if the candidate is taken, burn it and take the next one.
 *
 *  2. Year rollover. The counter is keyed per year, so numbering restarts at
 *     001 each January, which is what the YYYY-NNN format implies. A single
 *     global counter would have carried 2026's total into 2027.
 *
 * The $inc itself is atomic, so concurrent callers never receive the same seq.
 */
async function nextSequentialId(Model, field, prefix) {
  const year = new Date().getFullYear();
  const counterKey = `${field}-${year}`;

  for (let attempt = 0; attempt < 100; attempt++) {
    const counter = await Counter.findByIdAndUpdate(
      counterKey,
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
    const candidate = `${prefix}-${year}-${String(counter.seq).padStart(3, "0")}`;
    if (!(await Model.exists({ [field]: candidate }))) return candidate;
  }
  throw new Error(`Could not allocate a unique ${field} after 100 attempts`);
}

module.exports = { Counter, nextSequentialId };
