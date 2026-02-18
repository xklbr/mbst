import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon, IconNameEnum } from "@components/icons";
import styled from "styled-components";

import { AppNavbar } from "@components/layout/app-navbar";
import { PageContainer } from "@components/layout/page-container";
import type { CatalogPhone } from "@features/catalog";

import { PhoneDetailClient } from "../components/phone-detail-client";
import { SimilarItemsCarousel } from "../components/similar-items-carousel";
import {
  PhoneNotFoundError,
  getPhoneById,
  getSimilarPhones,
} from "../lib/phone-detail-api";
import type { PhoneDetail } from "../types/phone-detail.types";

const BackLink = styled(Link)`
  align-items: center;
  color: #111111;
  display: inline-flex;
  font-size: 0.875rem;
  gap: 0.25rem;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  /* Align with navbar logo: same left offset (1.25rem < 1024px, 2rem >= 1024px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-left: -0.75rem;
  }

  @media (min-width: 1200px) {
    margin-left: calc(-1 * (100vw - 1200px) / 2);
  }
`;

const PageBottom = styled.div`
  padding-bottom: 5rem;
`;

export async function PhoneDetailPage({ phoneId }: { phoneId: string }) {
  let phone: PhoneDetail;
  let similarPhones: CatalogPhone[];

  try {
    phone = await getPhoneById(phoneId);
    similarPhones = await getSimilarPhones(phone, 8);
  } catch (error) {
    if (error instanceof PhoneNotFoundError) {
      notFound();
    }

    throw error;
  }

  return (
    <>
      <AppNavbar />
      <PageBottom>
        <PageContainer>
          <BackLink href="/">
            <Icon name={IconNameEnum.CHEVRON_LEFT} alt="" size={16} />
            BACK
          </BackLink>
          <PhoneDetailClient phone={phone} />
        </PageContainer>
        <SimilarItemsCarousel phones={similarPhones} />
      </PageBottom>
    </>
  );
}
