import styled from "styled-components";

import { AppNavbar } from "@shared/components/layout/app-navbar";
import { PageContainer } from "@shared/components/layout/page-container";

import { CatalogCard } from "./catalog-card";
import { CatalogSearch } from "./catalog-search";
import { getPhones } from "../lib/catalog-api";
import type { CatalogPhone } from "../types/catalog.types";

const FixedBar = styled.div`
  background: #ffffff;
  left: 0;
  padding-bottom: 0.5rem;
  position: fixed;
  right: 0;
  top: 3.5rem;
  z-index: 5;
`;

const FixedBarInner = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.25rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const CatalogContent = styled.div`
  padding-top: 9rem;
`;

const SearchBlock = styled.section`
  margin-bottom: 1rem;
`;

const ResultBar = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ResultCount = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin: 0;
`;

const Grid = styled.section`
  border-left: 0.5px solid #000000;
  display: grid;
  gap: 0;
  grid-template-columns: 1fr;
  position: relative;

  &::before {
    border-top: 0.5px solid #000000;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 344px));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 344px));
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(5, minmax(0, 344px));
  }
`;

const EmptyState = styled.section`
  border: 1px solid #e5e7eb;
  color: #4b5563;
  padding: 1rem;
`;

const ErrorState = styled.section`
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
`;

type CatalogViewProps = {
  search?: string;
};

export async function CatalogView({ search = "" }: CatalogViewProps) {
  const normalizedSearch = search.trim();
  let phones: CatalogPhone[] = [];
  let total = 0;
  let loadError: string | null = null;

  try {
    const response = await getPhones({
      limit: 20,
      search: normalizedSearch || undefined,
    });

    phones = response.items;
    total = response.total;
  } catch (error) {
    console.error("Catalog load error:", error);
    loadError =
      "Unable to load catalog right now. Check API configuration and try again.";
  }

  return (
    <>
      <AppNavbar />
      <FixedBar>
        <FixedBarInner>
          <SearchBlock>
            <CatalogSearch initialValue={normalizedSearch} />
          </SearchBlock>
          <ResultBar>
            <ResultCount>{total} results</ResultCount>
          </ResultBar>
        </FixedBarInner>
      </FixedBar>
      <PageContainer>
        <CatalogContent>
          {loadError ? (
            <ErrorState role="alert">{loadError}</ErrorState>
          ) : phones.length === 0 ? (
            <EmptyState>No phones found for your search.</EmptyState>
          ) : (
            <Grid>
              {phones.map((phone) => (
                <CatalogCard key={phone.id} phone={phone} />
              ))}
            </Grid>
          )}
        </CatalogContent>
      </PageContainer>
    </>
  );
}
