import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
  showTime: boolean;
};

const DateFormatter = ({ dateString, showTime }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, (showTime ? "HH:mm:ss " : "") + "LLLL	d, yyyy")}</time>
  );
};

export default DateFormatter;
