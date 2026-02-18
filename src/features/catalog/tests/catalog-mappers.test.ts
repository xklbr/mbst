import { describe, expect, it } from "vitest";

import { mapCatalogResponse } from "../lib/catalog-mappers";

describe("mapCatalogResponse", () => {
  it("maps direct array payload", () => {
    const mapped = mapCatalogResponse([
      {
        id: "a1",
        model: "Galaxy S24",
        manufacturer: "Samsung",
        price: "909",
        image: "https://cdn.example.com/s24.png",
      },
    ]);

    expect(mapped.items).toHaveLength(1);
    expect(mapped.total).toBe(1);
    expect(mapped.items[0]).toMatchObject({
      id: "a1",
      name: "Galaxy S24",
      brand: "Samsung",
      basePrice: 909,
      imageUrl: "https://cdn.example.com/s24.png",
    });
  });

  it("maps wrapped response and applies limit", () => {
    const mapped = mapCatalogResponse(
      {
        total: 99,
        products: [
          { id: "a1", name: "Phone A", brand: "Brand A", basePrice: 100 },
          { id: "a2", name: "Phone B", brand: "Brand B", basePrice: 200 },
        ],
      },
      1,
    );

    expect(mapped.items).toHaveLength(1);
    expect(mapped.total).toBe(99);
    expect(mapped.items[0]?.id).toBe("a1");
  });

  it("filters invalid records", () => {
    const mapped = mapCatalogResponse({
      items: [{ foo: "bar" }, { id: "ok", name: "Valid" }],
    });

    expect(mapped.items).toHaveLength(1);
    expect(mapped.items[0]?.id).toBe("ok");
  });
});
