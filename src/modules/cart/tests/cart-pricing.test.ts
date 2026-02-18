import { describe, expect, it } from "vitest";

import { calculateCartTotal } from "../lib/cart-pricing";

describe("calculateCartTotal", () => {
  it("returns 0 for empty cart", () => {
    expect(calculateCartTotal([])).toBe(0);
  });

  it("sums price multiplied by quantity", () => {
    const total = calculateCartTotal([
      {
        id: "1",
        name: "Phone 1",
        brand: "Brand",
        imageUrl: "",
        colorCode: "black",
        colorName: "Black",
        storageCode: "256",
        storageName: "256GB",
        price: 100,
        quantity: 2,
      },
      {
        id: "2",
        name: "Phone 2",
        brand: "Brand",
        imageUrl: "",
        colorCode: "silver",
        colorName: "Silver",
        storageCode: "512",
        storageName: "512GB",
        price: 250,
        quantity: 1,
      },
    ]);

    expect(total).toBe(450);
  });
});
