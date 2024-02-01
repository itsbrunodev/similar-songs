import { SearchIcon } from "lucide-react";
import { Metadata } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import pms from "pretty-ms";
import { Fragment } from "react";

import { AudioPlayer } from "@/components/audio-player";
import { BackToTop } from "@/components/back-to-top";
import { CircularMotion } from "@/components/circlular-motion";
import { Image } from "@/components/image";
import { BaseLayout } from "@/components/layout/base";
import { TopNavigation } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { app, urls } from "@/lib/constants";
import { ISpotifyTrack } from "@/lib/spotify/types/track";
import { getSimilarTracks, getTrack } from "@/lib/spotify/utils";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const fetchTrackData = async () => {
    const track = await getTrack(id);

    if (track.error) return null;

    return { name: track.name, artist: track.artists[0].name };
  };

  const trackData = await fetchTrackData();
  const title = trackData
    ? `Songs similar to ${trackData.name} by ${trackData.artist}`
    : app.name;
  const description = app.description;
  const images = `${urls.base}${urls.track.replace("[id]", id)}/image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const trackId = params.id;

  async function fetchSimilarTracks(): Promise<ReturnType<
    typeof getSimilarTracks
  > | null> {
    if (trackId) return await getSimilarTracks(trackId, []);
    return new Promise((resolve) => resolve(null));
  }

  async function fetchTrack(): Promise<ReturnType<typeof getTrack> | null> {
    if (trackId) return await getTrack(trackId);
    return new Promise((resolve) => resolve(null));
  }

  const similarTrackList = await fetchSimilarTracks();
  const track = await fetchTrack();

  if (!track) notFound();
  else if (track.error) notFound() /* return <>{track.error.message}</> */;
  else if (!similarTrackList) notFound() /* return <>no similar tracks</> */;
  else if (similarTrackList.error)
    notFound() /* return <>{similarTrackList.error.message}</> */;
  else if (!similarTrackList?.tracks || similarTrackList.tracks.length === 0)
    notFound() /* return <>no similar</> */;

  return (
    <>
      <div className="absolute left-0 top-0 z-0 h-72 w-full">
        {/* <div className="full relative h-[inherit]"> */}
        <CircularMotion
          /* className="absolute left-0 top-0 z-0 h-72 w-full" */
          className="full relative h-[inherit]"
          radius={40}
          speed={35}
        >
          <NextImage
            className="h-[inherit] w-full select-none bg-cover object-cover opacity-30 blur-[128px]"
            src={track.album.images[0].url}
            alt={track.album.name}
            width={256}
            height={256}
            draggable={false}
            quality={1}
            priority
          />
        </CircularMotion>
        {/* </div> */}
      </div>
      <BackToTop />
      <BaseLayout className="relative z-10 md:max-w-4xl">
        <div className="flex flex-col gap-8">
          <TopNavigation />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative flex w-full items-center gap-4 md:w-fit md:gap-6">
              <div className="relative aspect-square h-28 w-28 rounded-xl md:h-48 md:w-48">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 *:h-12 *:w-12 md:*:h-16 md:*:w-16">
                  <AudioPlayer src={track.preview_url} />
                </div>
                <Image
                  wrapper={{
                    className:
                      "w-[inherit] h-[inherit] aspect-[inherit] rounded-[inherit]",
                  }}
                  image={{
                    src: track.album.images[0].url,
                    alt: track.album.name,
                    width: 192,
                    height: 192,
                    priority: true,
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="mb-1 font-light text-zinc-300 md:text-lg">
                  Songs similar to
                </span>
                <Link
                  className="line-clamp-2 text-3xl font-extrabold text-white md:text-4xl"
                  href={track.external_urls.spotify}
                  target="_blank"
                >
                  {track.name}
                </Link>
                <div className="md:text-lg">
                  <TrackArtists track={track} />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 md:max-w-[25%]">
              <Button className="w-full">Add playlist to Spotify</Button>
              <Link href={track.external_urls.spotify} target="_blank">
                <Button className="w-full" variant="secondary" tabIndex={-1}>
                  Play on Spotify
                </Button>
              </Link>
            </div>
          </div>
          <table className="hidden w-full table-fixed overflow-clip md:table">
            <thead hidden>
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Artist(s)</th>
                <th>Duration</th>
                <th>Find similar</th>
              </tr>
            </thead>
            <tbody>
              {similarTrackList.tracks.map((track, i) => (
                <tr
                  className="table-row text-lg text-white transition-colors *:table-cell *:overflow-hidden *:break-words *:py-4 *:align-middle"
                  key={i}
                >
                  {/* preview */}
                  <td className="w-28">
                    <AudioPlayer src={track.preview_url} />
                  </td>
                  {/* title */}
                  <td className="w-6/12 pr-4">
                    <Link
                      className="hover:underline"
                      href={track.external_urls.spotify}
                      target="_blank"
                    >
                      {track.name}
                    </Link>
                  </td>
                  {/* artists */}
                  <td className="w-6/12 text-zinc-300">
                    <TrackArtists track={track} />
                  </td>
                  {/* duration */}
                  <td className="w-28 text-zinc-300">
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="tabular-nums">
                        {pms(track.duration_ms, {
                          colonNotation: true,
                        }).replace(/\.\d/, "")}
                      </span>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Link href={urls.track.replace("[id]", track.id)}>
                          <Button
                            className="p-0"
                            variant="secondary"
                            aria-label="Find similar"
                            size="icon"
                            tabIndex={-1}
                          >
                            <SearchIcon size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full flex-col gap-4 md:hidden">
            {similarTrackList.tracks.map((track, i) => (
              <div className="flex items-center gap-4" key={i}>
                <div className="col-span-1 w-fit">
                  <AudioPlayer src={track.preview_url} />
                </div>
                <Link
                  className="flex w-7/12 gap-4"
                  href={track.external_urls.spotify}
                  target="_blank"
                >
                  <div className="flex flex-col">
                    <h1 className="text-lg font-medium text-white">
                      {track.name}
                    </h1>
                    <h2>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </h2>
                  </div>
                </Link>
                <div className="ml-auto text-zinc-400">
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="tabular-nums">
                      {pms(track.duration_ms, {
                        colonNotation: true,
                      }).replace(/\.\d/, "")}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Link href={urls.track.replace("[id]", track.id)}>
                        <Button
                          className="p-0"
                          variant="secondary"
                          aria-label="Find similar"
                          size="icon"
                          tabIndex={-1}
                        >
                          <SearchIcon size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

function TrackArtists({ track }: { track: ISpotifyTrack }) {
  return track.artists.map((artist, i) => (
    <Fragment key={i}>
      <Link
        className="hover:underline"
        href={artist.external_urls.spotify}
        target="_blank"
      >
        {artist.name}
      </Link>
      {track.artists[i + 1] && <span className="mr-1">,</span>}
    </Fragment>
  ));
}
