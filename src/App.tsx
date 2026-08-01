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
import { getTasks } from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // const [tasks, setTasks] = useState<Task[]>(() => {
  //   const savedTasks = localStorage.getItem("tasks");

  //   if (!savedTasks) return [];

  //   try {
  //     return JSON.parse(savedTasks) as Task[];
  //   } catch {
  //     return [];
  //   }
  // });

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TaskFilterValue>("all");

  // useEffect(() => {
  //   localStorage.setItem(
  //     "tasks",
  //     JSON.stringify(tasks),
  //   );
  // }, [tasks]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadTasks() {
      setIsLoading(true);
      setError(null);

      try {
        const apiTasks = await getTasks(
          controller.signal
        );

        setTasks(apiTasks);
      } catch(error: unknown) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occured.";
        
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

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

  function retryLoadingTasks() {
    setReloadKey(
      (currentKey) => currentKey + 1,
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5x1">
        <Navbar />

        {isLoading ? (
          <section
            className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
            aria-live="polite"
          >
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          
            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Loading tasks
            </h1>

            <p className="mt-2 text-slate-500">
              Getting your tasks from the
              API...
            </p>
          </section>
        ) : error ? (
          <section 
            className="rounded-2xl border border-rose-200 bg-white px-6 py-16 text-center shadow-sm"
            role="alert"
          >
            <h1 className="text-xl font-semibold text-rose-700">
              Unable to load tasks
            </h1>

            <p className="mt-2 text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={retryLoadingTasks}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try again
            </button>
          </section>
        ) : (
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
        )}
      </div>
    </main>
  );
}

export default App;
