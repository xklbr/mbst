"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { Icon, IconNameEnum } from "@shared/components/icons";

import { useCatalogSearch } from "../hooks/use-catalog-search";

const Wrapper = styled.section`
  margin-bottom: 1rem;
  position: relative;
`;

const SearchInput = styled.input<{ $hasClear?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 1px solid #696969;
  border-radius: 0;
  color: #000000;
  min-height: 2.25rem;
  outline: none;
  padding: 0.5rem ${({ $hasClear }) => ($hasClear ? "2rem" : "0")} 0.5rem 0;
  width: 100%;

  &::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    border-bottom-color: #000000;
  }
`;

const ClearButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 0.375rem;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: none;
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

  const handleClear = useCallback(() => {
    setValue("");
    navigateSearch("");
  }, [navigateSearch]);

  const hasValue = value.length > 0;

  return (
    <Wrapper>
      <SearchInput
        $hasClear={hasValue}
        aria-label="Search phones by name or brand"
        onChange={handleChange}
        placeholder="Search for a smartphone..."
        value={value}
      />
      {hasValue && (
        <ClearButton
          aria-label="Clear search"
          type="button"
          onClick={handleClear}
        >
          <Icon name={IconNameEnum.CANCEL} alt="" size={8} />
        </ClearButton>
      )}
    </Wrapper>
  );
}
