import { TLastFmError } from "./types/other";
import { ILastFmSearchTrack } from "./types/search";

const BASE_URL = "https://ws.audioscrobbler.com/2.0";

const { LASTFM_API_KEY } = process.env;

export async function searchTracks(
  query: string
): Promise<TLastFmError<ILastFmSearchTrack>> {
  const url = `${BASE_URL}/?method=track.search&track=${query}&api_key=${LASTFM_API_KEY}&format=json`;

  return await fetch(url).then((x) => x.json());
}
