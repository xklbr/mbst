// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VariantPicker } from "../components/variant-picker";

const colorOptions = [
  { code: "black", name: "Black", imageUrl: "" },
  { code: "white", name: "White", imageUrl: "" },
];

const storageOptions = [
  { code: "128gb", name: "128GB", price: 799 },
  { code: "256gb", name: "256GB", price: 899 },
];

const defaultProps = {
  colorOptions,
  storageOptions,
  selectedColorCode: null,
  selectedStorageCode: null,
  onSelectColor: vi.fn(),
  onSelectStorage: vi.fn(),
};

describe("VariantPicker", () => {
  it("renders all storage options as buttons", () => {
    render(<VariantPicker {...defaultProps} />);
    expect(screen.getByRole("button", { name: "128GB" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "256GB" })).toBeInTheDocument();
  });

  it("renders color swatches with accessible labels", () => {
    render(<VariantPicker {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "Select color Black" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Select color White" }),
    ).toBeInTheDocument();
  });

  it("calls onSelectStorage with the correct code", () => {
    const onSelectStorage = vi.fn();
    render(<VariantPicker {...defaultProps} onSelectStorage={onSelectStorage} />);

    fireEvent.click(screen.getByRole("button", { name: "256GB" }));
    expect(onSelectStorage).toHaveBeenCalledOnce();
    expect(onSelectStorage).toHaveBeenCalledWith("256gb");
  });

  it("calls onSelectColor with the correct code", () => {
    const onSelectColor = vi.fn();
    render(<VariantPicker {...defaultProps} onSelectColor={onSelectColor} />);

    fireEvent.click(screen.getByRole("button", { name: "Select color Black" }));
    expect(onSelectColor).toHaveBeenCalledOnce();
    expect(onSelectColor).toHaveBeenCalledWith("black");
  });

  it("marks selected storage as aria-pressed=true, others as false", () => {
    render(
      <VariantPicker {...defaultProps} selectedStorageCode="128gb" />,
    );
    expect(screen.getByRole("button", { name: "128GB" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "256GB" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("marks selected color as aria-pressed=true and shows its name", () => {
    render(
      <VariantPicker {...defaultProps} selectedColorCode="black" />,
    );
    expect(
      screen.getByRole("button", { name: "Select color Black" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Select color White" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Black")).toBeInTheDocument();
  });

  it("shows no color name when none is selected", () => {
    render(<VariantPicker {...defaultProps} selectedColorCode={null} />);
    // Color name area should be empty
    expect(screen.queryByText("Black")).not.toBeInTheDocument();
    expect(screen.queryByText("White")).not.toBeInTheDocument();
  });
});
