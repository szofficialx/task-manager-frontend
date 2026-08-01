import TaskCounter from "../components/TaskCounter";
import TaskFilter from "../components/TaskFilter";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskSearch from "../components/TaskSearch";

import type { Task, TaskPriority } from "../types/task";
import type { TaskFilterValue } from "../components/TaskFilter";

interface Props {
  tasks: Task[];
  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;

  searchTerm: string;
  currentFilter: TaskFilterValue;

  addTask: (
    title: string,
    priority: TaskPriority,
    dueDate: string,
  ) => void;

  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;

  updateTask: (
    id: number,
    newTitle: string,
  ) => void;

  onSearchChange: (value: string) => void;

  onFilterChange: (
    filter: TaskFilterValue,
  ) => void;
}

function HomePage({
  tasks,
  totalTasks,
  completedTasks,
  remainingTasks,
  searchTerm,
  currentFilter,
  addTask,
  deleteTask,
  toggleTask,
  updateTask,
  onSearchChange,
  onFilterChange,
}: Props) {
  return (
    <>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Productivity
        </p>

        <h1 className="text-3x1 font-bold tracking-tight text-slate-900 sm:text-4x1">
          Task Manager
        </h1>

        <p className="mt-2 text-slate-600">
          Organize your work and track your progress.
        </p>
      </header>

      <div className="space-y-6">
        <TaskCounter 
          total={totalTasks}
          completed={completedTasks}
          remaining={remainingTasks}
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Add a new task
          </h2>

          <TaskForm addTask={addTask}/>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="space-y-4">
            <TaskSearch 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />

            <TaskFilter 
              currentFilter={currentFilter}
              onFilterChange={onFilterChange}
            />

            <TaskList 
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              updateTask={updateTask}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;