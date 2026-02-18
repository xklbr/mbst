import { CatalogPage } from "@features/catalog";

type HomeRouteProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function HomeRoute({ searchParams }: HomeRouteProps) {
  const { search } = await searchParams;

  return <CatalogPage search={search} />;
}
