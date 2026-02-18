// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartPage } from "../pages/cart-page";

const removeItemMock = vi.fn();

vi.mock("../store", () => {
  return {
    useCart: () => ({
      items: [
        {
          id: "phone-1",
          name: "Galaxy S24",
          brand: "Samsung",
          imageUrl: "",
          colorCode: "black",
          colorName: "Black",
          storageCode: "256gb",
          storageName: "256GB",
          price: 909,
          quantity: 1,
        },
      ],
      removeItem: removeItemMock,
      totalPrice: 909,
    }),
  };
});

vi.mock("@components/layout/app-navbar", () => {
  return {
    AppNavbar: () => <div>navbar</div>,
  };
});

describe("CartPage integration", () => {
  beforeEach(() => {
    removeItemMock.mockReset();
  });

  it("triggers remove callback with selected variant key", () => {
    render(<CartPage />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(removeItemMock).toHaveBeenCalledWith({
      id: "phone-1",
      colorCode: "black",
      storageCode: "256gb",
    });
  });

  it("shows pay CTA", () => {
    render(<CartPage />);

    expect(screen.getByRole("button", { name: /Pay/i })).toBeInTheDocument();
  });
});
