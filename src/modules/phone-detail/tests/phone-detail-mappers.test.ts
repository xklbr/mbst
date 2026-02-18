import { describe, expect, it } from "vitest";

import { mapPhoneDetailResponse } from "../lib/phone-detail-mappers";

describe("mapPhoneDetailResponse", () => {
  it("maps detail payload with nested options", () => {
    const mapped = mapPhoneDetailResponse({
      id: "p1",
      model: "Galaxy S24 Ultra",
      manufacturer: "Samsung",
      price: "1099",
      description: "High-end smartphone",
      image: "https://cdn.example.com/main.png",
      options: {
        colors: [
          { hexCode: "#111111", name: "Black", imageUrl: "https://cdn.example.com/black.png" },
        ],
        storages: [{ capacity: "512 GB", price: 1199 }],
      },
      specifications: {
        display: "6.8 OLED",
        battery: "5000mAh",
      },
      similarProducts: [
        {
          id: "p2",
          name: "iPhone 15",
          brand: "Apple",
          basePrice: 959,
          imageUrl: "https://cdn.example.com/iphone.png",
        },
      ],
    });

    expect(mapped).toMatchObject({
      id: "p1",
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      basePrice: 1099,
      imageUrl: "https://cdn.example.com/main.png",
    });
    expect(mapped.colorOptions).toHaveLength(1);
    expect(mapped.storageOptions).toHaveLength(1);
    expect(mapped.colorOptions[0]?.code).toBe("#111111");
    expect(mapped.storageOptions[0]?.name).toBe("512 GB");
    expect(mapped.similarProducts).toHaveLength(1);
    expect(mapped.specs.screen).toBe("6.8 OLED");
    expect(mapped.specs.battery).toBe("5000mAh");
  });

  it("falls back to defaults when optional data is missing", () => {
    const mapped = mapPhoneDetailResponse({
      id: "p2",
      name: "iPhone 15",
    });

    expect(mapped.brand).toBe("Unknown");
    expect(mapped.basePrice).toBe(0);
    expect(mapped.colorOptions).toEqual([]);
    expect(mapped.storageOptions).toEqual([]);
    expect(mapped.similarProducts).toEqual([]);
    expect(mapped.specs).toEqual({ name: "iPhone 15" });
  });

  it("throws when required fields are missing", () => {
    expect(() => mapPhoneDetailResponse({ brand: "NoID" })).toThrow(
      "Phone detail response does not contain required fields.",
    );
  });
});
