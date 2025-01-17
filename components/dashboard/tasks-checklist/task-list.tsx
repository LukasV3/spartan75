import Task from "@/components/dashboard/tasks-checklist/task";
import { type UserTask } from "@/lib/definitions";

type TaskListProps = {
  tasks: UserTask[];
  onTaskClick: (id: number) => void;
};

const TaskList = ({ tasks, onTaskClick }: TaskListProps) => {
  return (
    <ul className="flex flex-col">
      {tasks.map((task) => (
        <Task
          key={task.id}
          taskName={task.name}
          completed={task.completed}
          id={task.id}
          onTaskClick={onTaskClick}
        />
      ))}
    </ul>
  );
};

export default TaskList;
