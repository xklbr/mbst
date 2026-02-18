import type { Metadata } from "next";

import { CartProvider } from "@features/cart";
import { GlobalStyle } from "@styles/global-style";
import StyledComponentsRegistry from "@styles/styled-components-registry";

export const metadata: Metadata = {
  title: "MBST App",
  description: "Smartphone catalog challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <CartProvider>{children}</CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
