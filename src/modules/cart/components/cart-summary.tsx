import styled from "styled-components";

import { formatCurrency } from "@shared/lib/currency";

const Root = styled.section`
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  padding-top: 1rem;
`;

export function CartSummary({ total }: { total: number }) {
  return (
    <Root>
      <strong>Total: {formatCurrency(total)}</strong>
    </Root>
  );
}
