import type { Metadata } from "next";

import { env } from "@config/env";
import { CartProvider } from "@modules/cart";
import { GlobalStyle } from "@shared/styles/global-style";
import StyledComponentsRegistry from "@shared/styles/styled-components-registry";

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: env.NEXT_PUBLIC_APP_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
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
