import TodoItem from "./TodoItem";
import type { TodoItem as TodoItemType } from "./types";

function TodoSection({
  title,
  todoItems,
  handleMovePrevious,
  handleMoveNext,
}: {
  title: string;
  todoItems: TodoItemType[];
  handleMovePrevious?: Function;
  handleMoveNext?: Function;
}) {
  return (
    <section>
      <h2>{title}</h2>

      {todoItems.map((item: TodoItemType) => (
        <TodoItem
          key={item.id}
          id={item.id}
          name={item.task}
          handleMovePrevious={handleMovePrevious}
          handleMoveNext={handleMoveNext}
        />
      ))}
    </section>
  );
}

export default TodoSection;
