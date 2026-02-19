import { notFound } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

import { media } from "@shared/styles";
import { Icon, IconNameEnum } from "@shared/components/icons";
import { AppNavbar, PageContainer } from "@shared/components/layout";
import { t } from "@shared/i18n";
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
  color: #000000;
  display: inline-flex;
  font-size: 12px;
  gap: 8px;
  margin-bottom: 1rem;
  padding-left: 5px;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }

  ${media.largeDesktopUp} {
    line-height: 100%;
  }

  .chevron-icon {
    flex-shrink: 0;
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
            <Icon
              name={IconNameEnum.CHEVRON_LEFT}
              alt=""
              width={5.060659885406494}
              height={8.707107543945312}
              className="chevron-icon"
            />
            {t.common.back}
          </BackLink>
          <PhoneDetailClient phone={phone} />
        </PageContainer>
        <SimilarItemsCarousel phones={similarPhones} />
      </PageBottom>
    </>
  );
}
