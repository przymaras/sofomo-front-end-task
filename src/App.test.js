import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import App from "./App";

// beforeAll(() => {
//   jest.spyOn(window, "fetch");
// });

describe("Initial render", () => {
  test("renders 'Your location' header", () => {
    render(<App />);
    const element = screen.getByRole("heading", {
      name: /your location/i,
    });
    expect(element).toBeInTheDocument();
  });
  test("renders 'Search result' header", () => {
    render(<App />);
    const element = screen.getByRole("heading", {
      name: /search result/i,
    });
    expect(element).toBeInTheDocument();
  });

  test("renders info paragraph", () => {
    render(<App />);
    const element = screen.getByText(/you have to search something first/i);
    expect(element).toBeInTheDocument();
  });
  test("renders 'Search history' header", () => {
    render(<App />);
    const element = screen.getByRole("heading", { name: /search history/i });
    expect(element).toBeInTheDocument();
  });
  test("renders two 'Location markers'", () => {
    render(<App />);
    const element = screen.getAllByText(/map marker/i);
    expect(element.length).toBe(2);
  });
  test("renders searchbar", () => {
    render(<App />);
    const element = screen.getByRole("searchbox");
    expect(element).toBeInTheDocument();
  });
  test("renders search button", () => {
    render(<App />);
    const element = screen.getByRole("button", { name: /search/i });
    expect(element).toBeInTheDocument();
  });
});
