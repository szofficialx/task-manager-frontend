interface Props {
  total: number;
  completed: number;
  remaining: number;
}

function TaskCounter({
  total,
  completed,
  remaining
}: Props ) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2x1 border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm font-medium text-blue-700">
          Total tasks
        </p>

        <p className="mt-2 text-3x1 font-bold text-blue-950">
          {total}
        </p>
      </div>
      
      <div className="rounded-2x1 border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-medium text-emerald-700">
          Completed
        </p>

        <p className="mt-2 text-3x1 font-bold text-emerald-950">
          {completed}
        </p>
      </div>

      <div className="rounded-2x1 border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-medium text-amber-700">
          Remaining
        </p>

        <p className="mt-2 text-3x1 font-bold text-amber-950">
          {remaining}
        </p>
      </div>
    </div>
  );
}

export default TaskCounter;