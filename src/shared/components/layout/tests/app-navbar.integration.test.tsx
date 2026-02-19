// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AppNavbar } from "../app-navbar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

vi.mock("@modules/cart/hooks/use-cart", () => ({
  useCart: vi.fn(() => ({ itemCount: 0 })),
}));

import { usePathname } from "next/navigation";
import { useCart } from "@modules/cart/hooks/use-cart";

describe("AppNavbar", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
    vi.mocked(useCart).mockReturnValue({ itemCount: 0 } as ReturnType<typeof useCart>);
  });

  it("renders home link with correct aria-label", () => {
    render(<AppNavbar />);
    expect(screen.getByRole("link", { name: "MBST Home" })).toBeInTheDocument();
  });

  it("displays cart item count", () => {
    vi.mocked(useCart).mockReturnValue({ itemCount: 3 } as ReturnType<typeof useCart>);
    render(<AppNavbar />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("uses plural form for multiple items", () => {
    vi.mocked(useCart).mockReturnValue({ itemCount: 3 } as ReturnType<typeof useCart>);
    render(<AppNavbar />);
    expect(
      screen.getByRole("link", { name: "Open cart, 3 items" }),
    ).toBeInTheDocument();
  });

  it("uses singular form for 1 item", () => {
    vi.mocked(useCart).mockReturnValue({ itemCount: 1 } as ReturnType<typeof useCart>);
    render(<AppNavbar />);
    expect(
      screen.getByRole("link", { name: "Open cart, 1 item" }),
    ).toBeInTheDocument();
  });

  it("hides cart link when on cart page", () => {
    vi.mocked(usePathname).mockReturnValue("/cart");
    vi.mocked(useCart).mockReturnValue({ itemCount: 2 } as ReturnType<typeof useCart>);
    render(<AppNavbar />);
    expect(
      screen.queryByRole("link", { name: /Open cart/i }),
    ).not.toBeInTheDocument();
  });
});
