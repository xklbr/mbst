import styled from "styled-components";

import { containerLayout, media, theme } from "@shared/styles";
import { AppNavbar, PageContainer } from "@shared/components/layout";
import { t } from "@shared/i18n";

import { CatalogCard } from "./catalog-card";
import { CatalogSearch } from "./catalog-search";
import { getPhones } from "../lib/catalog-api";
import type { CatalogPhone } from "../types/catalog.types";

const FixedBar = styled.div`
  background: ${theme.colors.bg};
  left: 0;
  padding-bottom: 0.5rem;
  position: fixed;
  right: 0;
  top: calc(${theme.layout.navbarHeightMobile} - 4px);
  z-index: 5;

  ${media.desktopUp} {
    top: calc(${theme.layout.navbarHeightDesktop} - 4px);
  }
`;

const FixedBarInner = styled.div`
  ${containerLayout}
  margin: 0 auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
`;

const CatalogContent = styled.div`
  padding-top: 9rem;

  ${media.desktopUp} {
    padding-top: 10rem;
  }
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
  color: ${theme.colors.text};
  font-size: 0.875rem;
  margin: 0;
  text-transform: uppercase;
`;

const Grid = styled.section`
  border-left: ${theme.borders.thin};
  border-top: ${theme.borders.thin};
  display: grid;
  gap: 0;
  grid-template-columns: 1fr;

  ${media.tabletUp} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.desktopUp} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ErrorState = styled.section`
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1rem;
`;

const CATALOG_PAGE_SIZE = 20;

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
      limit: CATALOG_PAGE_SIZE + 1,
      search: normalizedSearch || undefined,
    });

    phones = response.items;
    total = response.total;
  } catch (error) {
    console.error("Catalog load error:", error);
    loadError = t.catalog.loadError;
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
            <ResultCount>{t.catalog.resultsCount(total)}</ResultCount>
          </ResultBar>
        </FixedBarInner>
      </FixedBar>
      <PageContainer>
        <CatalogContent>
          {loadError ? (
            <ErrorState role="alert">{loadError}</ErrorState>
          ) : phones.length === 0 ? null : (
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
