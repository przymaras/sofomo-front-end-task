import { getByText, render, screen } from "@testing-library/react";

import LocationItem from "./LocationItem";

const testItemWithQuery = {
  searchValue: "77.65.100.187",
  ip: "77.65.100.187",
  city: "Poznań",
  latitude: "52.41360092163086",
  longitude: "16.837390899658203",
};

const testItemWithoutQuery = {
  searchValue: "",
  ip: "77.65.100.187",
  city: "Poznań",
  latitude: "52.41360092163086",
  longitude: "16.837390899658203",
};

describe("Location item", () => {
  test("renders 'Query' if available", () => {
    render(<LocationItem item={testItemWithQuery} />);

    const element = screen.queryAllByText("query", { exact: false });

    expect(element).not.toHaveLength(0);
  });

  test("not renders 'Query' if not available", () => {
    render(<LocationItem item={testItemWithoutQuery} />);

    const element = screen.queryAllByText("query:", { exact: false });

    expect(element).toHaveLength(0);
  });

  test("renders 'IP: number'", () => {
    render(<LocationItem item={testItemWithoutQuery} />);

    const element = screen.getByText("IP: 77.65.100.187");

    expect(element).toBeInTheDocument();
  });

  test("renders 'City: city'", () => {
    render(<LocationItem item={testItemWithoutQuery} />);

    const element = screen.getByText("City: Poznań");

    expect(element).toBeInTheDocument();
  });

  test("renders 'Lat: latitude'", () => {
    render(<LocationItem item={testItemWithoutQuery} />);

    const element = screen.getByText("Lat: 52.41360092163086");

    expect(element).toBeInTheDocument();
  });

  test("renders 'Lng: longitude'", () => {
    render(<LocationItem item={testItemWithoutQuery} />);

    const element = screen.getByText("Lng: 16.837390899658203");

    expect(element).toBeInTheDocument();
  });
});
