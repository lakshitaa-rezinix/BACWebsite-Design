const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const router = express.Router();

// Public: list published posts (newest first). Content is omitted — the list
// view only needs the card fields, and post bodies are large.
router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find({ isPublished: true })
      .select("-content")
      .sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: list every post, including drafts.
router.get("/all", auth, async (req, res) => {
  try {
    const posts = await Blog.find().select("-content").sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: fetch a single post by id for editing (drafts included).
router.get("/id/:id", auth, validateId, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Public: fetch a published post by slug.
router.get("/:slug", async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin: create
router.post("/", auth, async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: update
router.put("/:id", auth, validateId, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    // Assign then save (rather than findByIdAndUpdate) so the slug hook runs.
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: delete
router.delete("/:id", auth, validateId, async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
