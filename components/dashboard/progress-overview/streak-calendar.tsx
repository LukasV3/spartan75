import { Calendar } from "@/components/ui/calendar";

type StreakCalendarProps = {
  streak: number;
  currentDayIndex: number;
};

const StreakCalendar = ({ streak, currentDayIndex }: StreakCalendarProps) => {
  const selectedDates = streak
    ? {
        from: new Date(
          new Date().setDate(new Date().getDate() - (currentDayIndex - 1))
        ),
        to:
          streak == currentDayIndex
            ? new Date()
            : new Date(new Date().setDate(new Date().getDate() - 1)),
      }
    : undefined;

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm text-muted-foreground">Calendar view:</h3>

      <Calendar
        mode="range"
        selected={selectedDates}
        className="rounded-md border w-min"
      />
    </div>
  );
};

export default StreakCalendar;
