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
