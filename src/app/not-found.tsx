import Link from "next/link";

import { t } from "@shared/i18n";

export default function NotFound() {
  return (
    <div>
      <h2>{t.errors.notFound}</h2>
      <Link href="/">{t.errors.returnToCatalog}</Link>
    </div>
  );
}
