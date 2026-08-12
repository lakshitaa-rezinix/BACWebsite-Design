import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Eye, Loader2, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { api } from "../../lib/api";
import { toast } from "sonner";

interface BlogPostRecord {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  author: string;
  category: string;
  isPublished: boolean;
}

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  image: "",
  author: "BAC Communications",
  category: "Company News",
  date: "",
  isPublished: true,
};

type FormState = typeof EMPTY_FORM;

function toDateInput(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await api.getAllBlogPosts();
      setPosts(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) });
    setShowForm(true);
  };

  const openEdit = async (post: BlogPostRecord) => {
    try {
      // The list endpoint omits `content` to keep the payload small, so fetch
      // the full record before editing or we would save an empty body.
      const full = await api.getBlogPostById(post._id);
      setEditingId(post._id);
      setForm({
        title: full.title ?? "",
        excerpt: full.excerpt ?? "",
        content: full.content ?? "",
        image: full.image ?? "",
        author: full.author ?? "",
        category: full.category ?? "",
        date: toDateInput(full.date),
        isPublished: full.isPublished ?? true,
      });
      setShowForm(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to load post");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      toast.error("Title, excerpt, and content are required");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, date: form.date || new Date().toISOString() };
      if (editingId) {
        await api.updateBlogPost(editingId, payload);
        toast.success("Post updated");
      } else {
        await api.createBlogPost(payload);
        toast.success("Post created");
      }
      setShowForm(false);
      setEditingId(null);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: BlogPostRecord) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await api.deleteBlogPost(post._id);
      toast.success("Post deleted");
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-muted-foreground">Loading posts...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
        >
          <Plus size={18} className="mr-2" />
          New Post
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/50 border border-primary/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">
              {editingId ? "Edit Post" : "New Post"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground mb-2 text-sm">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-background/50 border-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm">Category *</label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-background/50 border-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm">Author *</label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="bg-background/50 border-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm">Date</label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-background/50 border-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground mb-2 text-sm">
                Image path{" "}
                <span className="text-muted-foreground">
                  (e.g. /images/facility/xrf-bay.jpeg)
                </span>
              </label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/facility/xrf-bay.jpeg"
                className="bg-background/50 border-primary/20"
              />
            </div>

            <div>
              <label className="block text-foreground mb-2 text-sm">Excerpt *</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                className="w-full rounded-md bg-background/50 border border-primary/20 text-foreground p-3 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-foreground mb-2 text-sm">
                Content * <span className="text-muted-foreground">(HTML — use &lt;p&gt; and &lt;h3&gt; tags)</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="w-full rounded-md bg-background/50 border border-primary/20 text-foreground p-3 text-sm font-mono"
                required
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              Published <span className="text-muted-foreground">(uncheck to keep as draft)</span>
            </label>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Saving...
                  </span>
                ) : editingId ? (
                  "Save Changes"
                ) : (
                  "Create Post"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-primary/20"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 border border-primary/20 rounded-xl overflow-hidden"
      >
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-12 text-center">
            No blog posts yet. Click "New Post" to create your first one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-4 text-primary text-sm font-semibold">Title</th>
                  <th className="text-left p-4 text-primary text-sm font-semibold">Category</th>
                  <th className="text-left p-4 text-primary text-sm font-semibold">Date</th>
                  <th className="text-left p-4 text-primary text-sm font-semibold">Author</th>
                  <th className="text-left p-4 text-primary text-sm font-semibold">Status</th>
                  <th className="text-right p-4 text-primary text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 shrink-0" />
                        )}
                        <span className="text-foreground text-sm font-medium line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{post.category}</td>
                    <td className="p-4 text-muted-foreground text-sm whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{post.author}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                          post.isPublished
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`View ${post.title}`}
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => openEdit(post)}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
