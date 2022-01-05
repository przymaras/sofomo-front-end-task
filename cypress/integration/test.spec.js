/// <reference types="Cypress" />

describe("Sofono app", () => {
  beforeEach(() => {
    // cy.visit("localhost:3000");
    cy.visit("localhost:3000", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch") //.withArgs('/favorite-fruits')
          .resolves({
            ok: true,
            json: () => ({
              ip: "77.65.100.187",
              type: "ipv4",
              continent_code: "EU",
              continent_name: "Europe",
              country_code: "PL",
              country_name: "Poland",
              region_code: "WP",
              region_name: "Greater Poland",
              city: "Test Poznań",
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
      },
    });
  });

  after(() => {
    window.sessionStorage.removeItem("searchHistory");
  });

  it("not allows invalid IP", () => {
    cy.get("input").type("192.168.0.y");
    cy.get(".SearchBar_form__5Ctlt > button").click();
    cy.contains("Invalid IP or invalid URL - please check ...").should(
      "be.visible"
    );
  });
  it("not allows invalid URL", () => {
    cy.get("input").type("google,com");
    cy.get(".SearchBar_form__5Ctlt > button").click();
    cy.contains("Invalid IP or invalid URL - please check ...").should(
      "be.visible"
    );
  });
  it("allows valid URL", () => {
    cy.get("input").type("google.com");
    cy.get(".SearchBar_form__5Ctlt > button").click();
    cy.contains("Invalid IP or invalid URL - please check ...").should(
      "not.exist"
    );
  });
  it("allows valid IP", () => {
    cy.get("input").type("192.168.0.1");
    cy.get(".SearchBar_form__5Ctlt > button").click();
    cy.contains("Invalid IP or invalid URL - please check ...").should(
      "not.exist"
    );
  });
  it("add search queries to search history", () => {
    cy.contains("Query: google.com").should("be.visible");
    cy.contains("Query: 192.168.0.1").should("be.visible");
  });
});
