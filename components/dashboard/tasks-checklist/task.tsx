import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type TaskProps = {
  taskName: string;
  completed: boolean;
  id: number;
  onTaskClick: (id: number) => void;
};

const Task = ({ taskName, completed, id, onTaskClick }: TaskProps) => {
  return (
    <li className="first:border-t border-b">
      <Label
        htmlFor={`checkbox-${id}`}
        className="flex items-center space-x-2.5 cursor-pointer py-4"
      >
        <Checkbox
          id={`checkbox-${id}`}
          onClick={() => onTaskClick(id)}
          className="rounded-full w-5 h-5 transition-colors hover:bg-muted"
          checked={completed}
        />
        <p className="leading-none peer-data-[state=checked]:line-through">
          {taskName}
        </p>
      </Label>
    </li>
  );
};

export default Task;
