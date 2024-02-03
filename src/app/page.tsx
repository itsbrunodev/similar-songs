import { Header } from "@/components/header";
import { BaseLayout } from "@/components/layout/base";
import { Search } from "@/components/search";
import { SearchResults } from "@/components/search/results";
import { searchTrack } from "@/lib/spotify/utils";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const searchQuery = searchParams?.search;

  async function searchByQuery(): Promise<ReturnType<
    typeof searchTrack
  > | null> {
    if (searchQuery) return await searchTrack(searchQuery);
    return new Promise((resolve) => resolve(null));
  }

  const searchResults = await searchByQuery();

  return (
    <BaseLayout className="my-0">
      <div className="flex h-full flex-col">
        <Header />
        <div className="flex w-full flex-col gap-4">
          {/* searching for tracks */}
          <Search />
          {/* search results */}
          <SearchResults data={searchResults} />
        </div>
      </div>
    </BaseLayout>
  );
}
