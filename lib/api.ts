import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import PostType from "../types/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug<K extends keyof PostType>(
  slug: string,
  ...fields: Array<K>
): Pick<PostType, K> {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Pick<PostType, K> = {} as Pick<PostType, K>;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug as PostType[K];
    }
    if (field === "content") {
      items[field] = content as PostType[K];
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts<K extends keyof PostType>(
  ...fields: Array<K>
): Array<Pick<PostType, K>> {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug<"date" | K>(slug, "date", ...fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
