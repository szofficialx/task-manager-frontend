export type TaskFilterValue =
  | "all"
  | "completed"
  | "incomplete";

interface Props {
  currentFilter: TaskFilterValue;
  onFilterChange: (filter: TaskFilterValue) => void;
}

function TaskFilter({
  currentFilter,
  onFilterChange,
}: Props) {

  function getButtonClasses(
    filterValue: TaskFilterValue,
  ) {
    const baseClasses =
    "rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer";

    if (currentFilter === filterValue) {
      return `${baseClasses} bg-slate-900 text-white`;
    }

    return `${baseClasses} bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900`
  }
  

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-700">
        Filter
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={getButtonClasses("all")}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("completed")}
          className={getButtonClasses("completed")}
        >
          Completed
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("incomplete")}
          className={getButtonClasses("incomplete")}
        >
          Incomplete
        </button>
      </div>
    </div>
  );
}

export default TaskFilter;