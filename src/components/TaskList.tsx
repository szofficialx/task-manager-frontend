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

  return (
    <div>
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
    </div>
  );

}

export default TaskList;