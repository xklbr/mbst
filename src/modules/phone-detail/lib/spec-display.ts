/**
 * Orden de las 11 especificaciones según el diseño del API:
 * BRAND, NAME, DESCRIPTION, SCREEN, RESOLUTION, PROCESSOR,
 * MAIN CAMERA, SELFIE CAMERA, BATTERY, OS, SCREEN REFRESH RATE.
 */
const SPEC_ORDER: readonly string[] = [
  "brand",
  "name",
  "description",
  "screen",
  "resolution",
  "processor",
  "maincamera",
  "selfiecamera",
  "battery",
  "os",
  "screenrefreshrate",
];

const ORDER_MAP = new Map<string, number>(
  SPEC_ORDER.map((key, index) => [key, index])
);

export function getSpecDisplayLabel(key: string): string {
  const withSpaces = key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim();
  return withSpaces.toUpperCase().replace(/\s+/g, " ");
}

function normalizeSpecKey(key: string): string {
  return key.toLowerCase().replace(/_/g, "");
}

function specSortIndex(key: string): number {
  const normalized = normalizeSpecKey(key);
  return ORDER_MAP.get(normalized) ?? SPEC_ORDER.length;
}

export function getOrderedSpecEntries(
  specs: Record<string, string> | null | undefined
): Array<{ key: string; label: string; value: string }> {
  if (!specs || typeof specs !== "object" || Array.isArray(specs)) {
    return [];
  }
  return Object.entries(specs)
    .sort(([a], [b]) => {
      const orderA = specSortIndex(a);
      const orderB = specSortIndex(b);
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    })
    .map(([key, value]) => ({
      key,
      label: getSpecDisplayLabel(key),
      value: value != null ? String(value) : "",
    }));
}
