interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function TaskSearch({
  searchTerm,
  onSearchChange
}: Props) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        Search tasks
      </span>

      <input
        id="task-search" 
        type="text" 
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search by tasks title..."
        className="w-full rounded-x1 border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-100"
      />
    </label>
  );
}

export default TaskSearch;