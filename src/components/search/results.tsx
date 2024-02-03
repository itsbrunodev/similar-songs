"use client";

import { ChevronRightIcon, ClockIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { urls } from "@/lib/constants";
import { TSpotifyResponseWithError } from "@/lib/spotify/types/other";
import { ISpotifySearch } from "@/lib/spotify/types/search";

export interface ISearchHistory {
  name: string;
  artists: string;
  id: string;
}

export function SearchResults({
  data,
}: {
  data: TSpotifyResponseWithError<ISpotifySearch> | null;
}) {
  const [searchHistory, setSearchHistory] = useLocalStorage<ISearchHistory[]>(
    "searchHistory",
    []
  );

  if (data === null && searchHistory.length > 0)
    return (
      <SearchResultsWrapper>
        {searchHistory.map((track, i) => (
          <SearchResult
            id={track.id}
            name={track.name}
            artists={track.artists}
            history={true}
            key={i}
          />
        ))}
      </SearchResultsWrapper>
    );

  if (data === null)
    return (
      <div className="center flex h-20 text-zinc-400">
        Your search results will appear here.
      </div>
    );

  if (data.error || !data.tracks)
    return (
      <span className="flex items-center gap-2 text-red-600">
        <XCircleIcon size={18} /> ({data.error?.status}) {data.error?.message}.
      </span>
    );

  const tracks = data.tracks.items.map((track) => ({
    ...track,
    history: true,
  }));

  return (
    <div className="min-h-card z-10 flex h-full flex-col overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      {tracks.slice(0, 5).map((track, i) => {
        const artists = track.artists.map((x) => x.name).join(", ");

        return (
          <SearchResult
            id={track.id}
            name={track.name}
            artists={artists}
            history={false}
            linkProps={{
              onClick: () => {
                const shouldStore =
                  searchHistory.length === 0
                    ? true
                    : searchHistory[0].id !== track.id;

                if (shouldStore)
                  setSearchHistory([
                    {
                      name: track.name,
                      artists,
                      id: track.id,
                    },
                    ...searchHistory.slice(0, 4),
                  ]);
              },
            }}
            key={i}
          />
        );
      })}
    </div>
  );
}

function SearchResultsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-card z-10 flex h-full flex-col overflow-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      {children}
    </div>
  );
}

function SearchResult({
  name,
  artists,
  id,
  history = false,
  linkProps,
}: ISearchHistory & { history: boolean } & {
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
  return (
    <Link
      className="group flex items-center justify-between rounded-xl p-4 text-zinc-300 transition-all hover:bg-zinc-800"
      href={urls.song.replace("[id]", id)}
      {...linkProps}
    >
      {history && (
        <div className="mr-4">
          <ClockIcon size={28} />
        </div>
      )}
      <div className="flex w-11/12 flex-col">
        <span className="line-clamp-2 text-lg font-medium text-white">
          {name}
        </span>
        <span className="line-clamp-2 text-sm">{artists}</span>
      </div>
      <ChevronRightIcon
        className="opacity-0 transition-all group-hover:opacity-100"
        size={18}
      />
    </Link>
  );
}
