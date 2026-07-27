import { useState } from "react";
import type { TaskPriority } from "../types/task";

interface Props {
  addTask:(
    title: string,
    priority: TaskPriority
  ) => void;
} 

function TaskForm({ addTask }: Props) {

  const [title,setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    addTask(trimmedTitle, priority);

    setTitle("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(
            event.target.value as TaskPriority
          )
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskForm