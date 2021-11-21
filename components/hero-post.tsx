import DateFormatter from "./date-formatter";
import Link from "next/link";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const HeroPost = ({ title, date, excerpt, slug }: Props) => {
  return (
    <section className="mb-8 md:mb-12">
      <h3 className="mb-2 text-4xl lg:text-6xl leading-tight">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="mb-4 md:mb-0 text-lg">
        <DateFormatter dateString={date} showTime={false} />
      </div>
      <div>
        <p className="text-lg leading-relaxed mb-4 italic">{excerpt}</p>
      </div>
    </section>
  );
};

export default HeroPost;
