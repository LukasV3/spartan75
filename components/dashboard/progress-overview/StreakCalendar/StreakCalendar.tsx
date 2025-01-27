import { Calendar } from "@/components/ui/calendar";
import { fetchCompletedDates } from "@/lib/data";

export const StreakCalendar = async () => {
  const completedDates = await fetchCompletedDates();
  // TODO: Convert dates to Date objects using zod schema validation
  const formattedCompletedDates = completedDates.map((date) => new Date(date));

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm text-muted-foreground">Calendar view:</h3>

      <Calendar
        mode="multiple"
        selected={formattedCompletedDates}
        className="rounded-md border w-min"
      />
    </div>
  );
};
