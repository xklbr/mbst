"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { media, theme } from "@shared/styles";
import { t } from "@shared/i18n";
import type { CatalogPhone } from "@modules/catalog";

const SimilarSection = styled.section`
  margin-top: 2rem;
  padding-bottom: 4rem;
  padding-top: 2rem;
`;

const SimilarTitle = styled.h2`
  font-size: 20px;
  line-height: 100%;
  margin: 0 auto 1.5rem;
  max-width: ${theme.layout.containerMaxWidth};
  padding: 0 ${theme.layout.containerPaddingMobile};
  text-transform: uppercase;

  ${media.mobileOnly} {
    margin-bottom: 2.5rem;
  }

  ${media.desktopUp} {
    margin: 0 0 1rem;
    max-width: none;
    padding: 0 ${theme.layout.containerPaddingDesktop};
  }
`;

const SimilarCarouselWrap = styled.div`
  padding-left: ${theme.layout.containerPaddingMobile};

  ${media.desktopUp} {
    padding-left: ${theme.layout.containerPaddingDesktop};
  }
`;

/* Custom scrollbar for Safari (mobile/tablet): track + thumb that moves with scroll */
const ScrollbarTrack = styled.div`
  background: #cccccc;
  height: 2px;
  margin-right: 1.25rem;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;

  ${media.tabletUp} {
    margin-right: 2rem;
  }

  ${media.desktopUp} {
    display: none;
  }
`;

const ScrollbarThumb = styled.div<{ $left: number; $width: number }>`
  background: ${theme.colors.primary};
  height: 100%;
  left: ${({ $left }) => $left}%;
  position: absolute;
  top: 0;
  transition: left 0.08s ease-out;
  width: ${({ $width }) => $width}%;
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

  /* Desktop: native scrollbar (track + thumb) */
  &::-webkit-scrollbar {
    display: block;
    height: 1px;
    -webkit-appearance: none;
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
    background: ${theme.colors.primary};
    border-radius: 0;
  }

  /* Mobile/tablet: hide native scrollbar so only ScrollbarTrackLine shows (Safari doesn't paint it) */
  @media (max-width: 1023px) {
    &::-webkit-scrollbar {
      height: 0;
    }
  }
`;

const CARD_SIZE_MOBILE = 343;
const CARD_SIZE_DESKTOP = 344;

const SimilarCard = styled.li`
  border-bottom: ${theme.borders.thin};
  border-right: ${theme.borders.thin};
  border-top: ${theme.borders.thin};
  box-sizing: border-box;
  flex: 0 0 ${CARD_SIZE_MOBILE}px;
  height: ${CARD_SIZE_MOBILE}px;
  list-style: none;
  margin: 0;
  opacity: 1;
  scroll-snap-align: start;
  width: ${CARD_SIZE_MOBILE}px;

  &:first-child {
    border-left: ${theme.borders.thin};
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
      background: ${theme.colors.primary};
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
      color: ${theme.colors.primaryText};
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
  padding: 1rem 1rem 0;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const SimilarImage = styled.img`
  height: 16.0625rem;
  max-width: 19.5rem;
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
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

const SimilarTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SimilarBrand = styled.span`
  color: ${theme.colors.mutedText};
  font-size: ${theme.fontSize.xs};
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
`;

const SimilarName = styled.strong`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
`;

const SimilarPrice = styled.span`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  margin-top: 0.25rem;
  white-space: nowrap;
`;

type SimilarItemsCarouselProps = {
  phones: CatalogPhone[];
};

export function SimilarItemsCarousel({ phones }: SimilarItemsCarouselProps) {
  const gridRef = useRef<HTMLUListElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });

  const updateThumb = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setThumb({ left: 0, width: 100 });
      return;
    }
    const widthPercent = (clientWidth / scrollWidth) * 100;
    const leftPercent = (scrollLeft / maxScroll) * (100 - widthPercent);
    setThumb({ left: leftPercent, width: widthPercent });
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    updateThumb();
    el.addEventListener("scroll", updateThumb);
    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateThumb);
      ro.disconnect();
    };
  }, [phones.length, updateThumb]);

  if (phones.length === 0) return null;

  return (
    <SimilarSection>
      <SimilarTitle>{t.phoneDetail.similarItems}</SimilarTitle>
      <SimilarCarouselWrap>
        <SimilarGrid ref={gridRef}>
          {phones.map((item) => (
            <SimilarCard key={item.id}>
              <SimilarLink href={`/phones/${item.id}`}>
                <SimilarImageFrame>
                  {item.imageUrl ? (
                    <SimilarImage alt={item.name} src={item.imageUrl} />
                  ) : (
                    <span
                      style={{
                        color: theme.colors.mutedText,
                        fontSize: "0.7rem",
                      }}
                    >
                      {t.common.noImage}
                    </span>
                  )}
                </SimilarImageFrame>
                <SimilarInfo>
                  <SimilarTextBlock>
                    <SimilarBrand>{item.brand}</SimilarBrand>
                    <SimilarName>{item.name}</SimilarName>
                  </SimilarTextBlock>
                  <SimilarPrice>
                    {t.phoneDetail.price(item.basePrice)}
                  </SimilarPrice>
                </SimilarInfo>
              </SimilarLink>
            </SimilarCard>
          ))}
        </SimilarGrid>
        <ScrollbarTrack aria-hidden="true">
          <ScrollbarThumb $left={thumb.left} $width={thumb.width} />
        </ScrollbarTrack>
      </SimilarCarouselWrap>
    </SimilarSection>
  );
}
