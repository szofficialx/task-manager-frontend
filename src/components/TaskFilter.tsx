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
  return (
    <div>
      <button
        type="button"
        onClick={() => onFilterChange("all")}
        disabled={currentFilter === "all"}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onFilterChange("completed")}
        disabled={currentFilter === "completed"}
      >
        Completed
      </button>

      <button
        type="button"
        onClick={() => onFilterChange("incomplete")}
        disabled={currentFilter === "incomplete"}
      >
        Incomplete
      </button>
    </div>
  );
}

export default TaskFilter;