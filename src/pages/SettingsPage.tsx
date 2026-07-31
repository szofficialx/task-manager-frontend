interface Props {
  taskCount: number;
  clearAllTasks: () => void;
}

function SettingsPage({
  taskCount,
  clearAllTasks,
}: Props) {
  return (
    <>
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Preferences
        </p>

        <h1 className="text-3x1 font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your task-manager data.
        </p>
      </header>

      <section className="rounded-2x1 border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">
              Clear all tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              this will remove all {taskCount} tasks from
              this browser.
            </p>
          </div>

          <button
            type="button"
            onClick={clearAllTasks}
            disabled={taskCount === 0}
            className="rounded-x1 bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Clear all
          </button>
        </div>
      </section>
    </>
  );
}

export default SettingsPage;