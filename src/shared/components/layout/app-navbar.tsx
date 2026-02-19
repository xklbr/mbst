"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { Icon, IconNameEnum, Logo } from "@shared/components/icons";
import { useCart } from "@modules/cart/hooks/use-cart";
import { containerLayout, media, theme } from "@shared/styles";

const Root = styled.header`
  background: ${theme.colors.bg};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  left: 0;
  padding: 0.75rem 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;

  ${media.desktopUp} {
    padding: 1.75rem 0;
  }
`;

const NavbarContainer = styled.div`
  ${containerLayout}
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
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
  font-size: ${theme.fontSize.base};
  letter-spacing: 0;
  line-height: 1rem;
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
          <CartLink
            href="/cart"
            aria-label={`Open cart, ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
          >
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
