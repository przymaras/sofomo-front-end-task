import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("Component SearchBar", () => {
  test("don't accept invalid IP", () => {
    render(<SearchBar area="search" handleSearch={jest.fn()} />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "192.168.0.y");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);

    const element = screen.queryAllByText(
      /Invalid IP or invalid URL - please check .../i
    );
    expect(element).not.toHaveLength(0);
  });
  test("accept valid IP", () => {
    render(<SearchBar area="search" handleSearch={jest.fn()} />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "192.168.0.1");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);

    const element = screen.queryAllByText(
      /Invalid IP or invalid URL - please check .../i
    );
    expect(element).toHaveLength(0);
  });
  test("don't accept invalid URL", () => {
    render(<SearchBar area="search" handleSearch={jest.fn()} />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "google");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);

    const element = screen.queryAllByText(
      /Invalid IP or invalid URL - please check .../i
    );
    expect(element).not.toHaveLength(0);
  });
  test("accept valid URL", () => {
    render(<SearchBar area="search" handleSearch={jest.fn()} />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "google.com");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);

    const element = screen.queryAllByText(
      /Invalid IP or invalid URL - please check .../i
    );
    expect(element).toHaveLength(0);
  });
});
