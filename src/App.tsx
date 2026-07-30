import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import TaskSearch from "./components/TaskSearch";
import TaskFilter from "./components/TaskFilter";
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

  // function clearAllTasks() {
  //   setTasks([]);
  // }


  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4x1">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Productivity
          </p>

          <h1 className="text-3x1 font-bold tracking-tight text-slate-900 sm:text-4x1">
            Task Manager
          </h1>

          <p className="mt-2 text-slate-600">
            Organize your work and keep track of your progress
          </p>
        </header>

        <div className="space-y-6">
          <TaskCounter
            total={totalTasks}
            completed={completedTasks}
            remaining={remainingTasks}
          />

          {/* <button
            type="button"
            onClick={clearAllTasks}
            disabled={tasks.length === 0}
          >
            Clear all
          </button> */}

          <section className="rounded-2x1">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Add a new task
            </h2>

            <TaskForm addTask={addTask} />
          </section>

          <section className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
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
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
