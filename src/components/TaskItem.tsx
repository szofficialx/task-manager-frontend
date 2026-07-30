import { useState } from "react";
import type { Task } from "../types/task";
import { getDueDateStatus } from "../utils/date";

interface Props {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
}

function TaskItem({ 
  task, 
  deleteTask, 
  toggleTask, 
  updateTask 
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const dueDateStatus = getDueDateStatus(
    task.dueDate,
    task.completed
  );

  const priorityClasses = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-rose-100 text-rose-700",
  }

  function getDueDateClasses() {
    if (dueDateStatus === "Completed") {
      return "text-emerald-600"
    }

    if (dueDateStatus === "Overdue") {
      return "text-rose-600";
    }

    if (dueDateStatus === "Due today") {
      return "text-amber-600";
    }

    if (dueDateStatus === "Due tomorrow") {
      return "text-blue-600";
    }

    return "text-slate-500";
  }

  function handleEdit() {
    setEditedTitle(task.title);
    setIsEditing(true);
  }

  function handleSave() {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    updateTask(task.id, trimmedTitle);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedTitle(task.title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="rounded-x1 border border-blue-200 bg-blue-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input 
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            autoFocus
          />

          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save
            </button>

            <button 
              type="button" 
              onClick={handleCancel}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            toggleTask(task.id)
          }
          aria-label={`Mark ${task.title} as ${
            task.completed
              ? "incomplete"
              : "completed"
          }`}
          className="mt-1 h-5 w-5 cursor-pointer accent-blue-600"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-semibold ${
                task.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-900"
              }`}
            >
              {task.title}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                priorityClasses[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </div>

          <p
            className={`mt-1 text-sm font-medium ${getDueDateClasses()}`}
          >
            {dueDateStatus}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              deleteTask(task.id)
            }
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;