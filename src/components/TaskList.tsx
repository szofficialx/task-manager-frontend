import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks:Task[];
  deleteTask:(id:number)=>void;
  toggleTask:(id:number)=>void;
  updateTask: (id: number, newTitle: string) => void;
}

function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  updateTask
}: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-x1 border border-dashed border-slate-300 px-4 py-10 text-center">
        <p className="font-medium text-slate-700">
          No tasks found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Add a task or change your search and filter
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {
        tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTask={updateTask}
          />
        ))
      }
    </ul>
  );

}

export default TaskList;