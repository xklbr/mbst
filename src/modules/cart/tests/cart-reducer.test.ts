import { describe, expect, it } from "vitest";

import { cartInitialState, cartReducer } from "../store/cart-reducer";
import type { CartItem } from "../types/cart.types";

function createItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: "phone-1",
    name: "Galaxy S24",
    brand: "Samsung",
    imageUrl: "",
    colorCode: "black",
    colorName: "Black",
    storageCode: "256gb",
    storageName: "256GB",
    price: 999,
    quantity: 1,
    ...overrides,
  };
}

describe("cartReducer", () => {
  it("adds a new variant when it does not exist", () => {
    const next = cartReducer(cartInitialState, {
      type: "add",
      payload: createItem(),
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]?.quantity).toBe(1);
  });

  it("increments quantity when adding the same variant", () => {
    const stateWithItem = {
      items: [createItem({ quantity: 1 })],
    };

    const next = cartReducer(stateWithItem, {
      type: "add",
      payload: createItem({ quantity: 2 }),
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]?.quantity).toBe(3);
  });

  it("keeps separate entries for different variants", () => {
    const stateWithItem = {
      items: [createItem({ colorCode: "black" })],
    };

    const next = cartReducer(stateWithItem, {
      type: "add",
      payload: createItem({ colorCode: "silver", colorName: "Silver" }),
    });

    expect(next.items).toHaveLength(2);
  });

  it("removes a specific variant", () => {
    const stateWithItems = {
      items: [
        createItem({ colorCode: "black" }),
        createItem({ colorCode: "silver", colorName: "Silver" }),
      ],
    };

    const next = cartReducer(stateWithItems, {
      type: "remove",
      payload: { id: "phone-1", colorCode: "silver", storageCode: "256gb" },
    });

    expect(next.items).toHaveLength(1);
    expect(next.items[0]?.colorCode).toBe("black");
  });

  it("hydrates and clears cart", () => {
    const hydrated = cartReducer(cartInitialState, {
      type: "hydrate",
      payload: [createItem()],
    });

    expect(hydrated.items).toHaveLength(1);

    const cleared = cartReducer(hydrated, { type: "clear" });

    expect(cleared).toEqual(cartInitialState);
  });
});
