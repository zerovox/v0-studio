import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type Props = {
  title: string;
  date: string;
};

const PostHeader = ({ title, date }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl text-center md:text-left">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} showTime={false} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
