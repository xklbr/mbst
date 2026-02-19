"use client";

import Link from "next/link";
import styled from "styled-components";

import { media } from "@shared/styles/media";
import type { CatalogPhone } from "@modules/catalog";

const SimilarSection = styled.section`
  margin-top: 2rem;
  padding-bottom: 4rem;
  padding-top: 2rem;
`;

const SimilarTitle = styled.h2`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 100%;
  margin: 0 auto 1.5rem;
  max-width: 1200px;
  padding: 0 1.25rem;
  text-transform: uppercase;


  ${media.mobileOnly} {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 100%;
    margin-bottom: 40px;
  }

  ${media.desktopUp} {
    margin: 0 0 1rem;
    max-width: none;
    padding: 0 100px;
  }
`;

const SimilarCarouselWrap = styled.div`
  padding-left: 1.25rem;

  ${media.desktopUp} {
    padding-left: 100px;
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

  ${media.tabletUp} {
    padding-right: 2rem;
  }

  &::-webkit-scrollbar {
    display: block;
    height: 1px;
  }

  &::-webkit-scrollbar-track {
    background: #cccccc;
    margin-right: 1.25rem;
  }

  ${media.tabletUp} {
    &::-webkit-scrollbar-track {
      margin-right: 2rem;
    }
  }

  &::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 0;
  }
`;

const CARD_SIZE_MOBILE = 343;
const CARD_SIZE_DESKTOP = 344;

const BORDER = "0.5px solid #000000";

const SimilarCard = styled.li`
  border-bottom: ${BORDER};
  border-right: ${BORDER};
  border-top: ${BORDER};
  box-sizing: border-box;
  flex: 0 0 ${CARD_SIZE_MOBILE}px;
  height: ${CARD_SIZE_MOBILE}px;
  list-style: none;
  margin: 0;
  opacity: 1;
  scroll-snap-align: start;
  width: ${CARD_SIZE_MOBILE}px;

  &:first-child {
    border-left: ${BORDER};
  }

  ${media.tabletUp} {
    flex: 0 0 ${CARD_SIZE_DESKTOP}px;
    height: ${CARD_SIZE_DESKTOP}px;
    width: ${CARD_SIZE_DESKTOP}px;
  }
`;

const SimilarLink = styled(Link)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  width: 100%;

  ${media.hoverDesktop} {
    &::before {
      background: #000000;
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.65s ease-in-out;
      z-index: 0;
    }

    &:hover::before {
      transform: scaleY(1);
    }

    &:hover span,
    &:hover strong {
      color: #ffffff;
    }

    &:not(:hover) span,
    &:not(:hover) strong {
      transition-delay: 0.4s;
    }
  }
`;

const SimilarImageFrame = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
  padding: 16px 16px 0;
  position: relative;
  width: 100%;
  z-index: 1;
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
  flex-shrink: 0;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 16px;
  position: relative;
  z-index: 1;
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
      <SimilarTitle>SIMILAR ITEMS</SimilarTitle>
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
