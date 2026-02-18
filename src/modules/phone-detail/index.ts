export { PhoneDetailView } from "./components/phone-detail-view";
export { PhoneDetailClient } from "./components/phone-detail-client";
export { getPhoneById, getSimilarPhones } from "./lib/phone-detail-api";
export { PhoneNotFoundError } from "./lib/phone-detail-api";
export type {
  PhoneDetail,
  PhoneColorOption,
  PhoneStorageOption,
} from "./types/phone-detail.types";
