"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import SignupAlert from "@/components/SignupAlert";

const tasks = [
  {
    value: "Follow a Diet",
    id: 1,
  },
  {
    value: "Complete Two 45-Minute Workouts",
    id: 2,
  },
  {
    value: "Drink 1 Gallon of Water",
    id: 3,
  },
  {
    value: "Read 10 Pages of a Non-Fiction Book",
    id: 4,
  },
  {
    value: "Take a Progress Photo",
    id: 5,
  },
];

type DailyTasksChecklistProps = {
  incrementStreak: () => void;
  decrementStreak: () => void;
  currentDayIndex: number;
};

export default function DailyTasksChecklist({
  incrementStreak,
  decrementStreak,
  currentDayIndex,
}: DailyTasksChecklistProps) {
  const [numCompletedTasks, setNumCompletedTasks] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast, dismiss } = useToast();

  const numberOfTasks = tasks.length;
  const percentageComplete = (numCompletedTasks / numberOfTasks) * 100;
  const formattedTodaysDate = new Date().toLocaleDateString("en-gb", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const onTaskClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const checked = (e.target as HTMLElement).getAttribute("aria-checked");

    if (checked === "true") {
      // task is being unchecked
      setNumCompletedTasks((a) => a - 1);

      if (percentageComplete === 100) {
        decrementStreak();
        dismiss(); // hide toast
      }
    } else {
      // task is being checked
      setNumCompletedTasks((a) => a + 1);

      // on 2nd checked item ask if user wants to create an account to save progress
      if (numCompletedTasks + 4 === numberOfTasks) {
        setAlertOpen(true);
      }

      // if on next render all tasks will be complete
      if (numCompletedTasks + 1 === numberOfTasks) {
        incrementStreak();
        toast({
          title: "Wooooooo! 🥳",
          description: `You completed day ${currentDayIndex}. ${75 - currentDayIndex} to go.`,
        });
      }
    }
  };

  return (
    <>
      <SignupAlert open={alertOpen} onAlertClose={() => setAlertOpen(false)} />

      <div className="h-min rounded-xl p-6 space-y-6 bg-muted/50">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold tracking-tight">
            Daily Tasks Checklist
            <span className="ml-2">📋</span>
          </h3>

          <p className="text-sm text-muted-foreground">
            This is your tasks checklist
          </p>
        </div>

        <hr />

        {/* Date heading */}
        <div className="flex flex-col space-y-4">
          <div className="text-lg font-semibold tracking-tight flex items-center gap-x-2">
            <p>{formattedTodaysDate.split(" ").slice(1).join(" ")}</p>

            <span className="text-xs">●</span>

            <p>Today</p>

            <span className="text-xs">●</span>

            <p>{formattedTodaysDate.split(" ")[0]}</p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-x-2 pb-1.5">
            <h3 className="text-sm text-muted-foreground shrink-0">
              Todays progress:
            </h3>

            <Progress value={percentageComplete} />

            <p
              className={cn("text-sm text-muted-foreground shrink-0", {
                "text-foreground": percentageComplete === 100,
              })}
            >{`${percentageComplete}%`}</p>
          </div>

          {/* Task List */}
          <ul className="flex flex-col">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task.value}
                id={task.id}
                onTaskClick={onTaskClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const TaskItem = ({
  task,
  id,
  onTaskClick,
}: {
  task: string;
  id: number;
  onTaskClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <li className="first:border-t border-b">
      <Label
        htmlFor={`checkbox-${id}`}
        className="flex items-center space-x-2.5 cursor-pointer py-4"
      >
        <Checkbox
          id={`checkbox-${id}`}
          onClick={onTaskClick}
          className="rounded-full w-5 h-5 transition-colors hover:bg-muted"
        />
        <p className="leading-none peer-data-[state=checked]:line-through">
          {task}
        </p>
      </Label>
    </li>
  );
};
