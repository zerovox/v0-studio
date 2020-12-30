type PostType = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  footnotes: {
    [identifier: string]: string;
  };
};

export default PostType;
