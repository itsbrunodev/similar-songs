import { urls } from "../constants";
import { TSpotifyResponseWithError } from "./types/other";
import { ISpotifySearch } from "./types/search";
import { ISpotifyTrack } from "./types/track";

const { SPOTIFY_CLIENT_ID: ID, SPOTIFY_CLIENT_SECRET: SECRET } = process.env;

let tokenData = {
  accessToken: "",
  expiresAt: 0,
};

/* export async function rotateAccessToken(refreshToken: string) {
  const response = await fetch(urls.spotify.accounts.token, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: ID!,
    }),
  }).then(async (x) => await x.json());

  console.log(response);

  return response as {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  };
} */

async function getAccessToken() {
  if (
    typeof tokenData.expiresAt === "number" &&
    Date.now() < tokenData.expiresAt
  )
    return tokenData.accessToken;

  try {
    const response = await fetch(urls.spotify.accounts.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${ID}:${SECRET}`).toString(
          "base64"
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    const res = await response.json();

    if (response.status !== 200) return null;

    /* generate an access token */
    const data = res as {
      access_token: string;
      expires_in: number /* seconds */;
    };

    const accessToken = data.access_token;
    const expiresAt = Date.now() + (data.expires_in - 60) * 1000;

    if (data.access_token !== tokenData.accessToken)
      tokenData = { accessToken, expiresAt };

    return accessToken;
  } catch (error) {
    return null;
  }
}

export async function getTrack(str: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${urls.spotify.api.tracks}/${str}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return (await response.json()) as TSpotifyResponseWithError<ISpotifyTrack>;
}

export async function searchTrack(
  query: string,
  options: {
    limit?: number;
    offset?: number;
  } = { limit: 50, offset: 0 }
) {
  const accessToken = await getAccessToken();

  const searchParams = new URLSearchParams();

  searchParams.set("q", query);
  searchParams.set("type", "track");

  if (typeof options.limit === "number")
    searchParams.set("limit", options.limit.toString());
  if (typeof options.offset === "number")
    searchParams.set("offset", options.offset.toString());

  const response = await fetch(
    `${urls.spotify.api.search}?${searchParams.toString()}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return (await response.json()) as TSpotifyResponseWithError<ISpotifySearch>;
}

export async function getSimilarTracks(
  trackName: string,
  trackArtist: string[],
  options: {
    limit?: number;
    offset?: number;
  } = { limit: 50, offset: 0 }
) {
  const accessToken = await getAccessToken();

  const searchParams = new URLSearchParams();

  searchParams.set("seed_tracks", trackName);
  searchParams.set("seed_artists", trackArtist.join(","));

  if (typeof options.limit === "number")
    searchParams.set("limit", options.limit.toString());
  if (typeof options.offset === "number")
    searchParams.set("offset", options.offset.toString());

  const response = await fetch(
    `${urls.spotify.api.recommendations}?${searchParams.toString()}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return (await response.json()) as TSpotifyResponseWithError<{
    tracks: ISpotifyTrack[];
  }>;
}
