import { ISpotifyImage } from "./other";
import { ISpotifyPlaylistTrack } from "./track";

export interface ISpotifyPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: ISpotifyImage[];
  name: string;
  owner: {
    external_urls: { spotify: string };
    followers: { href: string; total: number };
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: ISpotifyPlaylistTrack[];
  };
  type: string;
  uri: string;
}

/* export interface ISpotifyPlaylistTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ISpotifyPlaylistTrack[];
} */
