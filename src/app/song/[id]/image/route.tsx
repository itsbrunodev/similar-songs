import { ImageResponse } from "next/og";

import { getSimilarTracks, getTrack } from "@/lib/spotify/utils";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const track = await getTrack(params.id);

  if (track.error) return new Response(track.error.message, { status: 400 });

  const similarTracks = await getSimilarTracks(track.id, []);

  if (similarTracks.error)
    return new Response(similarTracks.error.message, { status: 400 });

  const truncateStyle = {
    style: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full items-start text-zinc-300 bg-[#09090b] relative rounded-none"
        style={{ fontFamily: '"Karla", sans-serif' }}
      >
        <div tw="flex items-center p-4">
          <img
            tw="rounded-xl"
            src={track.album.images[0].url}
            width="140"
            height="140"
          />
          <div tw="flex flex-col ml-4">
            <div tw="mb-1 text-zinc-300 font-light">Songs similar to</div>
            <div
              tw="font-extrabold text-white text-3xl w-[372px]"
              {...truncateStyle}
            >
              {track.name}
            </div>
            <div tw="w-[372px]" {...truncateStyle}>
              {track.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>
        <div tw="mt-0 flex flex-col px-4 text-white relative">
          <div tw="flex items-center">
            <img
              tw="rounded-xl"
              src={similarTracks.tracks[0].album.images[0].url}
              width="60"
              height="60"
            />
            <div tw="flex flex-col ml-2">
              <div tw="font-medium w-[475px]">
                {similarTracks.tracks[0].name}
              </div>
              <div tw="text-xs text-zinc-300 w-[475px]">
                {similarTracks.tracks[0].artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </div>
            </div>
          </div>
          <div tw="flex items-center mt-4 relative w-full">
            <div tw="rounded-xl w-[60px] h-[60px] bg-zinc-900" />
            <div tw="flex flex-col ml-2">
              <div tw="w-20 h-2.5 bg-zinc-900 rounded-full mb-1" />
              <div tw="w-10 h-2 rounded-full bg-zinc-900" />
            </div>
            <div tw="flex items-center justify-center absolute text-lg text-zinc-200 w-full h-full font-medium">
              {similarTracks.tracks.length - 1} more similar songs
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 560,
      height: 324,
      fonts: [
        {
          name: "Karla",
          data: await fetch(
            new URL("../../../../../public/Karla-Light.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          weight: 300,
          style: "normal",
        },
        {
          name: "Karla",
          data: await fetch(
            new URL("../../../../../public/Karla-Regular.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          weight: 400,
          style: "normal",
        },
        {
          name: "Karla",
          data: await fetch(
            new URL("../../../../../public/Karla-Medium.ttf", import.meta.url)
          ).then((res) => res.arrayBuffer()),
          weight: 500,
          style: "normal",
        },
        {
          name: "Karla",
          data: await fetch(
            new URL(
              "../../../../../public/Karla-ExtraBold.ttf",
              import.meta.url
            )
          ).then((res) => res.arrayBuffer()),
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
