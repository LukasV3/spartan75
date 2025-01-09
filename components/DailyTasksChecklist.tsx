"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

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

export default function DailyTasksChecklist() {
  const [numCompletedTasks, setNumCompletedTasks] = useState(0);

  const percentComplete = (numCompletedTasks / 5) * 100;
  const formattedDate = new Date().toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onCompleteTask = (e: React.FormEvent<HTMLButtonElement>) => {
    const checked = (e.target as HTMLElement).getAttribute("aria-checked");
    setNumCompletedTasks((prev) => (checked === "true" ? prev - 1 : prev + 1));
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
          {formattedDate}
        </h3>

        {/* Progress Bar */}
        <div className="flex items-center gap-x-2">
          {`${percentComplete}%`}
          <Progress value={percentComplete} />
        </div>

        {/* Task List */}
        <div id="tasksList" className="flex flex-col space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task.value}
              id={task.id}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TaskItem = ({
  task,
  id,
  onCompleteTask,
}: {
  task: string;
  id: number;
  onCompleteTask: (e: React.FormEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={`checkbox-${id}`} onClick={onCompleteTask} />
      <Label htmlFor={`checkbox-${id}`} className="leading-none cursor-pointer">
        {task}
      </Label>
    </div>
  );
};
