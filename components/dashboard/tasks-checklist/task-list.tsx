"use client";

import Task from "@/components/dashboard/tasks-checklist/task";
import { useToast } from "@/hooks/use-toast";
import { type UserTask } from "@/lib/definitions";
import { useEffect } from "react";

type TaskListProps = {
  tasks: UserTask[];
  currentDayIndex: number;
  numCompletedTasks: number;
};

const TaskList = ({
  tasks,
  currentDayIndex,
  numCompletedTasks,
}: TaskListProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (numCompletedTasks === 5) {
      toast({
        title: "Wooooooo! 🥳",
        description: `You completed day ${currentDayIndex}. ${75 - currentDayIndex} to go.`,
      });
    }
  }, [numCompletedTasks, currentDayIndex, toast]);

  return (
    <ul className="flex flex-col">
      {tasks.map((task) => (
        <Task
          key={task.id}
          taskName={task.name}
          completed={task.completed}
          id={task.id}
        />
      ))}
    </ul>
  );
};

export default TaskList;
