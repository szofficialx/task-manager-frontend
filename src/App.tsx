import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: number) {
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map(task =>
        task.id === id
        ? {...task, completed: !task.completed}
        : task
      )
    )
  }

  function updateTask(id: number, newTitle: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id
        ? { ...task, title: newTitle}
        : task
      ),
    );
  }

  return (
    <div>
      <h1>
        Task Manager
      </h1>

      <TaskForm 
        addTask={addTask}
      />

      <TaskList 
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default App;
