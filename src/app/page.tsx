import { CatalogView } from "@modules/catalog";

type HomeRouteProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function HomeRoute({ searchParams }: HomeRouteProps) {
  const { search } = await searchParams;

  return <CatalogView search={search} />;
}
