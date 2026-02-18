import { apiFetch, isRecoverableApiError } from "@lib/api/client";
import { hasApiEnv } from "@lib/env";

import { mapCatalogResponse } from "./catalog-mappers";
import type { CatalogQuery, CatalogResult } from "../types/catalog.types";

const PRODUCTS_ENDPOINT = "/products";

export async function getPhones(query: CatalogQuery = {}): Promise<CatalogResult> {
  if (!hasApiEnv()) {
    throw new Error("API environment is not configured.");
  }

  const normalizedQuery: CatalogQuery = {
    search: query.search?.trim() || undefined,
    limit: query.limit,
    offset: query.offset,
  };

  try {
    const response = await apiFetch<unknown>(PRODUCTS_ENDPOINT, {
      query: {
        search: normalizedQuery.search,
        limit: normalizedQuery.limit,
        offset: normalizedQuery.offset,
      },
    });

    return mapCatalogResponse(response, normalizedQuery.limit);
  } catch (error) {
    if (isRecoverableApiError(error)) {
      return {
        items: [],
        total: 0,
      };
    }

    throw error;
  }
}
