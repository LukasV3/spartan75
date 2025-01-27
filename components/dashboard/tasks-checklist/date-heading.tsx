import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isToday,
  isTomorrow,
  isYesterday,
  format,
  addDays,
  lightFormat,
  startOfToday,
} from "date-fns";
import { Separator } from "@/components/ui/separator";

type DateHeadingProps = {
  date: string;
  setDate: (newDate: string) => void;
};

const DateHeading = ({ date, setDate }: DateHeadingProps) => {
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

type DateToggleProps = {
  date: string;
  setDate: (newDate: string) => void;
};

const DateToggle = ({ date, setDate }: DateToggleProps) => {
  const incrementDate = (date: string, increment: number) => {
    return lightFormat(addDays(date, increment), "yyyy-MM-dd");
  };

  return (
    <div className="ml-auto flex items-center border rounded-md">
      <Button
        variant="ghost"
        className="h-8 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-r-none"
        onClick={() => setDate(incrementDate(date, -1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-4" />

      <Button
        variant="ghost"
        size="sm"
        className="rounded-none text-muted-foreground font-semibold"
        onClick={() => setDate(lightFormat(startOfToday(), "yyyy-MM-dd"))}
      >
        Today
      </Button>

      <Separator orientation="vertical" className="h-4" />

      <Button
        variant="ghost"
        className="h-8 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-l-none"
        onClick={() => setDate(incrementDate(date, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateHeading;
