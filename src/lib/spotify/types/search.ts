import { TSpotifyPagination } from "./other";
import { ISpotifyTrack } from "./track";

export interface ISpotifySearch {
  tracks?: TSpotifyPagination<ISpotifyTrack>;
}
