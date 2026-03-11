import { motion } from "motion/react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPosts } from "../data/blog-posts";

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <Link
            to="/blog"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div
                className="prose prose-invert max-w-none
                  [&_p]:text-foreground/70 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6
                  [&_h3]:text-foreground [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4
                  [&_ul]:text-foreground/70 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
                  [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} to={`/blog/${related.slug}`}>
                      <div className="group p-4 bg-card/50 border border-primary/20 rounded-xl hover:border-primary/50 transition-all mb-4">
                        <div className="aspect-video rounded-lg overflow-hidden mb-3">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-muted-foreground text-xs mt-1">
                          {new Date(related.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
