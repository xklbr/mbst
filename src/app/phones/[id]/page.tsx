import { Suspense } from "react";
import { PhoneDetailView } from "@modules/phone-detail";
import { Spinner } from "@shared/components/ui/spinner";

type PhoneDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function PhoneDetailRoute({ params }: PhoneDetailRouteProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<Spinner />}>
      <PhoneDetailView phoneId={id} />
    </Suspense>
  );
}
