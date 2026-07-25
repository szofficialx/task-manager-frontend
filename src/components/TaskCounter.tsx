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
    <div>
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Remaining: {remaining}</p>
    </div>
  );
}

export default TaskCounter;