import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import TaskSearch from "./components/TaskSearch";
import TaskFilter from "./components/TaskFilter";
import type { Task } from "./types/task";
import type { TaskFilterValue } from "./components/TaskFilter";

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TaskFilterValue>("all");

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed,
  ).length;

  const remainingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "incomplete" && !task.completed)

    return matchesSearch && matchesFilter;
});

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

      <TaskCounter
        total={totalTasks}
        completed={completedTasks}
        remaining={remainingTasks}
      />

      <TaskForm 
        addTask={addTask}
      />

      <TaskSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <TaskList 
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default App;
