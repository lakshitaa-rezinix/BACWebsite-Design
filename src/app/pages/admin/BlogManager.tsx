import { motion } from "motion/react";
import { useState } from "react";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { blogPosts, type BlogPost } from "../../data/blog-posts";

export function BlogManager() {
  const [posts] = useState<BlogPost[]>(blogPosts);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog content
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold">
          <Plus size={18} className="mr-2" />
          New Post
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/50 border border-primary/20 rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Title
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Category
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Date
              </th>
              <th className="text-left p-4 text-primary text-sm font-semibold">
                Author
              </th>
              <th className="text-right p-4 text-primary text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.slug}
                className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-foreground text-sm font-medium line-clamp-1">
                      {post.title}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-muted-foreground text-sm">
                    {post.category}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {post.author}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
