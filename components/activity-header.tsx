import DateFormatter from "./date-formatter";
import ActivityTitle from "./activity-title";

type Props = {
  title: string;
  date: string;
};

const ActivityHeader = ({ title, date }: Props) => {
  return (
    <>
      <ActivityTitle>{title}</ActivityTitle>
      <div className="max-w-2xl text-center md:text-left">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} showTime={false} />
        </div>
      </div>
    </>
  );
};

export default ActivityHeader;
