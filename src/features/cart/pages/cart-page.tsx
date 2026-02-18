"use client";

import Link from "next/link";
import styled from "styled-components";

import { AppNavbar } from "@components/layout/app-navbar";
import { PageContainer } from "@components/layout/page-container";
import { Button } from "@components/ui/button";
import { formatCurrency } from "@lib/currency";

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
  font-size: 24px;
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

/* Imagen izquierda, texto derecha; texto centrado verticalmente frente a la imagen */
const Row = styled.li`
  align-items: center;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 262px 1fr;
  padding: 0.75rem 0;
`;

const ThumbFrame = styled.div`
  align-items: center;
  display: flex;
  height: 324px;
  justify-content: center;
  overflow: hidden;
  width: 262px;
`;

const ThumbImage = styled.img`
  height: 324px;
  object-fit: contain;
  opacity: 1;
  transform: rotate(0deg);
  width: 262px;
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
`;

const itemTextStyles = `
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
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
  margin-top: 0.25rem;
  text-transform: uppercase;
`;

const PriceLine = styled.span`
  ${itemTextStyles}
  display: block;
  margin: 0;
  margin-top: 0.75rem;
`;

const ActionRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 6rem;
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
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ContinueLink = styled(Link)`
  align-items: center;
  border: 0.5px solid #111111;
  box-sizing: border-box;
  color: #111111;
  display: inline-flex;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 300;
  height: 56px;
  justify-content: center;
  letter-spacing: 0.08em;
  line-height: 16px;
  padding: 5px 7px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 260px;
`;

const FooterRight = styled.div`
  align-items: center;
  display: flex;
  gap: 80px;
  margin-left: auto;
`;

const TotalBlock = styled.p`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0;
  text-transform: uppercase;
`;

const PayButton = styled(Button)`
  height: 56px;
  width: 260px;
`;

export function CartPage() {
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
          <ContinueLink href="/">Continue shopping</ContinueLink>
          {items.length > 0 && (
            <FooterRight>
              <TotalBlock>
                TOTAL {formatCurrency(totalPrice)}
              </TotalBlock>
              <PayButton variant="primary">
                PAY
              </PayButton>
            </FooterRight>
          )}
          </Footer>
        </PageInner>
      </PageContainer>
    </>
  );
}
