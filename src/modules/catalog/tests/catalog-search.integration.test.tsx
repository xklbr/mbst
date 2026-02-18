// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CatalogSearch } from "../components/catalog-search";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      replace: replaceMock,
    }),
  };
});

describe("CatalogSearch integration", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces search updates into URL", () => {
    render(<CatalogSearch initialValue="" />);

    const input = screen.getByLabelText("Search phones by name or brand");

    fireEvent.change(input, { target: { value: "galaxy" } });

    expect(replaceMock).not.toHaveBeenCalled();

    vi.advanceTimersByTime(250);

    expect(replaceMock).toHaveBeenLastCalledWith("/?search=galaxy");
  });

  it("navigates back to root when search input is cleared", () => {
    render(<CatalogSearch initialValue="iphone" />);

    const input = screen.getByLabelText("Search phones by name or brand");

    fireEvent.change(input, { target: { value: "" } });
    vi.advanceTimersByTime(250);

    expect(replaceMock).toHaveBeenLastCalledWith("/");
  });
});
