import "server-only";

import { env } from "@config/env";

export type ApiQuery = Record<
  string,
  string | number | boolean | null | undefined
>;

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
  query?: ApiQuery;
};

export class ApiClientError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.body = body;
  }
}

function toApiUrl(path: string, query?: ApiQuery): string {
  const baseUrl = env.API_BASE_URL.endsWith("/")
    ? env.API_BASE_URL.slice(0, -1)
    : env.API_BASE_URL;
  const url = new URL(path.startsWith("/") ? path : `/${path}`, baseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { body, query, headers, cache, ...init } = options;
  const resolvedHeaders = new Headers(headers);
  const hasJsonBody =
    body !== null &&
    body !== undefined &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob);

  resolvedHeaders.set("x-api-key", env.API_KEY);

  if (hasJsonBody && !resolvedHeaders.has("content-type")) {
    resolvedHeaders.set("content-type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(toApiUrl(path, query), {
      ...init,
      headers: resolvedHeaders,
      body: hasJsonBody ? JSON.stringify(body) : (body as BodyInit | undefined),
      cache: cache ?? "no-store",
    });
  } catch (error) {
    throw new ApiClientError(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      0,
      null,
    );
  }

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiClientError(
      `API request failed: ${response.status}`,
      response.status,
      parsedBody,
    );
  }

  return parsedBody as T;
}

export function isRecoverableApiError(error: unknown): boolean {
  if (!(error instanceof ApiClientError)) {
    return false;
  }

  return error.status === 400 || error.status === 404;
}
