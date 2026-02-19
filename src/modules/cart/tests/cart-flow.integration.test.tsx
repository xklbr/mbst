// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CartProvider } from "../store";
import { CartView } from "../components/cart-view";
import { PhoneDetailClient } from "@modules/phone-detail";
import type { PhoneDetail } from "@modules/phone-detail";

const phoneFixture: PhoneDetail = {
  id: "phone-1",
  name: "Galaxy S24 Ultra",
  brand: "Samsung",
  basePrice: 1099,
  imageUrl: "https://cdn.example.com/default.png",
  description: "Flagship smartphone",
  specs: {
    display: "6.8 OLED",
  },
  colorOptions: [
    {
      code: "black",
      name: "Black",
      imageUrl: "https://cdn.example.com/black.png",
    },
  ],
  storageOptions: [
    {
      code: "256gb",
      name: "256GB",
      price: 1099,
    },
  ],
  similarProducts: [],
};

describe("Cart flow integration", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds selected variant to cart, updates totals, persists, and removes item", async () => {
    render(
      <CartProvider>
        <PhoneDetailClient phone={phoneFixture} />
        <CartView />
      </CartProvider>,
    );

    const addButton = screen.getByRole("button", { name: "AÑADIR" });
    expect(addButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "256GB" }));
    fireEvent.click(screen.getByRole("button", { name: "Select color Black" }));
    expect(addButton).toBeEnabled();

    fireEvent.click(addButton);

    expect(screen.getByText("Galaxy S24 Ultra - Samsung")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pay/i })).toBeEnabled();

    await waitFor(() => {
      const raw = window.localStorage.getItem("mbst:cart");
      expect(raw).not.toBeNull();
      expect(raw).toContain("phone-1");
    });

    fireEvent.click(screen.getByRole("button", { name: "Delee" }));

    expect(
      screen.getByRole("heading", { name: /Cart \(0\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Pay/i }),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(window.localStorage.getItem("mbst:cart")).toBe("[]");
    });
  });
});
