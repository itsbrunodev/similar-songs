import { ILastFmTrack } from "./track";

export interface ILastFmSimilarTracks {
  similartracks: {
    track: ILastFmTrack[];
  };
}
