"use client";

import { t } from "@shared/i18n";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>{t.errors.somethingWentWrong}</h2>
      <button onClick={() => reset()}>{t.errors.tryAgain}</button>
    </div>
  );
}
