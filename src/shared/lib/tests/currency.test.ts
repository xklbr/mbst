import { describe, expect, it } from "vitest";

import { formatCurrency } from "../currency";

describe("formatCurrency", () => {
  it("formats a whole number in es-ES EUR format", () => {
    const result = formatCurrency(1099);
    expect(result).toMatch(/1[.,\s]?099,00/);
    expect(result).toMatch(/€/);
  });

  it("applies thousands grouping separator for large values", () => {
    const result = formatCurrency(10000);
    expect(result).toMatch(/10\.000,00/);
    expect(result).toMatch(/€/);
  });

  it("formats zero", () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/0,00/);
    expect(result).toMatch(/€/);
  });

  it("formats a decimal value to 2 places", () => {
    const result = formatCurrency(9.5);
    expect(result).toMatch(/9,50/);
    expect(result).toMatch(/€/);
  });

  it("rounds to 2 decimal places", () => {
    const result = formatCurrency(9.999);
    expect(result).toMatch(/10,00/);
    expect(result).toMatch(/€/);
  });
});
