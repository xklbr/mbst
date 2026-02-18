"use client";

import { useMemo } from "react";

import { debounce } from "@shared/lib/debounce";

export function useCatalogSearch(onSearch: (value: string) => void) {
  return useMemo(() => debounce(onSearch, 250), [onSearch]);
}
