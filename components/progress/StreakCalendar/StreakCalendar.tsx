import { Calendar } from "@/components/ui/calendar";
import { fetchCompletedDates } from "@/lib/data";

type StreakCalendarProps = {
  userId: string;
};

export const StreakCalendar = async ({ userId }: StreakCalendarProps) => {
  const completedDates = await fetchCompletedDates(userId);

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm text-muted-foreground">Calendar view:</h3>

      <Calendar
        mode="multiple"
        selected={completedDates}
        className="rounded-md border w-min"
      />
    </div>
  );
};
