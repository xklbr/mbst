import Link from "next/link";
import styled from "styled-components";

import { media, theme } from "@shared/styles";
import { formatCurrency } from "@shared/lib/currency";

import type { CatalogPhone } from "../types/catalog.types";

const Card = styled(Link)`
  border-bottom: ${theme.borders.thin};
  border-right: ${theme.borders.thin};
  aspect-ratio: 1 / 1.2;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
  opacity: 1;
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

  ${media.mobileOnly} {
    width: 100%;
  }
`;

const ImageFrame = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 0 1rem;
  overflow: hidden;
  padding-top: 1rem;
  position: relative;
  width: auto;
  z-index: 1;
`;

const TextBlock = styled.div`
  margin-top: auto;
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

const CardImage = styled.img`
  height: 100%;
  max-height: 257px;
  object-fit: contain;
  opacity: 1;
  width: 100%;
`;

const ImageFallback = styled.span`
  color: #6b7280;
  font-size: 0.8rem;
  transition: color 0.55s ease-in-out;
`;

const Brand = styled.span`
  color: ${theme.colors.mutedText};
  font-size: ${theme.fontSize.xs};
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
  transition: color 0.55s ease-in-out;
`;

const NamePriceRow = styled.div`
  align-items: baseline;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 0.3125rem;
  min-width: 0;
`;

const Name = styled.strong`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
  min-width: 0;
  transition: color 0.55s ease-in-out;
`;

const Price = styled.span`
  flex-shrink: 0;
  font-size: ${theme.fontSize.sm};
  letter-spacing: 0;
  line-height: 100%;
  text-align: right;
  text-transform: capitalize;
  transition: color 0.55s ease-in-out;
`;

export function CatalogCard({ phone }: { phone: CatalogPhone }) {
  return (
    <Card href={`/phones/${phone.id}`}>
      <ImageFrame>
        {phone.imageUrl ? (
          <CardImage alt={phone.name} src={phone.imageUrl} />
        ) : (
          <ImageFallback>No image</ImageFallback>
        )}
      </ImageFrame>
      <TextBlock>
        <Brand>{phone.brand}</Brand>
        <NamePriceRow>
          <Name>{phone.name}</Name>
          <Price>{formatCurrency(phone.basePrice)}</Price>
        </NamePriceRow>
      </TextBlock>
    </Card>
  );
}
