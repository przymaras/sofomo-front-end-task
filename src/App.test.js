import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

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

describe("Component SearchBar", () => {
  test("don't accept invalid IP", () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ip: "77.65.100.187" }),
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        ip: "77.65.100.187",
        type: "ipv4",
        continent_code: "EU",
        continent_name: "Europe",
        country_code: "PL",
        country_name: "Poland",
        region_code: "WP",
        region_name: "Greater Poland",
        city: "Poznań",
        zip: "60-001",
        latitude: 52.41360092163086,
        longitude: 16.837390899658203,
        location: {
          geoname_id: 3088171,
          capital: "Warsaw",
          languages: [
            {
              code: "pl",
              name: "Polish",
              native: "Polski",
            },
          ],
          country_flag: "https://assets.ipstack.com/flags/pl.svg",
          country_flag_emoji: "🇵🇱",
          country_flag_emoji_unicode: "U+1F1F5 U+1F1F1",
          calling_code: "48",
          is_eu: true,
        },
      }),
    });
    render(<App />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "192.168.0.y");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);
  });

  const element = screen.queryAllByText(/loading.../i);
  expect(element).toHaveLength(0);

  test("accept valid IP", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ip: "77.65.100.187" }),
    });
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        ip: "77.65.100.187",
        type: "ipv4",
        continent_code: "EU",
        continent_name: "Europe",
        country_code: "PL",
        country_name: "Poland",
        region_code: "WP",
        region_name: "Greater Poland",
        city: "Poznań",
        zip: "60-001",
        latitude: 52.41360092163086,
        longitude: 16.837390899658203,
        location: {
          geoname_id: 3088171,
          capital: "Warsaw",
          languages: [
            {
              code: "pl",
              name: "Polish",
              native: "Polski",
            },
          ],
          country_flag: "https://assets.ipstack.com/flags/pl.svg",
          country_flag_emoji: "🇵🇱",
          country_flag_emoji_unicode: "U+1F1F5 U+1F1F1",
          calling_code: "48",
          is_eu: true,
        },
      }),
    });

    render(<App />);

    const searchInput = screen.getByRole("searchbox");
    userEvent.type(searchInput, "192.168.0.1");

    const searchBtn = screen.getByRole("button", { name: /search/i });
    userEvent.click(searchBtn);
    const element = await screen.findAllByText(
      /query: 192.168.0.1/i,
      {},
      { timeout: 2000 }
    );
    expect(element).not.toHaveLength(0);
  });
});
