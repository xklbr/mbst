"use client";

import Link from "next/link";
import styled from "styled-components";

import type { CatalogPhone } from "@features/catalog";

const SimilarSection = styled.section`
  margin-top: 2rem;
  padding-top: 2rem;
`;

const SimilarTitle = styled.h2`
  font-size: 20px;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 auto 1rem;
  max-width: 1200px;
  padding: 0 1.25rem;
  text-transform: capitalize;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const SimilarCarouselWrap = styled.div`
  padding-left: 1.25rem;

  @media (min-width: 768px) {
    padding-left: calc((100vw - 1200px) / 2 + 2rem);
  }
`;

const SimilarGrid = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 0;
  list-style: none;
  margin: 0;
  overflow-x: auto;
  padding: 0 1.25rem 1.5rem 0;
  scroll-snap-type: x mandatory;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 768px) {
    padding-right: 2rem;
  }

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #cccccc;
    margin-top: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 0;
  }
`;

const SimilarCard = styled.li`
  border: 0.5px solid #000000;
  box-sizing: border-box;
  flex: 0 0 344px;
  height: 344px;
  margin-left: -0.5px;
  opacity: 1;
  scroll-snap-align: start;
  width: 344px;

  &:first-of-type {
    margin-left: 0;
  }
`;

const SimilarLink = styled(Link)`
  box-sizing: border-box;
  display: grid;
  gap: 0.75rem;
  height: 100%;
  padding: 16px;
  text-decoration: none;
`;

const SimilarImageFrame = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  height: 257px;
  justify-content: center;
  margin: 0 auto;
  max-width: 312px;
  overflow: hidden;
  padding: 10px;
  width: 100%;
`;

const SimilarImage = styled.img`
  height: 257px;
  max-width: 312px;
  object-fit: contain;
  opacity: 1;
  width: 100%;
`;

const SimilarInfo = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const SimilarTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SimilarBrand = styled.span`
  color: #666666;
  font-size: 10px;
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
`;

const SimilarName = styled.strong`
  color: #000000;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
`;

const SimilarPrice = styled.span`
  color: #000000;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 100%;
  margin-top: 0.25rem;
  white-space: nowrap;
`;

type SimilarItemsCarouselProps = {
  phones: CatalogPhone[];
};

export function SimilarItemsCarousel({ phones }: SimilarItemsCarouselProps) {
  if (phones.length === 0) return null;

  return (
    <SimilarSection>
      <SimilarTitle>Similar Items</SimilarTitle>
      <SimilarCarouselWrap>
        <SimilarGrid>
          {phones.map((item) => (
            <SimilarCard key={item.id}>
              <SimilarLink href={`/phones/${item.id}`}>
                <SimilarImageFrame>
                  {item.imageUrl ? (
                    <SimilarImage alt={item.name} src={item.imageUrl} />
                  ) : (
                    <span style={{ color: "#6b7280", fontSize: "0.7rem" }}>
                      No image
                    </span>
                  )}
                </SimilarImageFrame>
                <SimilarInfo>
                  <SimilarTextBlock>
                    <SimilarBrand>{item.brand}</SimilarBrand>
                    <SimilarName>{item.name}</SimilarName>
                  </SimilarTextBlock>
                  <SimilarPrice>{item.basePrice} EUR</SimilarPrice>
                </SimilarInfo>
              </SimilarLink>
            </SimilarCard>
          ))}
        </SimilarGrid>
      </SimilarCarouselWrap>
    </SimilarSection>
  );
}
