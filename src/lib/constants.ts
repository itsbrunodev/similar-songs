import { AnimationProps } from "framer-motion";

export const FRAMER_FADE_IN_OUT: AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.17 },
};

export const SPOTIFY_API_URL = "https://api.spotify.com/v1";
export const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api";

export const urls = {
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
  track: "/track/[id]",
} as const;
