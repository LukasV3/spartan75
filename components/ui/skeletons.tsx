import { LoaderCircle } from "lucide-react";

export const TasksSkeleton = () => {
  return (
    <div className="grid place-content-center rounded-xl bg-muted/50 min-h-96">
      <LoaderCircle className="text-muted-foreground animate-spin" />
    </div>
  );
};

export const ProgressOverviewSkeleton = () => {
  return (
    <div className="grid place-content-center rounded-xl bg-muted/50 w-[300px] min-h-96">
      <LoaderCircle className="text-muted-foreground animate-spin" />
    </div>
  );
};
