"use client";

import Link from "next/link";
import styled from "styled-components";

import { AppNavbar } from "@shared/components/layout/app-navbar";
import { PageContainer } from "@shared/components/layout/page-container";
import { Button } from "@shared/components/ui/button";
import { formatCurrency } from "@shared/lib/currency";

import { useCart } from "../store";
import { getCartItemKey } from "../types/cart.types";

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3.5rem);
`;

const ContentBlock = styled.div`
  flex: 1;
`;

const Heading = styled.h1`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0 0 1rem;
  text-transform: uppercase;
`;

const List = styled.ul`
  display: grid;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li`
  align-items: center;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 262px 1fr;
  padding: 0.75rem 0;

  @media (max-width: 767px) {
    gap: 10px;
    grid-template-columns: 160px 1fr;
  }
`;

const ThumbFrame = styled.div`
  align-items: center;
  display: flex;
  height: 324px;
  justify-content: center;
  overflow: hidden;
  width: 262px;

  @media (max-width: 767px) {
    height: 198px;
    width: 160px;
  }
`;

const ThumbImage = styled.img`
  height: 324px;
  object-fit: contain;
  opacity: 1;
  transform: rotate(0deg);
  width: 262px;

  @media (max-width: 767px) {
    height: 198px;
    width: 160px;
  }
`;

const ThumbFallback = styled.span`
  color: #6b7280;
  font-size: 0.7rem;
`;

const RowBody = styled.section`
  align-content: flex-start;
  align-items: flex-start;
  display: grid;
  gap: 0;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    height: 198px;
    justify-content: space-between;
    padding: 40px 0;
    width: 177px;
  }
`;

const itemTextStyles = `
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 100%;
`;

const Title = styled.strong`
  ${itemTextStyles}
  display: block;
  margin: 0;
  text-transform: uppercase;
`;

const Subtitle = styled.span`
  ${itemTextStyles}
  display: block;
  margin: 0;
  margin-top: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 767px) {
    margin-top: 5px;
  }
`;

const PriceLine = styled.span`
  ${itemTextStyles}
  display: block;
  margin: 0;
  margin-top: 1.25rem;

  @media (max-width: 767px) {
    margin-top: 20px;
    text-align: right;
    text-transform: capitalize;
  }
`;

const ActionRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;

  @media (max-width: 767px) {
    margin-top: 30px;
  }
`;

const RemoveButton = styled.button`
  ${itemTextStyles}
  background: none;
  border: none;
  color: #df0000;
  cursor: pointer;
  padding: 0;
`;

const Footer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TotalLabel = styled.span`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0;
  text-transform: uppercase;
`;

const TotalValue = styled.span`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0;
  text-transform: uppercase;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    flex-wrap: nowrap;
  }
`;

const ContinueLink = styled(Link)`
  align-items: center;
  border: 1px solid #111111;
  box-sizing: border-box;
  color: #111111;
  display: inline-flex;
  flex-shrink: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 300;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.08em;
  line-height: 16px;
  padding: 5px 7px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 361px;

  @media (max-width: 767px) {
    border-width: 0.5px;
    flex: 1;
    font-style: normal;
    letter-spacing: 0.08em;
    min-width: 0;
    width: auto;
  }
`;

const PayButton = styled(Button)`
  height: 48px;
  padding: 5px 7px;
  width: 175px;

  @media (max-width: 767px) {
    flex: 1;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0.08em;
    line-height: 16px;
    min-width: 0;
    text-align: center;
    text-transform: uppercase;
    width: auto;
  }
`;

export function CartView() {
  const { items, removeItem, totalPrice } = useCart();

  return (
    <>
      <AppNavbar />
      <PageContainer>
        <PageInner>
          <ContentBlock>
            <Heading>Cart ({items.length})</Heading>

            {items.length > 0 && (
              <List>
                {items.map((item) => (
                  <Row key={getCartItemKey(item)}>
                    <ThumbFrame>
                      {item.imageUrl ? (
                        <ThumbImage alt={item.name} src={item.imageUrl} />
                      ) : (
                        <ThumbFallback>No image</ThumbFallback>
                      )}
                    </ThumbFrame>
                    <RowBody>
                      <Title>
                        {item.name} - {item.brand}
                      </Title>
                      <Subtitle>
                        {item.storageName} | {item.colorName}
                      </Subtitle>
                      <PriceLine>
                        {formatCurrency(item.price)} x {item.quantity}
                      </PriceLine>
                      <ActionRow>
                        <RemoveButton
                          type="button"
                          onClick={() =>
                            removeItem({
                              id: item.id,
                              colorCode: item.colorCode,
                              storageCode: item.storageCode,
                            })
                          }
                        >
                          Eliminar
                        </RemoveButton>
                      </ActionRow>
                    </RowBody>
                  </Row>
                ))}
              </List>
            )}
          </ContentBlock>

          <Footer>
            {items.length > 0 && (
              <TotalRow>
                <TotalLabel>TOTAL</TotalLabel>
                <TotalValue>{formatCurrency(totalPrice)}</TotalValue>
              </TotalRow>
            )}
            <ButtonsRow>
              <ContinueLink href="/">CONTINUE SHOPPING</ContinueLink>
              {items.length > 0 && (
                <PayButton variant="primary">PAY</PayButton>
              )}
            </ButtonsRow>
          </Footer>
        </PageInner>
      </PageContainer>
    </>
  );
}
