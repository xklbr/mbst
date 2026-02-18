"use client";

import { useMemo } from "react";
import styled from "styled-components";

import { Button } from "@components/ui/button";
import { useCart } from "@features/cart/hooks/use-cart";

import { getOrderedSpecEntries } from "../lib/spec-display";
import { usePhoneVariantState } from "../hooks/use-phone-variant-state";
import type { PhoneDetail } from "../types/phone-detail.types";
import { VariantPicker } from "./variant-picker";

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  align-items: start;

  @media (min-width: 1200px) {
    align-items: center;
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const VisualStack = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`;

const ContentStack = styled.section`
  display: grid;
  gap: 0;
  align-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`;

const Heading = styled.h1`
  font-size: 24px;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  color: #000000;
`;

const Price = styled.p`
  color: #000000;
  font-size: 20px;
  margin: 0 0 30px;
`;

const ImageFrame = styled.div`
  align-items: flex-start;
  background: #ffffff;
  display: flex;
  justify-content: center;
  min-height: 630px;
  overflow: hidden;
  padding: 0;

  @media (min-width: 1200px) {
    min-height: 630px;
    padding: 0;
  }
`;

const Image = styled.img`
  height: 630px;
  object-fit: contain;
  opacity: 1;
  transform: rotate(0deg);
  width: 510px;
`;

const Placeholder = styled.p`
  color: #6b7280;
  margin: 0;
`;

const CtaRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SpecsSection = styled.section`
  margin-top: 2rem;
  padding-top: 0;
`;

const SpecsTitle = styled.h2`
  font-size: 20px;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0;
  text-transform: capitalize;
  margin: 0 0 0;
  margin-bottom: 40px;
`;

const Specs = styled.dl`
  display: block;
  margin: 0;
`;

const SpecRow = styled.div`
  border-bottom: 1px solid #e5e7eb;
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  gap: 1rem;
  padding: 1rem 0;
  align-items: start;

  &:first-of-type {
    border-top: 1px solid #e5e7eb;
  }
`;

const SpecKey = styled.dt`
  color: #000000;
  font-size: 12px;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0;
  text-transform: uppercase;
  margin: 0;
`;

const SpecValue = styled.dd`
  color: #000000;
  font-size: 12px;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0;
  margin: 0;
`;


type PhoneDetailClientProps = {
  phone: PhoneDetail;
};

export function PhoneDetailClient({ phone }: PhoneDetailClientProps) {
  const { addItem } = useCart();
  const {
    selectedColorCode,
    selectedStorageCode,
    setSelectedColorCode,
    setSelectedStorageCode,
    canAddToCart,
  } = usePhoneVariantState();

  const selectedColor = useMemo(() => {
    return (
      phone.colorOptions.find((option) => option.code === selectedColorCode) ??
      null
    );
  }, [phone.colorOptions, selectedColorCode]);

  const selectedStorage = useMemo(() => {
    return (
      phone.storageOptions.find(
        (option) => option.code === selectedStorageCode,
      ) ?? null
    );
  }, [phone.storageOptions, selectedStorageCode]);

  const currentPrice = selectedStorage?.price ?? phone.basePrice;
  const currentImageUrl = selectedColor?.imageUrl || phone.imageUrl || "";

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) {
      return;
    }

    addItem({
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: selectedColor.imageUrl || phone.imageUrl,
      colorCode: selectedColor.code,
      colorName: selectedColor.name,
      storageCode: selectedStorage.code,
      storageName: selectedStorage.name,
      price: currentPrice,
      quantity: 1,
    });
  };

  return (
    <>
      <Wrapper>
        <VisualStack>
          <ImageFrame>
            {currentImageUrl ? (
              <Image alt={phone.name} src={currentImageUrl} />
            ) : (
              <Placeholder>Image not available</Placeholder>
            )}
          </ImageFrame>
        </VisualStack>

        <ContentStack>
          <Heading>{phone.name}</Heading>
          <Price>
            {selectedStorage
              ? `${currentPrice} EUR`
              : `From ${phone.basePrice} EUR`}
          </Price>

          <VariantPicker
            colorOptions={phone.colorOptions}
            storageOptions={phone.storageOptions}
            selectedColorCode={selectedColorCode}
            selectedStorageCode={selectedStorageCode}
            onSelectColor={setSelectedColorCode}
            onSelectStorage={setSelectedStorageCode}
          />

          <CtaRow>
            <Button disabled={!canAddToCart} onClick={handleAddToCart}>
              AÑADIR
            </Button>
          </CtaRow>
        </ContentStack>
      </Wrapper>

      {phone.specs && Object.keys(phone.specs).length > 0 ? (
        <SpecsSection>
          <SpecsTitle>Specifications</SpecsTitle>
          <Specs>
            {getOrderedSpecEntries(phone.specs).map(({ key, label, value }) => (
              <SpecRow key={key}>
                <SpecKey>{label}</SpecKey>
                <SpecValue>{value}</SpecValue>
              </SpecRow>
            ))}
          </Specs>
        </SpecsSection>
      ) : null}

    </>
  );
}
