// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PhoneDetailClient } from "../components/phone-detail-client";
import type { PhoneDetail } from "../types/phone-detail.types";

const addItemMock = vi.fn();

vi.mock("@modules/cart/hooks/use-cart", () => {
  return {
    useCart: () => ({
      addItem: addItemMock,
    }),
  };
});

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
    {
      code: "512gb",
      name: "512GB",
      price: 1299,
    },
  ],
  similarProducts: [],
};

describe("PhoneDetailClient integration", () => {
  beforeEach(() => {
    addItemMock.mockReset();
  });

  it("keeps add-to-cart disabled until color and storage are selected", () => {
    render(<PhoneDetailClient phone={phoneFixture} />);

    const addButton = screen.getByRole("button", { name: "AÑADIR" });

    expect(addButton).toBeDisabled();
    expect(screen.queryByText("Black")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "256GB" }));
    expect(addButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Select color Black" }));
    expect(addButton).toBeEnabled();
    expect(screen.getByText("Black")).toBeInTheDocument();
  });

  it("updates displayed price and dispatches addItem with selected variant", () => {
    render(<PhoneDetailClient phone={phoneFixture} />);

    expect(screen.getByText("From 1099 EUR")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "512GB" }));
    fireEvent.click(screen.getByRole("button", { name: "Select color Black" }));

    expect(screen.getByText("1299 EUR")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "AÑADIR" }));

    expect(addItemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "phone-1",
        colorCode: "black",
        storageCode: "512gb",
        price: 1299,
        quantity: 1,
      }),
    );
  });
});
