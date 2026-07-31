import TaskList from "../components/TaskList";
import type { Task } from "../types/task";

interface Props {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;

  updateTask: (
    id: number,
    newTitle: string,
  ) => void;
}

function CompletedPage({
  tasks,
  deleteTask,
  toggleTask,
  updateTask,
}: Props) {
  return (
    <>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
          Progress
        </p>

        <h1 className="text-3x1 font-bold text-slate-900">
          Completed Tasks
        </h1>

        <p>
          You have completed {tasks.length}{" "}
          {tasks.length === 1 ? "task" : "tasks"}.
        </p>
      </header>

      <section className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
        {tasks.length === 0 ? (
          <div className="rounded-x1 border border-dashed border-slate-300 px-4 py-12 text-center">
            <p className="font-medium text-slate-700">
              No completed tasks yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete a task and it will appear here.
            </p>
          </div>
        ) : (
          <TaskList 
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTask={updateTask}
          />
        )} 
      </section>
    </>
  );
}

export default CompletedPage;