import { fireEvent, render, screen } from "@testing-library/react";
import TestingStateChange from "../components/TestingStateChange";

describe("TestingStateChange Component", () => {
  test("Testing state change", () => {
    render(<TestingStateChange />);

    expect(screen.getByText(/page loaded/i)).toBeInTheDocument();
  });

  test("Testing state change on button click", () => {
    render(<TestingStateChange />);

    fireEvent.click(screen.getByText(/toggle text/i));

    expect(screen.getByText(/text visible/i)).toBeInTheDocument();
  });

  test("Testing disabled on button click", () => {
    render(<TestingStateChange />);

    fireEvent.click(screen.getByText(/toggle button disabled/i));

    expect(screen.getByText(/toggle text/i)).toBeDisabled();
  });

  test("Testing adding elements to list on button click", () => {
    render(<TestingStateChange />);

    expect(screen.getAllByTestId("record").length).toBe(3);

    fireEvent.click(screen.getByText(/add to list/i));

    expect(screen.getAllByTestId("record").length).toBe(4);
  });

  test("Testing removing elements from the list on button click", () => {
    render(<TestingStateChange />);

    expect(screen.getAllByTestId("record").length).toBe(3);

    fireEvent.click(screen.getByText(/remove from list/i));

    expect(screen.getAllByTestId("record").length).toBe(2);
  });
});
