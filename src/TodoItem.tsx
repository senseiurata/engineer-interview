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
    <div data-testid="todo-item" className="flex gap-3">
      <button
        onClick={handleMovePrevious?.(id)}
        aria-label="Move to previous"
        disabled={!handleMovePrevious}
        data-testid="prev-btn"
      >
        &larr;
      </button>
      {name}
      <button
        onClick={handleMoveNext?.(id)}
        aria-label="Move to next"
        disabled={!handleMoveNext}
        data-testid="next-btn"
      >
        &rarr;
      </button>
    </div>
  );
}

export default TodoItem;
