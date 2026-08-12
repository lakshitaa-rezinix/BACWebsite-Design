/**
 * Blog posts live in MongoDB and are managed from the admin panel
 * (/admin/blog), so there is no static post array here any more.
 *
 * The posts that used to be hard-coded in this file were migrated with
 * `cd server && node seed-blog.js`, which reads server/blog-seed.json.
 *
 * This shape mirrors what the /api/blog endpoints return.
 */
export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Raw HTML body. Only present on the single-post endpoint. */
  content: string;
  image: string;
  /** ISO date string. */
  date: string;
  author: string;
  category: string;
  isPublished: boolean;
}
