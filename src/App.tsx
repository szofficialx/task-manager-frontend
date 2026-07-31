import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CompletedPage from "./pages/CompletedPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import type { Task, TaskPriority } from "./types/task";
import type { TaskFilterValue } from "./components/TaskFilter";

function App() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) return [];

    try {
      return JSON.parse(savedTasks) as Task[];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TaskFilterValue>("all");

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks),
    );
  }, [tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed,
  );

  const completedTaskCount =
    completedTasks.length

  const remainingTasks = totalTasks - completedTaskCount;

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

  function addTask(
    title: string,
    priority: TaskPriority,
    dueDate: string,
  ) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      dueDate,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask
    ]);
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter(task => task.id !== id)
    )
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map(task =>
        task.id === id
        ? {
            ...task, 
            completed: !task.completed
          }
        : task
      )
    )
  }

  function updateTask(
    id: number, 
    newTitle: string
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
        ? { 
            ...task, 
            title: newTitle
          }
        : task
      ),
    );
  }

  function clearAllTasks() {
    setTasks([]);
  }


  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5x1">
        <Navbar />
        
        <Routes>
          <Route 
            path="/"
            element={
              <HomePage 
                tasks={filteredTasks}
                totalTasks={totalTasks}
                completedTasks={
                  completedTaskCount
                }
                remainingTasks={remainingTasks}
                searchTerm={searchTerm}
                currentFilter={filter}
                addTask={addTask}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                updateTask={updateTask}
                onSearchChange={setSearchTerm}
                onFilterChange={setFilter}
              />
            }
          />

          <Route 
            path="/completed"
            element={
              <CompletedPage 
                tasks={completedTasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                updateTask={updateTask}
              />
            }
          />

          <Route 
            path="/settings"
            element={
              <SettingsPage 
                taskCount={totalTasks}
                clearAllTasks={clearAllTasks}
              />
            }
          />

          <Route 
            path="/about"
            element={<AboutPage />}
          />

          <Route 
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
