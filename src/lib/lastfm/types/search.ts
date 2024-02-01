import { ILastFmTrackSimple } from "./track";

export interface ILastFmSearchTrack {
  results: {
    /**
     * these strings can be converted to a number
     */
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    trackmatches: {
      track: ILastFmTrackSimple[];
    };
  };
}
