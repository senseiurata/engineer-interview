import TodoItem from "./TodoItem";
import type { TodoItem as TodoItemType } from "./types";

function TodoSection({
  title,
  slug,
  todoItems,
  handleMovePrevious,
  handleMoveNext,
}: {
  title: string;
  slug: string;
  todoItems: TodoItemType[];
  handleMovePrevious?: Function;
  handleMoveNext?: Function;
}) {
  return (
    <section
      data-testid={`todo-section-${slug}`}
      className="w-64 rounded-md shadow-md shadow-gray-400 p-4"
    >
      <h2 className="text-center text-lg mb-6">{title}</h2>

      <ol className="list-none flex flex-col gap-2">
        {todoItems.map((item: TodoItemType) => (
          <li key={item.id}>
            <TodoItem
              id={item.id}
              name={item.task}
              handleMovePrevious={handleMovePrevious}
              handleMoveNext={handleMoveNext}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TodoSection;
