import { Calendar } from "@/components/ui/calendar";
import { fetchUserChallengeStartDate } from "@/lib/data";

type StreakCalendarProps = {
  streak: number;
  currentDayIndex: number;
};

const StreakCalendar = async ({
  streak,
  currentDayIndex,
}: StreakCalendarProps) => {
  const challengeStartDate = await fetchUserChallengeStartDate();
  const startDate = new Date(Date.parse(challengeStartDate!));
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const selectedDates = {
    from: startDate,
    to: streak === currentDayIndex ? today : yesterday,
  };

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-sm text-muted-foreground">Calendar view:</h3>

      <Calendar
        mode="range"
        selected={streak ? selectedDates : undefined}
        className="rounded-md border w-min"
      />
    </div>
  );
};

export default StreakCalendar;
