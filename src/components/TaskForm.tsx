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
    <form 
      onSubmit={handleSubmit}
      className="grid gap-4 md:grid-cols-2"
    >
      <label className="md:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Task title
        </span>

        <input
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="For example, learn React hooks"
          className="w-full rounded-x1 border border-slate-300 bg-white px-4 py-2.5"
        />
      </label>
      
      <label>
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Priority
        </span>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value as TaskPriority
            )
          }
          className="w-full rounded-x1 border border-slate-300 bg-white px-4 py-2.5 text-slate-900"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      
      <label>
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          Due date
        </span>

        <input 
          type="date"
          value={dueDate}
          onChange={(event) =>
            setDueDate(event.target.value)
          }
          className="w-full rounded-x1 border border-slate-300 bg-white px-4 py-2.5"
          required
        />
      </label>

      <button 
        type="submit"
        className="rounded-x1 bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 md:col-span-2"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm