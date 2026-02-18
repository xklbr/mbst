export const ICON_PATHS = {
  bag: "/icons/bag.svg",
  "bag-filled": "/icons/bag-filled.svg",
  "chevron-left": "/icons/chevron-left.svg",
} as const;

export type IconName = keyof typeof ICON_PATHS;

/** Use these constants instead of string literals for type-safe icon names */
export const IconNameEnum = {
  BAG: "bag",
  BAG_FILLED: "bag-filled",
  CHEVRON_LEFT: "chevron-left",
} as const satisfies Record<string, IconName>;
