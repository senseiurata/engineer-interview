import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import TodoSection from "./TodoSection";
import type { TodoItem, TodoSection as TodoSectionType } from "./types";

// TODO: move dummy todo items data to state
const todoSections: TodoSectionType[] = [
  {
    id: 1,
    slug: "todo",
    title: "Todo",
  },
  {
    id: 2,
    slug: "in-progress",
    title: "In Progress",
  },
  {
    id: 3,
    slug: "done",
    title: "Done",
  },
];

function TodoApp() {
  const [newTodo, setNewTodo] = useState("");
  const [sectionIdToItems, setSectionIdToItems] = useState<
    Map<number, TodoItem[]>
  >(
    new Map([
      [
        1,
        [
          {
            id: 1,
            task: "Wash dishes",
          },
          {
            id: 2,
            task: "Do coding assignment",
          },
        ],
      ],
      [
        2,
        [
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
      ],
      [
        3,
        [
          {
            id: 6,
            task: "Take a shower",
          },
          {
            id: 7,
            task: "Study JavaScript",
          },
        ],
      ],
    ]),
  );

  const maxItemId = useMemo(() => {
    return [...sectionIdToItems.values()]
      .flat()
      .reduce(
        (maxId, { id: currentItemId }) => Math.max(currentItemId, maxId),
        Number.MIN_SAFE_INTEGER,
      );
  }, [sectionIdToItems]);

  // Add new item to first section
  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = todoSections[0];

    const newSectionIdToItems = new Map(sectionIdToItems);
    newSectionIdToItems.set(id, [
      ...(sectionIdToItems.get(id) || []),
      { id: maxItemId + 1, task: newTodo },
    ]);

    setSectionIdToItems(newSectionIdToItems);
    setNewTodo("");
  };

  const getHandleMoveTodo = (id: number, getDestinationIndex: Function) => {
    return () => {
      const newSectionIdToItems = new Map(sectionIdToItems);
      const sectionIds = [...newSectionIdToItems.keys()];

      for (let index = 0; index < sectionIds.length; index++) {
        const sectionId = sectionIds[index];
        const todoItems = newSectionIdToItems.get(sectionId) || [];

        const todoItemIndex = todoItems.findIndex(
          ({ id: itemId }) => id === itemId,
        );

        if (todoItemIndex !== -1) {
          const destinationIndex = getDestinationIndex(index);

          if (destinationIndex < 0 || destinationIndex >= todoSections.length) {
            throw new Error(
              `destination index out of bounds: ${destinationIndex}`,
            );
          }

          const itemToMove = todoItems[todoItemIndex];
          todoItems.splice(todoItemIndex, 1);

          const { id: destinationSectionId } = todoSections[destinationIndex];

          // append todo item at end of the destination section
          newSectionIdToItems.set(destinationSectionId, [
            ...(sectionIdToItems.get(destinationSectionId) || []),
            itemToMove,
          ]);

          break;
        }
      }
      setSectionIdToItems(newSectionIdToItems);
    };
  };

  const handleMovePrevious = (id: number) => {
    const getDestinationIndex = (index: number) => index - 1;

    return getHandleMoveTodo(id, getDestinationIndex);
  };

  const handleMoveNext = (id: number) => {
    const getDestinationIndex = (index: number) => index + 1;

    return getHandleMoveTodo(id, getDestinationIndex);
  };

  return (
    <div className="p-7">
      <div>
        <ol className="list-none flex flex-wrap gap-6">
          {todoSections.map(
            (
              { id, title, slug }: { id: number; title: string; slug: string },
              index: number,
            ) => {
              return (
                <li key={id} className="flex-none">
                  <TodoSection
                    slug={slug}
                    title={title}
                    todoItems={sectionIdToItems.get(id) ?? []}
                    handleMovePrevious={
                      index !== 0 ? handleMovePrevious : undefined
                    }
                    handleMoveNext={
                      index !== todoSections.length - 1
                        ? handleMoveNext
                        : undefined
                    }
                  />
                </li>
              );
            },
          )}
        </ol>
      </div>
      <form onSubmit={handleAddTodo} className="mt-6 flex gap-5">
        <input
          required
          className="border border-black px-5 placeholder:text-sm"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          data-testid="add-todo-input"
          name="todo"
          placeholder="Add Task"
          value={newTodo}
        />
        <button
          aria-label="Add todo"
          data-testid="add-todo-btn"
          className="px-6 py-2 text-lg rounded-lg bg-blue-600 text-white"
        >
          +
        </button>
      </form>
    </div>
  );
}

export default TodoApp;
