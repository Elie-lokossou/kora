import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { explainBlindSpots } from "./blindspots";

describe("explainBlindSpots", () => {
  it("makes hidden transactions the headline", () => {
    const text = explainBlindSpots([
      "individual_transactions",
      "personal_identity",
    ]);
    assert.match(text, /clientèle/);
    assert.match(text, /personnelles/);
  });

  it("does not celebrate a fully open file", () => {
    const text = explainBlindSpots([]);
    assert.match(text, /tout ouvert/);
  });
});
