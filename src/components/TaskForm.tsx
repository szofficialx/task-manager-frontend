import { useState } from "react";
import type { TaskPriority } from "../types/task";

interface Props {
  addTask:(
    title: string,
    priority: TaskPriority,
    dueDate: string,
  ) => void;
} 

function TaskForm({ addTask }: Props) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(
    e:React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !dueDate) return;

    addTask(trimmedTitle, priority, dueDate);

    setTitle("");
    setPriority("medium");
    setDueDate("");
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

      <input 
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskForm