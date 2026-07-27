interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function TaskSearch({
  searchTerm,
  onSearchChange
}: Props) {
  return (
    <div>
      <label htmlFor="task-search">
        Search:
      </label>

      <input
        id="task-search" 
        type="text" 
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search tasks"
      />
    </div>
  );
}

export default TaskSearch;