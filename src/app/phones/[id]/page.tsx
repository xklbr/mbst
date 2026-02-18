import { PhoneDetailPage } from "@features/phone-detail";

type PhoneDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function PhoneDetailRoute({ params }: PhoneDetailRouteProps) {
  const { id } = await params;

  return <PhoneDetailPage phoneId={id} />;
}
