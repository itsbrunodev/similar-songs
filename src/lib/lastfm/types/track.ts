export interface ILastFmTrackSimple {
  name: string;
  artist: string;
  url: string /* last.fm url */;
  listeners: string;
  mbid: string;
}

export interface ILastFmTrack extends Omit<ILastFmTrackSimple, "artist" | "listeners"> {
  match: number;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
}
