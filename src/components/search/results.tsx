"use client";

import { ChevronRightIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";

import { FRAMER_FADE_IN_OUT } from "@/lib/constants";
import { TSpotifyResponseWithError } from "@/lib/spotify/types/other";
import { ISpotifySearch } from "@/lib/spotify/types/search";
import { cn } from "@/lib/utils";

export function SearchResults({
  data,
}: {
  data: TSpotifyResponseWithError<ISpotifySearch> | null;
}) {
  if (data === null)
    return (
      <div
        className="center flex h-20 text-zinc-400"
        {...FRAMER_FADE_IN_OUT}
        key="placeholder"
      >
        Your search results will appear here.
      </div>
    );

  if (data.error || !data.tracks)
    return (
      <span className="flex items-center gap-2 text-red-600">
        <XCircleIcon size={18} /> ({data.error?.status}) {data.error?.message}.
      </span>
    );

  return (
    <div className="flex h-full flex-col overflow-auto rounded-xl bg-zinc-900 p-4 border border-zinc-800 min-h-card z-10">
      {data.tracks.items.slice(0, 5).map((track, i) => (
        <Link
          className={cn(
            "group flex items-center justify-between rounded-xl p-4 text-zinc-300 transition-all hover:bg-zinc-800"
            /* track..length === 0 && "opacity-50" */
          )}
          href={`/track/${track.id}`}
          key={i}
        >
          <div className="flex w-11/12 flex-col">
            <span className="line-clamp-2 text-lg font-medium text-white">
              {track.name}
            </span>
            <span className="line-clamp-2 text-sm">
              {track.artists.map((x) => x.name).join(", ")}
            </span>
          </div>
          <ChevronRightIcon
            className="opacity-0 transition-all group-hover:opacity-100"
            size={18}
          />
        </Link>
      ))}
    </div>
  );
}
