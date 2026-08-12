const mongoose = require("mongoose");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Public listings sort newest-first over published posts only.
blogSchema.index({ isPublished: 1, date: -1 });

// Derive the slug from the title, appending a counter on collision so saving a
// second post with the same title does not fail with a duplicate-key error.
// Async hook with no `next` parameter: Mongoose 9 invokes async hooks with no
// arguments and awaits the returned promise. Declaring `next` here would throw
// "next is not a function".
blogSchema.pre("validate", async function () {
  if (this.slug && !this.isModified("title")) return;
  if (this.slug && this.isModified("slug")) this.slug = slugify(this.slug);

  const base = slugify(this.slug || this.title) || "post";
  let candidate = base;
  let n = 2;
  while (await this.constructor.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${base}-${n++}`;
  }
  this.slug = candidate;
});

module.exports = mongoose.model("Blog", blogSchema);
module.exports.slugify = slugify;
