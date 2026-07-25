import { useState } from "react";

interface Props {
  addTask:(title: string)=>void;
}

function TaskForm({addTask}:Props) {

  const [title,setTitle] = useState("");

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();

    if(!title.trim()) return;

    addTask(title);

    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button>
        Add
      </button>
    </form>
  );
}

export default TaskForm