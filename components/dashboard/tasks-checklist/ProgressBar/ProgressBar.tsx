import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  percentage: number;
};

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-x-2 pb-1.5">
      <h3 className="text-sm text-muted-foreground shrink-0">
        Todays progress:
      </h3>

      <Progress value={percentage} />

      <p
        className={cn("text-sm text-muted-foreground shrink-0", {
          "text-foreground": percentage === 100,
        })}
      >{`${percentage}%`}</p>
    </div>
  );
};
