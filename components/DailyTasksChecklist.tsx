"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const numberOfTasks = tasks.length;
  const percentageComplete = (numCompletedTasks / numberOfTasks) * 100;
  const formattedTodaysDate = new Date().toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onTaskClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const checked = (e.target as HTMLElement).getAttribute("aria-checked");

    if (checked === "true") {
      // task is being unchecked
      setNumCompletedTasks((a) => a - 1);

      if (percentageComplete === 100) {
        decrementStreak();
      }
    } else {
      // task is being checked
      setNumCompletedTasks((a) => a + 1);

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
    <div className="rounded-xl bg-muted/50">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Daily Tasks Checklist
        </h3>

        <p className="text-sm text-muted-foreground">
          This is your tasks checklist
        </p>
      </div>

      <div className="p-6 pt-0 flex flex-col space-y-4">
        <h3 className="font-semibold leading-none tracking-tight">
          {formattedTodaysDate}
        </h3>

        {/* Progress Bar */}
        <div className="flex items-center gap-x-2">
          <p>{`${percentageComplete}%`}</p>
          <Progress value={percentageComplete} />
        </div>

        {/* Task List */}
        <ul className="flex flex-col space-y-4">
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
    <li className="flex items-center space-x-2">
      <Checkbox id={`checkbox-${id}`} onClick={onTaskClick} />
      <Label htmlFor={`checkbox-${id}`} className="leading-none cursor-pointer">
        {task}
      </Label>
    </li>
  );
};
