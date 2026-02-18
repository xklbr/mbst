"use client";

import { useMemo, useState } from "react";

export function usePhoneVariantState() {
  const [selectedColorCode, setSelectedColorCode] = useState<string | null>(null);
  const [selectedStorageCode, setSelectedStorageCode] = useState<string | null>(null);

  const canAddToCart = useMemo(() => {
    return Boolean(selectedColorCode && selectedStorageCode);
  }, [selectedColorCode, selectedStorageCode]);

  return {
    selectedColorCode,
    setSelectedColorCode,
    selectedStorageCode,
    setSelectedStorageCode,
    canAddToCart,
  };
}
