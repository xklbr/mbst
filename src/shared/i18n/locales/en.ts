import type { Locale } from "../types";

export const en = {
  common: {
    noImage: "No image",
    back: "Back",
  },
  nav: {
    homeAriaLabel: "MBST Home",
    cartAriaLabel: (count: number) =>
      `Open cart, ${count} item${count !== 1 ? "s" : ""}`,
  },
  catalog: {
    searchPlaceholder: "Search for a smartphone...",
    searchAriaLabel: "Search phones by name or brand",
    clearSearchAriaLabel: "Clear search",
    resultsCount: (total: number) => `${total} results`,
    loadError:
      "Unable to load catalog right now. Check API configuration and try again.",
  },
  phoneDetail: {
    imageNotAvailable: "Image not available",
    price: (price: number | string) => `${price} EUR`,
    priceFrom: (price: number | string) => `From ${price} EUR`,
    addToCart: "ADD",
    specifications: "Specifications",
    storageLabel: "STORAGE ¿HOW MUCH SPACE DO YOU NEED?",
    colorLabel: "COLOR. PICK YOUR FAVOURITE.",
    selectColor: (name: string) => `Select color ${name}`,
    similarItems: "SIMILAR ITEMS",
  },
  cart: {
    title: (count: number) => `Cart (${count})`,
    noImage: "No image",
    delete: "Delete",
    continueShopping: "CONTINUE SHOPPING",
    total: "TOTAL",
    pay: "PAY",
  },
  errors: {
    notFound: "Page not found.",
    returnToCatalog: "Return to catalog",
    somethingWentWrong: "Something went wrong.",
    tryAgain: "Try again",
  },
} as const satisfies Locale;
