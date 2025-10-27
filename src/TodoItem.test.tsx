import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  it("renders task name", () => {
    render(<TodoItem name={"Test task"} />);
    const textElement = screen.getByText("Test task");
    expect(textElement).toBeInTheDocument();
  });

  it("has enabled move previous button when handleMovePrevious is passed in", () => {
    render(<TodoItem name="name" handleMovePrevious={() => {}} />);
    const prevBtn = screen.getByTestId("prev-btn");
    expect(prevBtn).not.toBeDisabled();
  });

  it("has disabled move previous button when handleMovePrevious is not passed in", () => {
    render(<TodoItem name="name" />);
    const prevBtn = screen.getByTestId("prev-btn");
    expect(prevBtn).toBeDisabled();
  });

  it("has enabled move next button when handleMoveNext is passed in", () => {
    render(<TodoItem name="name" handleMoveNext={() => {}} />);
    const nextBtn = screen.getByTestId("next-btn");
    expect(nextBtn).not.toBeDisabled();
  });

  it("has disabled move next button when handleMoveNext is not passed in", () => {
    render(<TodoItem name="name" />);
    const nextBtn = screen.getByTestId("next-btn");
    expect(nextBtn).toBeDisabled();
  });
});
