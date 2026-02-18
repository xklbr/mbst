"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { calculateCartTotal } from "../lib/cart-pricing";
import { cartInitialState, cartReducer } from "./cart-reducer";
import type { CartItem } from "../types/cart.types";

const CART_STORAGE_KEY = "mbst:cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isHydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (item: Pick<CartItem, "id" | "colorCode" | "storageCode">) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      dispatch({ type: "hydrate", payload: parsed });
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [isHydrated, state.items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return {
      items: state.items,
      itemCount,
      totalPrice: calculateCartTotal(state.items),
      isHydrated,
      addItem: (item) => dispatch({ type: "add", payload: item }),
      removeItem: (item) => dispatch({ type: "remove", payload: item }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [isHydrated, state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
