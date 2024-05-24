import {
  Rate,
  GetMovies,
  GetMovie,
  GetBookmarkedMovies,
  GetRatedMovies,
  Movie as MovieType,
} from "@/@types";
import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";

const movieSelectOptions = {
  genres: { select: { name: true, id: true } },
  averageRating: true,
  title: true,
  id: true,
  budget: true,
  homepage: true,
  imdbId: true,
  overview: true,
  poster: true,
  productionCompanies: { select: { name: true, id: true } },
  releaseDate: true,
  productionCountries: { select: { name: true, id: true, iso_3166: true } },
  ratings: true,
  revenue: true,
  runtime: true,
  status: true,
  userIds: true,
};

class Movie {
  constructor(
    private readonly movie: PrismaClient["movie"],
    private readonly ratedMovie: PrismaClient["rating"]
  ) {}

  public async getMovies(
    offset: number,
    limit: number,
    userId: string
  ): Promise<GetMovies> {
    const count = await this.movie.count();
    const movies = await this.movie.findMany({
      skip: offset,
      take: limit,
      select: movieSelectOptions,
    });
    return {
      movies: movies.map((movie) => ({
        ...movie,
        bookmarked: movie.userIds.some((id) => id === userId),
        rating: null,
      })),
      count,
    };
  }
  public async getMovie(id: string, userId: string): Promise<GetMovie> {
    const movies = await this.movie.findUniqueOrThrow({
      where: { id },
      select: movieSelectOptions,
    });
    const rating = await this.getRating(id, userId);
    const bookmarked = movies?.userIds.some((id) => id === userId);
    return {
      ...movies,
      bookmarked,
      rating,
    };
  }
  public async bookmark(id: string, userId: string): Promise<MovieType> {
    const movie = await this.movie.update({
      where: { id },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      select: movieSelectOptions,
    });
    return {
      ...movie,
      rating: null,
      bookmarked: true,
    };
  }
  public async removeBookmark(id: string, userId: string): Promise<MovieType> {
    const movie = await this.movie.update({
      where: { id },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
      select: movieSelectOptions,
    });
    return {
      ...movie,
      rating: null,
      bookmarked: false,
    };
  }
  public async getBookmarkedMovies(
    userId: string
  ): Promise<GetBookmarkedMovies[]> {
    const movie = await this.movie.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: movieSelectOptions,
    });
    return movie.map((movie) => ({
      ...movie,
      rating: null,
      bookmarked: true,
    }));
  }
  public async getRatedMovies(userId: string): Promise<GetRatedMovies[]> {
    const ratedMovies = await this.movie.findMany({
      where: {
        ratings: {
          some: {
            userId,
          },
        },
      },
      select: movieSelectOptions,
    });

    const movies = ratedMovies.map((movie) => ({
      ...movie,
      rating: null,
      bookmarked: movie.userIds.some((id) => id === userId),
    }));
    return movies;
  }
  public async rateMovie(rateMovieOptions: Rate): Promise<MovieType> {
    const movie = await this.movie.update({
      data: {
        ratings: {
          create: {
            rating: rateMovieOptions.rating,
            userId: rateMovieOptions.userId,
          },
        },
      },
      where: {
        id: rateMovieOptions.showId,
      },
      select: movieSelectOptions,
    });
    const ratings = movie.ratings.map((rating) => rating.rating);
    await this.updateAverageRating(rateMovieOptions.showId, ratings);
    return {
      ...movie,
      bookmarked: movie.userIds.some((id) => id === rateMovieOptions.userId),
      rating: rateMovieOptions.rating,
    };
  }
  public async updateRating(rateMovieOptions: Rate): Promise<MovieType> {
    const movie = await this.movie.update({
      where: {
        id: rateMovieOptions.showId,
      },
      data: {
        ratings: {
          update: {
            where: {
              id: rateMovieOptions.ratingId,
            },
            data: {
              rating: rateMovieOptions.rating,
            },
          },
        },
      },
      select: movieSelectOptions,
    });
    const ratings = movie.ratings.map((rating) => rating.rating);
    await this.updateAverageRating(rateMovieOptions.showId, ratings);
    return {
      ...movie,
      bookmarked: movie.userIds.some((id) => id === rateMovieOptions.userId),
      rating: rateMovieOptions.rating,
    };
  }
  public async deleteRating(
    movieId: string,
    ratingId: string,
    userId: string
  ): Promise<MovieType> {
    const ratedMovie = await this.movie.update({
      where: {
        id: movieId,
      },
      data: {
        ratings: {
          delete: {
            id: ratingId,
            AND: {
              userId,
            },
          },
        },
      },
      select: movieSelectOptions,
    });
    const ratings = ratedMovie.ratings.map((rating) => rating.rating);
    await this.updateAverageRating(movieId, ratings);
    return {
      ...ratedMovie,
      rating: null,
      bookmarked: ratedMovie.userIds.some((id) => id === userId),
    };
  }
  public async updateAverageRating(
    movieId: string,
    ratings: number[]
  ): Promise<MovieType | null> {
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const movie = await this.movie.update({
      where: {
        id: movieId,
      },
      data: {
        averageRating: averageRating ? averageRating : 0,
      },
      select: movieSelectOptions,
    });
    return {
      ...movie,
      rating: null,
      bookmarked: null,
    };
  }
  private async getRating(
    movieId: string,
    userId: string
  ): Promise<number | null> {
    const rating = await this.ratedMovie.findFirst({
      where: { userId, movieId },
    });
    return rating ? rating.rating : null;
  }
  public async isRatedBefore(movieId: string, userId: string) {
    return await this.ratedMovie.findFirst({
      where: {
        movie: {
          id: movieId,
        },
        userId,
      },
    });
  }
}

const movie = new Movie(prisma.movie, prisma.rating);
export default movie;
