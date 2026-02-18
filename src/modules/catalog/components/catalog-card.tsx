import Link from "next/link";
import styled from "styled-components";

import { formatCurrency } from "@shared/lib/currency";

import type { CatalogPhone } from "../types/catalog.types";

const BORDER = "0.5px solid #000000";

const Card = styled(Link)`
  border-bottom: ${BORDER};
  border-right: ${BORDER};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 344px;
  max-width: 100%;
  opacity: 1;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  width: 344px;

  @media (hover: hover) {
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

  &:first-child {
    border-left: ${BORDER};
    border-top: ${BORDER};
  }

  @media (min-width: 768px) {
    &:nth-child(2n + 1) {
      border-left: ${BORDER};
    }
    &:nth-child(-n + 2) {
      border-top: ${BORDER};
    }
  }

  @media (min-width: 1032px) {
    border-left: none;
    border-top: none;
    &:nth-child(3n + 1) {
      border-left: ${BORDER};
    }
    &:nth-child(-n + 3) {
      border-top: ${BORDER};
    }
  }

  @media (min-width: 1376px) {
    border-left: none;
    border-top: none;
    &:nth-child(4n + 1) {
      border-left: ${BORDER};
    }
    &:nth-child(-n + 4) {
      border-top: ${BORDER};
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ImageFrame = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  height: 257px;
  justify-content: center;
  margin: 0 16px;
  max-width: 312px;
  overflow: hidden;
  padding-top: 16px;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const TextBlock = styled.div`
  margin-top: auto;
  padding: 0 16px 16px 16px;
  position: relative;
  z-index: 1;
`;

const CardImage = styled.img`
  height: 257px;
  max-width: 312px;
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
  color: #666666;
  font-size: 10px;
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
  margin-top: 5px;
  min-width: 0;
`;

const Name = styled.strong`
  color: #000000;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 100%;
  text-transform: uppercase;
  min-width: 0;
  transition: color 0.55s ease-in-out;
`;

const Price = styled.span`
  flex-shrink: 0;
  font-size: 12px;
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
