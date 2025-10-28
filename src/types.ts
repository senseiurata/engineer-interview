export type TodoItem = {
  id: number;
  task: string;
};

export type TodoSection = {
  id: number;
  title: string;
  items: TodoItem[];
};
