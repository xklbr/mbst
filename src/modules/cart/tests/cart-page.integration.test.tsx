// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartView } from "../components/cart-view";

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

vi.mock("@shared/components/layout/app-navbar", () => {
  return {
    AppNavbar: () => <div>navbar</div>,
  };
});

describe("CartView integration", () => {
  beforeEach(() => {
    removeItemMock.mockReset();
  });

  it("triggers remove callback with selected variant key", () => {
    render(<CartView />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(removeItemMock).toHaveBeenCalledWith({
      id: "phone-1",
      colorCode: "black",
      storageCode: "256gb",
    });
  });

  it("shows pay CTA", () => {
    render(<CartView />);

    expect(screen.getByRole("button", { name: /Pay/i })).toBeInTheDocument();
  });
});
