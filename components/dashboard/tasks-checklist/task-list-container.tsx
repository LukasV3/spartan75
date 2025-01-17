"use client";

import TaskList from "@/components/dashboard/tasks-checklist/task-list";
import ProgressBar from "@/components/dashboard/tasks-checklist/progress-bar";
import { type UserTask } from "@/lib/definitions";
import { useEffect, useOptimistic, useTransition } from "react";
import { toggleTaskComplete } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

type TaskListContainerProps = {
  tasks: UserTask[];
};

const TaskListContainer = ({ tasks }: TaskListContainerProps) => {
  const [, startTransition] = useTransition();
  const { toast } = useToast();
  const [optimisticTasks, toggleOptimisticTask] = useOptimistic<
    UserTask[],
    UserTask
  >(tasks, (tasks, toggledTask) => {
    return tasks.map((task) =>
      task.id === toggledTask.id
        ? { ...task, completed: toggledTask.completed }
        : task
    );
  });
  const percentComplete =
    (tasks.filter((task) => task.completed).length / 5) * 100;
  const optimisticPercentComplete =
    (optimisticTasks.filter((task) => task.completed).length / 5) * 100;

  // display message once all daily tasks are complete
  useEffect(() => {
    if (percentComplete === 100) {
      toast({
        title: "Wooooooo! 🥳",
        description: `Good job.`,
      });
    }
  }, [percentComplete, toast]);

  const onTaskClick = (id: number) => {
    // Find the task being toggled
    const task = optimisticTasks.find((task) => task.id === id);
    if (!task) {
      console.error(`Task with id ${id} not found`);
      return;
    }

    startTransition(async () => {
      // Optimistically update the task state
      toggleOptimisticTask({ ...task, completed: !task.completed });

      // Perform the API call TODO: Make sure rollback call is still treated as a transition - https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
      await toggleTaskComplete(id).catch((error) => {
        console.error("Failed to update task:", error);
        // Rollback the optimistic update
        toggleOptimisticTask(task);
      });
    });
  };

  return (
    <>
      <ProgressBar percentage={optimisticPercentComplete} />

      <TaskList tasks={optimisticTasks} onTaskClick={onTaskClick} />
    </>
  );
};

export default TaskListContainer;
