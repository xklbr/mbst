"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useCatalogSearch } from "../hooks/use-catalog-search";

const Wrapper = styled.section`
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #696969;
  border-radius: 0;
  color: #000000;
  min-height: 2.25rem;
  outline: none;
  padding: 0.5rem 0;
  width: 100%;

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    border-bottom-color: #000000;
  }
`;

type CatalogSearchProps = {
  initialValue: string;
};

export function CatalogSearch({ initialValue }: CatalogSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const pendingSearchRef = useRef<string | null>(null);
  const lastSyncedValueRef = useRef(initialValue);

  useEffect(() => {
    const trimmedInitial = initialValue.trim();
    const pendingValue = pendingSearchRef.current?.trim() ?? null;

    if (
      initialValue !== lastSyncedValueRef.current &&
      pendingValue !== trimmedInitial
    ) {
      lastSyncedValueRef.current = initialValue;
      pendingSearchRef.current = null;
      queueMicrotask(() => setValue(initialValue));
    } else if (pendingValue === trimmedInitial) {
      pendingSearchRef.current = null;
      lastSyncedValueRef.current = trimmedInitial;
    }
  }, [initialValue]);

  const navigateSearch = useCallback(
    (nextValue: string) => {
      const query = nextValue.trim();
      pendingSearchRef.current = nextValue;

      router.replace(
        query.length > 0 ? `/?search=${encodeURIComponent(query)}` : "/",
      );
    },
    [router],
  );

  const debouncedNavigateSearch = useCatalogSearch(navigateSearch);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setValue(nextValue);
      debouncedNavigateSearch(nextValue);
    },
    [debouncedNavigateSearch],
  );

  return (
    <Wrapper>
      <SearchInput
        aria-label="Search phones by name or brand"
        onChange={handleChange}
        placeholder="Search for a smartphone..."
        value={value}
      />
    </Wrapper>
  );
}
