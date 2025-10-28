import TodoSection from "./TodoSection";
import type { TodoItem, TodoSection as TodoSectionType } from "./types";

// TODO: move dummy todo items data to state
const todoSections: TodoSectionType[] = [
  {
    id: 1,
    title: "Todo",
    items: [
      {
        id: 1,
        task: "Wash dishes",
      },
      {
        id: 2,
        task: "Do coding assignment",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    items: [
      {
        id: 3,
        task: "Mow the lawn",
      },
      {
        id: 4,
        task: "Pull weeds",
      },
      {
        id: 5,
        task: "Rake the leaves",
      },
    ],
  },
  {
    id: 3,
    title: "Done",
    items: [
      {
        id: 6,
        task: "Take a shower",
      },
      {
        id: 7,
        task: "Study JavaScript",
      },
    ],
  },
];

function TodoApp() {
  const handleAddTodo = () => {
    // TODO: Implement add todo
  };

  const handleMovePrevious = () => {
    // TODO: Implement move to previous section
  };

  const handleMoveNext = () => {
    // TODO: Implement move to next section
  };

  return (
    <div>
      <div className="flex gap-1">
        {todoSections.map(
          ({
            id,
            title,
            items,
          }: {
            id: number;
            title: string;
            items: TodoItem[];
          }) => {
            return (
              <TodoSection
                key={id}
                title={title}
                todoItems={items}
                handleMovePrevious={handleMovePrevious}
                handleMoveNext={handleMoveNext}
              />
            );
          },
        )}
      </div>
      <form onSubmit={handleAddTodo}>
        <input name="todo" placeholder="Add Task" />
        <button aria-label="Add todo">+</button>
      </form>
    </div>
  );
}

export default TodoApp;
