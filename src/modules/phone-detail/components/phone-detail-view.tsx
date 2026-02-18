import { notFound } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

import { Icon, IconNameEnum } from "@shared/components/icons";
import { AppNavbar } from "@shared/components/layout/app-navbar";
import { PageContainer } from "@shared/components/layout/page-container";
import type { CatalogPhone } from "@modules/catalog";

import { PhoneDetailClient } from "./phone-detail-client";
import { SimilarItemsCarousel } from "./similar-items-carousel";
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

export async function PhoneDetailView({ phoneId }: { phoneId: string }) {
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
