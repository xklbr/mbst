type RequiredEnv = "API_BASE_URL" | "API_KEY";

function readEnv(name: RequiredEnv): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

export const env = {
  get API_BASE_URL(): string {
    return readEnv("API_BASE_URL");
  },
  get API_KEY(): string {
    return readEnv("API_KEY");
  },
};

export function hasApiEnv(): boolean {
  return Boolean(process.env.API_BASE_URL && process.env.API_KEY);
}
