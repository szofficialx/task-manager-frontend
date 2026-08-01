import type { Task, TaskPriority } from "../types/task";

const TASK_API_URL =
  "https://jsonplaceholder.typicode.com/todos";

interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const priorities: TaskPriority[] = [
  "low",
  "medium",
  "high",
];

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createDueDate(id: number): string {
  const date = new Date();

  // Produces dates between two days ago
  // and four days from today.
  const dayOffset = (id % 7) - 2;

  date.setDate(date.getDate() + dayOffset);

  return formatDateForInput(date);
}

export async function getTasks(
  signal?: AbortSignal,
): Promise<Task[]> {
  const response = await fetch(
    TASK_API_URL,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load tasks. Status: ${response.status}`,
    )
  }

  const apiTodos =
    (await response.json() as ApiTodo[]);

    return apiTodos
      .slice(0, 10)
      .map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,

        //JSONPlaceholder does not provide priority
        priority:
          priorities[
            todo.id % priorities.length
          ] ?? "medium",

        // JSONPlaceholder does not provide due dates.
        dueDate: createDueDate(todo.id)
      }));
}