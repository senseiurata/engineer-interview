function TodoItem({
  id,
  name,
  handleMovePrevious,
  handleMoveNext,
}: {
  id: number;
  name: string;
  handleMovePrevious?: Function;
  handleMoveNext?: Function;
}) {
  return (
    <div
      data-testid="todo-item"
      className="flex items-center gap-3 p-2 rounded-md shadow-md shadow-gray-400"
    >
      <button
        className="px-1 py-2 flex-none text-xl rounded-md shadow-md shadow-gray-400 bg-red-700 text-white disabled:opacity-40"
        onClick={handleMovePrevious?.(id)}
        aria-label="Move to previous"
        disabled={!handleMovePrevious}
        data-testid="todo-item__prev-btn"
      >
        &larr;
      </button>
      <span className="flex-auto text-sm text-center">{name}</span>
      <button
        className="px-1 py-2 flex-none text-xl rounded-md shadow-md shadow-gray-400 bg-green-700 text-white disabled:opacity-40"
        onClick={handleMoveNext?.(id)}
        aria-label="Move to next"
        disabled={!handleMoveNext}
        data-testid="todo-item__next-btn"
      >
        &rarr;
      </button>
    </div>
  );
}

export default TodoItem;
