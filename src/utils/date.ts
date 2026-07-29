export function getDueDateStatus(
  dueDate: string,
  completed: boolean,
): string {
  if (completed) return "Completed";

  const today = new Date();

  const [year, month, day] = dueDate 
    .split("-")
    .map(Number);

  const todayDayNumber = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const dueDayNumber = Date.UTC(
    year,
    month - 1,
    day,
  );

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const differenceInDays =
    (dueDayNumber - todayDayNumber) /
    millisecondsPerDay

  if (differenceInDays < 0) return "Overdue";
  if (differenceInDays === 0) return "Due today";
  if (differenceInDays === 1) return "Due tomorrow";

  const formattedDate = new Date(
    year,
    month - 1,
    day,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `Due ${formattedDate}`;
}