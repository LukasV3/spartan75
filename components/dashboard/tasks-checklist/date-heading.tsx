import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isToday,
  isTomorrow,
  isYesterday,
  format,
  addDays,
  lightFormat,
} from "date-fns";

type DateHeadingProps = {
  date: string;
  setDate: (newDate: string) => void;
};

const DateHeading = ({ date, setDate }: DateHeadingProps) => {
  const incrementDate = (date: string, increment: number) => {
    return lightFormat(addDays(date, increment), "yyyy-MM-dd");
  };

  const getDateText = (date: string) => {
    if (isYesterday(date)) return "Yesterday";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE");
  };

  return (
    <div className="text-lg font-semibold tracking-tight flex items-center gap-x-2">
      <Button
        variant="ghost"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        onClick={() => setDate(incrementDate(date, -1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <p>{format(date, "d MMM")}</p>

      <span className="text-xs">●</span>

      <p>{getDateText(date)}</p>

      <Button
        variant="ghost"
        className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        onClick={() => setDate(incrementDate(date, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateHeading;
