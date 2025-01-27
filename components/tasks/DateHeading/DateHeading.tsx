import { isToday, isTomorrow, isYesterday, format } from "date-fns";
import { DateToggle } from "@/components/tasks/DateToggle/DateToggle";

type DateHeadingProps = {
  date: string;
  setDate: (newDate: string) => void;
};

export const DateHeading = ({ date, setDate }: DateHeadingProps) => {
  const getDateText = (date: string) => {
    if (isYesterday(date)) return "Yesterday";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE");
  };

  return (
    <div className="text-lg font-semibold tracking-tight flex items-center gap-x-2">
      <p>{format(date, "d MMM")}</p>
      <span className="text-xs">●</span>
      <p>{getDateText(date)}</p>

      <DateToggle date={date} setDate={setDate} />
    </div>
  );
};
