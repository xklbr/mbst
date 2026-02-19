"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

import { media, theme } from "@shared/styles";
import { AppNavbar, PageContainer } from "@shared/components/layout";
import { Button } from "@shared/components/ui";
import { t } from "@shared/i18n";
import { formatCurrency } from "@shared/lib/currency";

import { useCart } from "../store";
import { getCartItemKey } from "../types/cart.types";

const PageInner = styled.div<{ $empty?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ $empty }) =>
    $empty &&
    `
    min-height: calc(100vh - ${theme.layout.navbarHeightMobile} - (${theme.layout.containerPaddingMobile} * 2));
  `}

  ${media.desktopUp} {
    ${({ $empty }) =>
      $empty &&
      `
      min-height: calc(100vh - ${theme.layout.navbarHeightDesktop} - (2rem * 2));
    `}
  }
`;

const ContentBlock = styled.div`
  flex: 1;
`;

const Heading = styled.h1`
  font-size: ${theme.fontSize.lg};
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
  align-items: start;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 16.375rem 1fr;
  padding: 0.75rem 0;

  ${media.mobileOnly} {
    gap: 0.625rem;
    grid-template-columns: 10rem 1fr;
  }
`;

const ThumbFrame = styled.div`
  align-items: center;
  display: flex;
  height: 20.25rem;
  justify-content: center;
  overflow: hidden;
  width: 16.375rem;

  ${media.mobileOnly} {
    height: 12.375rem;
    width: 10rem;
  }
`;

const ThumbImage = styled.img`
  height: 20.25rem;
  object-fit: contain;
  opacity: 1;
  transform: rotate(0deg);
  width: 16.375rem;

  ${media.mobileOnly} {
    height: 12.375rem;
    width: 10rem;
  }
`;

const ThumbFallback = styled.span`
  color: ${theme.colors.mutedText};
  font-size: 0.7rem;
`;

const RowBody = styled.section`
  align-content: flex-start;
  align-items: flex-start;
  display: grid;
  gap: 0;
  margin-top: 5.625rem;

  ${media.mobileOnly} {
    display: flex;
    flex-direction: column;
    height: 12.375rem;
    justify-content: space-between;
    margin-top: 0;
    padding: 2.5rem 0;
    width: 11.0625rem;
  }
`;

const itemTextStyles = css`
  font-size: ${theme.fontSize.sm};
  font-style: normal;
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

  ${media.mobileOnly} {
    margin-top: 0.3125rem;
  }
`;

const PriceLine = styled.span`
  ${itemTextStyles}
  display: block;
  margin: 0;
  margin-top: 1.25rem;

  ${media.mobileOnly} {
    margin-top: 1.25rem;
    text-align: right;
    text-transform: capitalize;
  }
`;

const ActionRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 5rem;

  ${media.mobileOnly} {
    margin-top: 1.875rem;
  }
`;

const RemoveButton = styled.button`
  ${itemTextStyles}
  background: none;
  border: none;
  color: ${theme.colors.danger};
  cursor: pointer;
  padding: 0;
`;

const Footer = styled.section<{ $empty?: boolean }>`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  margin-top: ${({ $empty }) => ($empty ? "auto" : "1rem")};

  ${media.desktopUp} {
    align-items: center;
    display: flex;
    flex-direction: row;
    grid-template-columns: unset;
    grid-template-rows: unset;
    justify-content: space-between;
  }
`;

const TotalRow = styled.div`
  display: flex;
  gap: 1.25rem;
  grid-column: 1 / -1;
  justify-content: space-between;
  order: 1;
  width: 100%;

  ${media.desktopUp} {
    grid-column: unset;
    justify-content: flex-start;
    margin-left: auto;
    margin-right: 3.125rem;
    order: unset;
    width: auto;
  }
`;

const TotalLabel = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0;
  text-transform: uppercase;
`;

const TotalValue = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: 400;
  letter-spacing: 0;
  line-height: 100%;
  margin: 0;
  text-transform: uppercase;
`;

const ContinueWrapper = styled.span<{ $empty?: boolean }>`
  order: 2;

  ${media.mobileOnly} {
    min-width: 0;
    width: 100%;
    ${({ $empty }) =>
      $empty &&
      `
      grid-column: 1 / -1;
    `}
  }

  ${media.desktopUp} {
    flex-shrink: 0;
    order: unset;
  }
`;

const PayWrapper = styled.span`
  order: 3;

  ${media.mobileOnly} {
    display: block;
    min-width: 0;
    width: 100%;
  }

  ${media.tabletOnly} {
    display: block;
    min-width: 0;
    width: 100%;
  }

  ${media.desktopUp} {
    flex-shrink: 0;
    order: unset;
  }
`;

const ContinueLink = styled(Link)`
  align-items: center;
  border: 1px solid ${theme.colors.primary};
  box-sizing: border-box;
  color: ${theme.colors.primary};
  display: inline-flex;
  flex-shrink: 0;
  font-size: ${theme.fontSize.sm};
  height: 3rem;
  justify-content: center;
  letter-spacing: 0.08em;
  line-height: 1rem;
  padding: 0.3125rem 0.4375rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 22.5625rem;

  ${media.desktopUp} {
    width: 16.25rem;
  }

  ${media.mobileOnly} {
    border-width: 0.5px;
    min-width: 0;
    width: 100%;
  }
`;

const PayButton = styled(Button)`
  height: 3rem;
  padding: 0.3125rem 0.4375rem;
  width: 10.9375rem;

  ${media.desktopUp} {
    width: 16.25rem;
  }

  ${media.mobileOnly} {
    font-size: ${theme.fontSize.sm};
    letter-spacing: 0.08em;
    line-height: 1rem;
    max-width: none;
    min-width: 0;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }

  ${media.tabletOnly} {
    max-width: none;
    min-width: 0;
    width: 100%;
  }
`;

export function CartView() {
  const { items, removeItem, totalPrice } = useCart();

  return (
    <>
      <AppNavbar />
      <PageContainer>
        <PageInner $empty={items.length === 0}>
          <ContentBlock>
            <Heading>{t.cart.title(items.length)}</Heading>

            {items.length > 0 && (
              <List>
                {items.map((item) => (
                  <Row key={getCartItemKey(item)}>
                    <ThumbFrame>
                      {item.imageUrl ? (
                        <ThumbImage alt={item.name} src={item.imageUrl} />
                      ) : (
                        <ThumbFallback>{t.cart.noImage}</ThumbFallback>
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
                          {t.cart.delete}
                        </RemoveButton>
                      </ActionRow>
                    </RowBody>
                  </Row>
                ))}
              </List>
            )}
          </ContentBlock>

          <Footer $empty={items.length === 0}>
            <ContinueWrapper $empty={items.length === 0}>
              <ContinueLink href="/">{t.cart.continueShopping}</ContinueLink>
            </ContinueWrapper>
            {items.length > 0 && (
              <TotalRow>
                <TotalLabel>{t.cart.total}</TotalLabel>
                <TotalValue>{formatCurrency(totalPrice)}</TotalValue>
              </TotalRow>
            )}
            {items.length > 0 && (
              <PayWrapper>
                <PayButton $variant="primary">{t.cart.pay}</PayButton>
              </PayWrapper>
            )}
          </Footer>
        </PageInner>
      </PageContainer>
    </>
  );
}
