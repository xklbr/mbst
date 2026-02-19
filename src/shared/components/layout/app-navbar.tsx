"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { Icon, IconNameEnum, Logo } from "@shared/components/icons";
import { useCart } from "@modules/cart/hooks/use-cart";
import { media } from "@shared/styles/media";

const Root = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  left: 0;
  padding: 0.75rem 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;

  ${media.desktopUp} {
    padding: 28px 0;
  }
`;

const NavbarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1.25rem;
  width: 100%;

  ${media.desktopUp} {
    max-width: none;
    padding: 0 100px;
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

const IconMobile = styled.span`
  display: inline-flex;

  ${media.tabletUp} {
    display: none;
  }
`;

const IconDesktop = styled.span`
  display: none;

  ${media.tabletUp} {
    display: inline-flex;
  }
`;

export function AppNavbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const isCartPage = pathname === "/cart";

  return (
    <Root>
      <NavbarContainer>
        <Brand href="/" aria-label="MBST Home">
          <BrandLogo />
        </Brand>
        {!isCartPage && (
          <CartLink href="/cart" aria-label="Open cart">
            <IconMobile>
              <Icon name={IconNameEnum.BAG_FILLED} alt="" size={18} />
            </IconMobile>
            <IconDesktop>
              <Icon name={IconNameEnum.BAG} alt="" size={18} />
            </IconDesktop>
            <CartCount>{itemCount}</CartCount>
          </CartLink>
        )}
      </NavbarContainer>
    </Root>
  );
}
