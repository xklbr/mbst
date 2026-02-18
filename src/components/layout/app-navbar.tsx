"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { Icon, IconNameEnum, Logo } from "@components/icons";
import { useCart } from "@features/cart/hooks/use-cart";

const Root = styled.header`
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  min-height: 3.5rem;
  padding: 0.75rem 1.25rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  @media (min-width: 1024px) {
    padding-inline: 2rem;
  }
`;

const Brand = styled(Link)`
  display: block;
  line-height: 0;
`;

const BrandLogo = styled(Logo)`
  display: block;
`;

const CartLink = styled(Link)`
  align-items: center;
  display: inline-flex;
  gap: 0.375rem;
  text-decoration: none;
`;

const CartCount = styled.span`
  font-size: 16px;
  letter-spacing: 0;
  line-height: 16px;
`;

export function AppNavbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const isCartPage = pathname === "/cart";

  return (
    <Root>
      <Brand href="/" aria-label="MBST Home">
        <BrandLogo />
      </Brand>
      {!isCartPage && (
        <CartLink href="/cart" aria-label="Open cart">
          <Icon name={IconNameEnum.BAG} alt="" size={18} />
          <CartCount>{itemCount}</CartCount>
        </CartLink>
      )}
    </Root>
  );
}
