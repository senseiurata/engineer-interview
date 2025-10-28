import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoApp from "./TodoApp";

describe("TodoApp", () => {
  it("can add todo item", () => {
    render(<TodoApp />);

    const addTodoInputField = screen.getByTestId("add-todo-input");
    const addTodoBtn = screen.getByTestId("add-todo-btn");
    fireEvent.change(addTodoInputField, { target: { value: "Test Add Todo" } });
    fireEvent.click(addTodoBtn);
    expect(screen.getByText("Test Add Todo")).toBeInTheDocument();
  });
});
