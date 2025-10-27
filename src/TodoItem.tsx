function TodoItem({
  name,
  handleMovePrevious,
  handleMoveNext,
}: {
  name: string;
  handleMovePrevious?: Function;
  handleMoveNext?: Function;
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => handleMovePrevious?.()}
        aria-label="Move to previous"
        disabled={!handleMovePrevious}
        data-testid="prev-btn"
      >
        &larr;
      </button>
      {name}
      <button
        onClick={() => handleMoveNext?.()}
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
