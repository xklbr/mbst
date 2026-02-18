type RequiredEnv = "API_BASE_URL" | "API_KEY";
type OptionalEnv = "NEXT_PUBLIC_APP_NAME" | "NEXT_PUBLIC_APP_DESCRIPTION";

function readEnv(name: RequiredEnv): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

function readOptionalEnv(
  name: OptionalEnv,
  fallback: string,
): string {
  return process.env[name]?.trim() || fallback;
}

export const env = {
  get API_BASE_URL(): string {
    return readEnv("API_BASE_URL");
  },
  get API_KEY(): string {
    return readEnv("API_KEY");
  },
  get NEXT_PUBLIC_APP_NAME(): string {
    return readOptionalEnv("NEXT_PUBLIC_APP_NAME", "MBST App");
  },
  get NEXT_PUBLIC_APP_DESCRIPTION(): string {
    return readOptionalEnv("NEXT_PUBLIC_APP_DESCRIPTION", "Smartphone catalog challenge");
  },
};

export function hasApiEnv(): boolean {
  return Boolean(process.env.API_BASE_URL && process.env.API_KEY);
}
