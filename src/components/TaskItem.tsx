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
      <div>
        <input 
          type="text"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)} 
        />

        <button type="button" onClick={handleSave}>
          Save
        </button>

        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <span>
        Priority:{" "}
        {task.priority.charAt(0).toUpperCase() +
          task.priority.slice(1)}
      </span>

      <span>
        {dueDateStatus}
      </span>

      <button type="button" onClick={handleEdit}>
        Edit
      </button>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;