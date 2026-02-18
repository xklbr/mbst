import type { CartItem, CartState } from "../types/cart.types";
import { getCartItemKey } from "../types/cart.types";

export type CartAction =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: CartItem }
  | { type: "remove"; payload: Pick<CartItem, "id" | "colorCode" | "storageCode"> }
  | { type: "clear" };

export const cartInitialState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate": {
      return { items: action.payload };
    }
    case "add": {
      const incoming = action.payload;
      const incomingKey = getCartItemKey(incoming);
      const exists = state.items.some((item) => getCartItemKey(item) === incomingKey);

      if (!exists) {
        return {
          items: [...state.items, incoming],
        };
      }

      return {
        items: state.items.map((item) => {
          if (getCartItemKey(item) !== incomingKey) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + incoming.quantity,
          };
        }),
      };
    }
    case "remove": {
      const incomingKey = getCartItemKey(action.payload);
      return {
        items: state.items.filter((item) => getCartItemKey(item) !== incomingKey),
      };
    }
    case "clear": {
      return cartInitialState;
    }
    default: {
      return state;
    }
  }
}
