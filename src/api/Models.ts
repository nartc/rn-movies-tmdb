export type MovieEndpointsPath = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export enum MovieVideoType {
  Trailer = 'Trailer',
  Clip = 'Clip',
  BHS = 'Behind the Scenes',
  Teaser = 'Teaser'
}

export enum MovieVideoSite {
  Youtube = 'YouTube'
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface Result {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface Videos {
  results: Result[];
}

export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Images {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface Crew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Movie {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Movie {
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  videos: Videos;
  images: Images;
  credits: Credits;
  recommendations: {
    results: Movie[];
  };
}

export type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original'
export type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
export type PosterSizes = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';
export type StillSizes = 'w92' | 'w185' | 'w300' | 'original';

export interface ImageConfiguration {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: BackdropSizes[];
  logo_sizes: LogoSizes[];
  poster_sizes: PosterSizes[];
  profile_sizes: ProfileSizes[];
  still_sizes: StillSizes[];
}

export interface Configuration {
  images: ImageConfiguration;
  change_keys: string[];
}