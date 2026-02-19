"use client";

import { useMemo } from "react";
import styled from "styled-components";

import { media } from "@shared/styles/media";
import { Button } from "@shared/components/ui/button";
import { useCart } from "@modules/cart/hooks/use-cart";

import { getOrderedSpecEntries } from "../lib/spec-display";
import { usePhoneVariantState } from "../hooks/use-phone-variant-state";
import type { PhoneDetail } from "../types/phone-detail.types";
import { VariantPicker } from "./variant-picker";

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  align-items: start;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  ${media.largeDesktopUp} {
    align-items: flex-start;
    gap: 3rem;
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
  color: #000000;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
`;

const Price = styled.p`
  color: #000000;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 0 30px;
  text-transform: capitalize;
`;

const ImageFrame = styled.div`
  align-items: center;
  background: #ffffff;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  width: 100%;

  ${media.mobileOnly} {
    min-height: auto;
  }
`;

const Image = styled.img`
  height: auto;
  max-height: 630px;
  max-width: 100%;
  object-fit: contain;
  opacity: 1;
  transform: rotate(0deg);
  width: 100%;
`;

const Placeholder = styled.p`
  color: #6b7280;
  margin: 0;
`;

const CtaRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const AddButton = styled(Button)`
  height: 48px;
  padding: 5px 7px;
  width: 240px;
  max-width: 100%;

  ${media.mobileOnly} {
    width: 100%;
  }
`;

const SpecsSection = styled.section`
  margin-top: 80px;
  padding-top: 0;

  ${media.largeDesktopUp} {
    margin-top: 2rem;
  }
`;

const SpecsTitle = styled.h2`
  font-size: 20px;
  font-style: normal;
  line-height: 100%;
  letter-spacing: 0;
  text-transform: uppercase;
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
  grid-template-columns: 40% 1fr;
  gap: 1rem;
  padding: 1rem 0;
  align-items: start;

  ${media.largeDesktopUp} {
    grid-template-columns: minmax(140px, 200px) 1fr;
  }

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
            <AddButton disabled={!canAddToCart} onClick={handleAddToCart}>
              AÑADIR
            </AddButton>
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
