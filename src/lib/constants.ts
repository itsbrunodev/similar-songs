import { AnimationProps } from "framer-motion";

export const FRAMER_FADE_IN_OUT: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.17 },
};

export const SPOTIFY_API_URL = "https://api.spotify.com/v1";
export const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api";

export const app = {
  name: "Similar Songs",
  description:
    "Find 50 AI-matched songs on Spotify that match the vibe of your favorites.",
} as const;

export const urls = {
  base: "https://similar-songs.itsbruno.dev",
  spotify: {
    api: {
      tracks: SPOTIFY_API_URL + "/tracks",
      search: SPOTIFY_API_URL + "/search",
      recommendations: SPOTIFY_API_URL + "/recommendations",
    },
    accounts: {
      token: SPOTIFY_ACCOUNTS_URL + "/token",
    },
  },
  song: "/song/[id]",
} as const;
