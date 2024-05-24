import { Rating } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export enum StatusCodes {
  CONTINUE = 100,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum DefaultPaginationValues {
  PAGE = 1,
  LIMIT = 50,
}

export interface Rate {
  showId: string;
  userId: string;
  ratingId?: string;
  rating: number;
}

export interface MetaDataResponse {
  page?: number;
  nextPage: number | null;
  prevPage: number | null;
  itemsPerPage?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MetaData {
  page?: number;
  offset?: number;
  totalItems?: number;
  limit?: number;
}

export interface Genre {
  name: string;
  id: string;
}

export interface ProductionCompany {
  name: string;
  id: string;
}

export interface ProductionCountry {
  name: string;
  id: string;
}

export interface Movie {
  genres: Genre[];
  averageRating: number;
  title: string;
  id: string;
  budget: number;
  homepage: string;
  imdbId: string;
  overview: string;
  poster: JsonValue;
  productionCompanies: ProductionCompany[];
  releaseDate: Date;
  productionCountries: ProductionCountry[];
  ratings: Rating[];
  revenue: number;
  runtime: number;
  status: string;
  userIds: string[];
  bookmarked: boolean | null;
  rating: number | null;
}

export interface GetMovies {
  movies: Movie[];
  count: number;
}
export interface GetMovie extends Movie {}
export interface GetBookmarkedMovies extends Movie {}
export interface GetRatedMovies extends Movie {}

export interface Creator {
  name: string;
  id: string;
}
export interface Season {
  id: string;
  name: string;
  seasonNumber: number;
  overview: string | null;
  airDate: Date;
  episodeCount: number;
}
export interface Series {
  averageRating: number;
  id: string;
  name: string;
  poster:
    | {
        large: string;
        medium: string;
        small: string;
      }
    | JsonValue;
  genres: Genre[];
  creators: Creator[];
  firstAirDate: Date;
  lastAirDate: Date;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  overview: string;
  status: string;
  seasons: Season[];
  ratings: Rating[];
  userIds: string[];
  bookmarked: boolean | null;
  rating: number | null;
}

export interface GetSeries {
  series: Series[];
  count: number;
}

export interface GetOneSeries extends Series {}
