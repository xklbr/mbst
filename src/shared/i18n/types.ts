export type Locale = {
  common: {
    noImage: string;
    back: string;
  };
  nav: {
    homeAriaLabel: string;
    cartAriaLabel: (count: number) => string;
  };
  catalog: {
    searchPlaceholder: string;
    searchAriaLabel: string;
    clearSearchAriaLabel: string;
    resultsCount: (total: number) => string;
    loadError: string;
  };
  phoneDetail: {
    imageNotAvailable: string;
    price: (price: number | string) => string;
    priceFrom: (price: number | string) => string;
    addToCart: string;
    specifications: string;
    storageLabel: string;
    colorLabel: string;
    selectColor: (name: string) => string;
    similarItems: string;
  };
  cart: {
    title: (count: number) => string;
    noImage: string;
    delete: string;
    continueShopping: string;
    total: string;
    pay: string;
  };
  errors: {
    notFound: string;
    returnToCatalog: string;
    somethingWentWrong: string;
    tryAgain: string;
  };
};
