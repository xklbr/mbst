import type { CatalogPhone, CatalogResult } from "../types/catalog.types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function getArrayCandidate(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!isRecord(value)) {
    return [];
  }

  const candidates = [
    value.items,
    value.results,
    value.products,
    value.phones,
    value.data,
    value.content,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

function getImageUrl(item: UnknownRecord): string {
  const imageDirect = asString(item.imageUrl) ?? asString(item.image) ?? asString(item.thumbnail);

  if (imageDirect) {
    return imageDirect;
  }

  const images = item.images;

  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];

    if (isRecord(first)) {
      return asString(first.url) ?? asString(first.imageUrl) ?? "";
    }

    return asString(first) ?? "";
  }

  return "";
}

function mapCatalogItem(rawItem: unknown): CatalogPhone | null {
  if (!isRecord(rawItem)) {
    return null;
  }

  const id =
    asString(rawItem.id) ??
    asString(rawItem._id) ??
    asString(rawItem.uuid) ??
    asString(rawItem.productId);
  const name = asString(rawItem.name) ?? asString(rawItem.model) ?? asString(rawItem.title);

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    brand:
      asString(rawItem.brand) ??
      asString(rawItem.manufacturer) ??
      asString(rawItem.maker) ??
      "Unknown",
    basePrice:
      asNumber(rawItem.basePrice) ??
      asNumber(rawItem.price) ??
      asNumber(rawItem.base_price) ??
      0,
    imageUrl: getImageUrl(rawItem),
  };
}

export function mapCatalogResponse(rawResponse: unknown, limit?: number): CatalogResult {
  const itemsRaw = getArrayCandidate(rawResponse);
  const mappedItems = itemsRaw
    .map((rawItem) => mapCatalogItem(rawItem))
    .filter((item): item is CatalogPhone => item !== null);
  
  // Remove duplicates by ID (keep first occurrence)
  const seenIds = new Set<string>();
  const uniqueItems = mappedItems.filter((item) => {
    if (seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  });
  
  const limitedItems = typeof limit === "number" ? uniqueItems.slice(0, limit) : uniqueItems;

  let total = limitedItems.length;

  if (isRecord(rawResponse)) {
    total =
      asNumber(rawResponse.total) ??
      asNumber(rawResponse.count) ??
      asNumber(rawResponse.totalItems) ??
      limitedItems.length;
  }

  return {
    items: limitedItems,
    total,
  };
}
