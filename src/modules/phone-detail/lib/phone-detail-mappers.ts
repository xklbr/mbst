import type { CatalogPhone } from "@modules/catalog";

import type {
  PhoneColorOption,
  PhoneDetail,
  PhoneStorageOption,
} from "../types/phone-detail.types";

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

function mapCatalogListItem(rawItem: unknown): CatalogPhone | null {
  if (!isRecord(rawItem)) {
    return null;
  }

  const id = asString(rawItem.id);
  const name = asString(rawItem.name);
  const brand = asString(rawItem.brand);

  if (!id || !name || !brand) {
    return null;
  }

  return {
    id,
    name,
    brand,
    basePrice: asNumber(rawItem.basePrice) ?? 0,
    imageUrl: asString(rawItem.imageUrl) ?? "",
  };
}

function getColorOptions(source: UnknownRecord): PhoneColorOption[] {
  const colorSourceCandidates = [
    source.colorOptions,
    source.colors,
    isRecord(source.options) ? source.options.colors : undefined,
  ];

  const colorSource = colorSourceCandidates.find((candidate) => Array.isArray(candidate));

  if (!Array.isArray(colorSource)) {
    return [];
  }

  return colorSource
    .map((color): PhoneColorOption | null => {
      if (!isRecord(color)) {
        return null;
      }

      const name = asString(color.name) ?? asString(color.label);
      const code =
        asString(color.hexCode) ??
        asString(color.code) ??
        asString(color.value) ??
        asString(color.id) ??
        name;

      if (!name || !code) {
        return null;
      }

      return {
        code,
        name,
        imageUrl: asString(color.imageUrl) ?? asString(color.image) ?? "",
      };
    })
    .filter((color): color is PhoneColorOption => color !== null);
}

function getStorageOptions(
  source: UnknownRecord,
  basePrice: number,
): PhoneStorageOption[] {
  const storageSourceCandidates = [
    source.storageOptions,
    source.storages,
    isRecord(source.options) ? source.options.storages : undefined,
    isRecord(source.options) ? source.options.storage : undefined,
  ];

  const storageSource = storageSourceCandidates.find((candidate) => Array.isArray(candidate));

  if (!Array.isArray(storageSource)) {
    return [];
  }

  return storageSource
    .map((storage): PhoneStorageOption | null => {
      if (!isRecord(storage)) {
        return null;
      }

      const name =
        asString(storage.capacity) ?? asString(storage.name) ?? asString(storage.label);
      const code =
        asString(storage.code) ??
        asString(storage.value) ??
        asString(storage.id) ??
        name;

      if (!name || !code) {
        return null;
      }

      return {
        code,
        name,
        price:
          asNumber(storage.price) ??
          asNumber(storage.amount) ??
          asNumber(storage.basePrice) ??
          basePrice,
      };
    })
    .filter((storage): storage is PhoneStorageOption => storage !== null);
}

const SPEC_KEYS = [
  "brand",
  "name",
  "description",
  "screen",
  "resolution",
  "processor",
  "mainCamera",
  "selfieCamera",
  "battery",
  "os",
  "screenRefreshRate",
] as const;

function getSpecs(source: UnknownRecord): Record<string, string> {
  const nested = source.specs ?? source.specifications;
  const nestedRecord =
    isRecord(nested) && !Array.isArray(nested) ? nested : {};
  const mapped: Record<string, string> = {};

  for (const key of SPEC_KEYS) {
    let value: string | null;
    if (key === "brand") {
      value =
        asString(source.brand) ??
        asString(source.manufacturer) ??
        asString(source.maker);
    } else if (key === "name") {
      value =
        asString(source.name) ??
        asString(source.model) ??
        asString(source.title);
    } else if (key === "description") {
      value = asString(source.description);
    } else if (key === "screen") {
      value = asString(nestedRecord.screen) ?? asString(nestedRecord.display);
    } else if (key === "mainCamera") {
      value = asString(nestedRecord.mainCamera) ?? asString(nestedRecord.main_camera);
    } else if (key === "selfieCamera") {
      value = asString(nestedRecord.selfieCamera) ?? asString(nestedRecord.selfie_camera);
    } else if (key === "screenRefreshRate") {
      value =
        asString(nestedRecord.screenRefreshRate) ??
        asString(nestedRecord.screen_refresh_rate);
    } else {
      value = asString(nestedRecord[key]);
    }
    if (value) {
      mapped[key] = value;
    }
  }

  return mapped;
}

function getImageUrl(source: UnknownRecord, colorOptions: PhoneColorOption[]): string {
  const directImage =
    asString(source.imageUrl) ??
    asString(source.image) ??
    asString(source.thumbnail);

  if (directImage) {
    return directImage;
  }

  if (colorOptions.length > 0) {
    return colorOptions[0]?.imageUrl ?? "";
  }

  const images = source.images;

  if (!Array.isArray(images) || images.length === 0) {
    return "";
  }

  const firstImage = images[0];

  if (isRecord(firstImage)) {
    return asString(firstImage.url) ?? asString(firstImage.imageUrl) ?? "";
  }

  return asString(firstImage) ?? "";
}

function getSimilarProducts(source: UnknownRecord): CatalogPhone[] {
  const similarRaw = source.similarProducts;

  if (!Array.isArray(similarRaw)) {
    return [];
  }

  return similarRaw
    .map((item) => mapCatalogListItem(item))
    .filter((item): item is CatalogPhone => item !== null);
}

export function mapPhoneDetailResponse(rawResponse: unknown): PhoneDetail {
  if (!isRecord(rawResponse)) {
    throw new Error("Invalid phone detail response.");
  }

  const id =
    asString(rawResponse.id) ??
    asString(rawResponse._id) ??
    asString(rawResponse.uuid) ??
    asString(rawResponse.productId);
  const name =
    asString(rawResponse.name) ?? asString(rawResponse.model) ?? asString(rawResponse.title);

  if (!id || !name) {
    throw new Error("Phone detail response does not contain required fields.");
  }

  const basePrice =
    asNumber(rawResponse.basePrice) ??
    asNumber(rawResponse.price) ??
    asNumber(rawResponse.base_price) ??
    0;
  const colorOptions = getColorOptions(rawResponse);

  let specs: Record<string, string> = {};
  try {
    specs = getSpecs(rawResponse);
  } catch {
    specs = {};
  }

  return {
    id,
    name,
    brand:
      asString(rawResponse.brand) ??
      asString(rawResponse.manufacturer) ??
      asString(rawResponse.maker) ??
      "Unknown",
    basePrice,
    imageUrl: getImageUrl(rawResponse, colorOptions),
    description: asString(rawResponse.description) ?? "",
    specs,
    colorOptions,
    storageOptions: getStorageOptions(rawResponse, basePrice),
    similarProducts: getSimilarProducts(rawResponse),
  };
}
