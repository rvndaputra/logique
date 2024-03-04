export interface SearchVariables {
  term: string;
  limit?: number;
}

export interface SearchRoot {
  resultCount: number;
  results: TrackResult[];
}

export interface TrackResult {
  wrapperType: string;
  artistId?: number;
  collectionId?: number;
  artistName: string;
  collectionName?: string;
  collectionCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  collectionExplicitness: string;
  trackCount?: number;
  copyright?: string;
  country: string;
  currency: string;
  releaseDate: string;
  primaryGenreName: string;
  previewUrl: string;
  description?: string;
  kind?: string;
  trackId?: number;
  trackName?: string;
  trackCensoredName?: string;
  trackViewUrl?: string;
  artworkUrl30?: string;
  trackPrice?: number;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  contentAdvisoryRating?: string;
  isStreamable?: boolean;
  collectionArtistId?: number;
  collectionArtistViewUrl?: string;
  trackRentalPrice?: number;
  collectionHdPrice?: number;
  trackHdPrice?: number;
  trackHdRentalPrice?: number;
  shortDescription?: string;
  longDescription?: string;
  hasITunesExtras?: boolean;
}
