import type { Locale } from "../types";

export const es = {
  common: {
    noImage: "Sin imagen",
    back: "Volver",
  },
  nav: {
    homeAriaLabel: "MBST Inicio",
    cartAriaLabel: (count: number) =>
      `Abrir carrito, ${count} producto${count !== 1 ? "s" : ""}`,
  },
  catalog: {
    searchPlaceholder: "Buscar un smartphone...",
    searchAriaLabel: "Buscar teléfonos por nombre o marca",
    clearSearchAriaLabel: "Borrar búsqueda",
    resultsCount: (total: number) => `${total} resultados`,
    loadError:
      "No se puede cargar el catálogo ahora. Comprueba la configuración de la API e inténtalo de nuevo.",
  },
  phoneDetail: {
    imageNotAvailable: "Imagen no disponible",
    price: (price: number | string) => `${price} EUR`,
    priceFrom: (price: number | string) => `Desde ${price} EUR`,
    addToCart: "AÑADIR",
    specifications: "Especificaciones",
    storageLabel: "ALMACENAMIENTO ¿CUÁNTO ESPACIO NECESITAS?",
    colorLabel: "COLOR. ELIGE TU FAVORITO.",
    selectColor: (name: string) => `Seleccionar color ${name}`,
    similarItems: "PRODUCTOS SIMILARES",
  },
  cart: {
    title: (count: number) => `Carrito (${count})`,
    noImage: "Sin imagen",
    delete: "Eliminar",
    continueShopping: "SEGUIR COMPRANDO",
    total: "TOTAL",
    pay: "PAGAR",
  },
  errors: {
    notFound: "Página no encontrada.",
    returnToCatalog: "Volver al catálogo",
    somethingWentWrong: "Algo ha ido mal.",
    tryAgain: "Intentar de nuevo",
  },
} as const satisfies Locale;
