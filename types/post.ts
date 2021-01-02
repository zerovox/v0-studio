type PostType = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: Array<string>;
  footnotes: {
    [identifier: string]: string;
  };
};

export default PostType;
