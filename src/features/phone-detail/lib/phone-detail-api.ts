import { apiFetch, isRecoverableApiError } from "@lib/api/client";
import { hasApiEnv } from "@lib/env";
import type { CatalogPhone } from "@features/catalog";

import { mapPhoneDetailResponse } from "./phone-detail-mappers";
import type { PhoneDetail } from "../types/phone-detail.types";

const PRODUCTS_ENDPOINT = "/products";

export class PhoneNotFoundError extends Error {
  constructor(phoneId: string) {
    super(`Product ${phoneId} was not found.`);
    this.name = "PhoneNotFoundError";
  }
}

export async function getPhoneById(phoneId: string): Promise<PhoneDetail> {
  if (!hasApiEnv()) {
    throw new Error("API environment is not configured.");
  }

  try {
    const response = await apiFetch<unknown>(`${PRODUCTS_ENDPOINT}/${phoneId}`);
    return mapPhoneDetailResponse(response);
  } catch (error) {
    if (isRecoverableApiError(error)) {
      throw new PhoneNotFoundError(phoneId);
    }

    throw error;
  }
}

export async function getSimilarPhones(
  phone: Pick<PhoneDetail, "similarProducts">,
  limit = 8,
): Promise<CatalogPhone[]> {
  return phone.similarProducts.slice(0, limit);
}
