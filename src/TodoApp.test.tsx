import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, assert } from "vitest";
import TodoApp from "./TodoApp";

describe("TodoApp", () => {
  beforeEach(() => {
    render(<TodoApp />);
  });

  it("can add todo item", () => {
    const addTodoInputField = screen.getByTestId("todo-app__add-todo-input");
    const addTodoBtn = screen.getByTestId("todo-app__add-todo-btn");
    fireEvent.change(addTodoInputField, { target: { value: "Test Add Todo" } });
    fireEvent.click(addTodoBtn);
    expect(screen.getByText("Test Add Todo")).toBeInTheDocument();
  });

  describe("w/ added item", () => {
    beforeEach(() => {
      const addTodoInputField = screen.getByTestId("todo-app__add-todo-input");
      const addTodoBtn = screen.getByTestId("todo-app__add-todo-btn");
      fireEvent.change(addTodoInputField, {
        target: { value: "Test Add Todo" },
      });
      fireEvent.click(addTodoBtn);
    });

    it("is located in todo section", () => {
      const todoSection = screen.getByTestId("todo-section-todo");
      expect(
        within(todoSection).getByText("Test Add Todo"),
      ).toBeInTheDocument();
    });

    it("previous button is disabled", () => {
      const todoItems = screen.getAllByTestId("todo-item");
      const testTodo = todoItems.find((item) =>
        within(item).queryByText("Test Add Todo"),
      );

      if (!testTodo) {
        assert.fail("Test todo not found");
      }

      const prevBtn = within(testTodo).queryByTestId("todo-item__prev-btn");
      expect(prevBtn).toHaveAttribute("disabled");
    });

    it("next button is enabled", () => {
      const todoItems = screen.getAllByTestId("todo-item");
      const testTodo = todoItems.find((item) =>
        within(item).queryByText("Test Add Todo"),
      );

      if (!testTodo) {
        assert.fail("Test todo not found");
      }

      const nextBtn = within(testTodo).queryByTestId("todo-item__next-btn");
      expect(nextBtn).not.toHaveAttribute("disabled");
    });
  });

  describe("w/ added item moved twice to next section", () => {
    beforeEach(() => {
      const addTodoInputField = screen.getByTestId("todo-app__add-todo-input");
      const addTodoBtn = screen.getByTestId("todo-app__add-todo-btn");
      fireEvent.change(addTodoInputField, {
        target: { value: "Test Add Todo" },
      });
      fireEvent.click(addTodoBtn);

      const todoSection = screen.getByTestId("todo-section-todo");
      const testTodoInTodoSection = within(todoSection)
        .getAllByTestId("todo-item")
        .find((item) => within(item).queryByText("Test Add Todo"));

      if (!testTodoInTodoSection) {
        assert.fail("Test todo not found in Todo section");
      }

      fireEvent.click(
        within(testTodoInTodoSection).getByTestId("todo-item__next-btn"),
      );

      const inProgressSection = screen.getByTestId("todo-section-in-progress");
      const testTodoInInProgressSection = within(inProgressSection)
        .getAllByTestId("todo-item")
        .find((item) => within(item).queryByText("Test Add Todo"));

      if (!testTodoInInProgressSection) {
        assert.fail("Test todo not found in In Progress section");
      }

      fireEvent.click(
        within(testTodoInInProgressSection).getByTestId("todo-item__next-btn"),
      );
    });

    it("is located in done section", () => {
      const todoSection = screen.getByTestId("todo-section-done");
      expect(
        within(todoSection).getByText("Test Add Todo"),
      ).toBeInTheDocument();
    });

    it("previous button is enabled", () => {
      const todoItems = screen.getAllByTestId("todo-item");
      const testTodo = todoItems.find((item) =>
        within(item).queryByText("Test Add Todo"),
      );

      if (!testTodo) {
        assert.fail("Test todo not found");
      }

      const prevBtn = within(testTodo).getByTestId("todo-item__prev-btn");
      expect(prevBtn).not.toHaveAttribute("disabled");
    });

    it("next button is disabled", () => {
      const todoItems = screen.getAllByTestId("todo-item");
      const testTodo = todoItems.find((item) =>
        within(item).queryByText("Test Add Todo"),
      );

      if (!testTodo) {
        assert.fail("Test todo not found");
      }

      const nextBtn = within(testTodo).getByTestId("todo-item__next-btn");
      expect(nextBtn).toHaveAttribute("disabled");
    });
  });
});
