import { RateMovie } from "@/@types";
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
  productionCountries: { select: { name: true, id: true } },
  ratings: { select: { rating: true, id: true } },
  revenue: true,
  runtime: true,
  status: true,
};

class Movie {
  constructor(
    private readonly movie: PrismaClient["movie"],
    private readonly ratedMovie: PrismaClient["movieRating"]
  ) {}

  public async getMovies(offset: number, limit: number) {
    return await this.movie.findMany({
      skip: offset,
      take: limit,
      select: movieSelectOptions,
    });
  }
  public async getMovie(id: string) {
    return await this.movie.findUnique({
      where: { id },
      select: movieSelectOptions,
    });
  }

  public async bookmark(id: string, userId: string) {
    return await this.movie.update({
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
  }

  public async removeBookmark(id: string, userId: string) {
    return await this.movie.update({
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
  }

  public async getBookmarkedMovies(userId: string) {
    return await this.movie.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: movieSelectOptions,
    });
  }

  public async rateMovie(rateMovieOptions: RateMovie) {
    return prisma.$transaction(async (tx) => {
      let ratedMovie;
      ratedMovie = await tx.movieRating.upsert({
        where: {
          id: rateMovieOptions.ratingId || "65da6f24e4bfb092f708b744",
        },
        update: {
          rating: rateMovieOptions.rating,
        },
        create: {
          rating: rateMovieOptions.rating,
          movie: {
            connect: {
              id: rateMovieOptions.movieId,
            },
          },
          user: {
            connect: {
              id: rateMovieOptions.userId,
            },
          },
        },
        select: {
          movie: {
            select: movieSelectOptions,
          },
        },
      });
      const movie = await this.getMovie(rateMovieOptions.movieId);
      if (movie?.ratings && movie?.ratings.length > 10) {
        const averageRating =
          movie.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          movie.ratings.length;
        await tx.movie.update({
          where: {
            id: rateMovieOptions.movieId,
          },
          data: {
            averageRating,
          },
        });
      }

      return ratedMovie;
    });
  }

  public async getRatedMovies(userId: string) {
    return await this.ratedMovie.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        movie: {
          select: movieSelectOptions,
        },
        user: true,
      },
    });
  }

  public async isRatedBefore(movieId: string, userId: string) {
    return await this.ratedMovie.findFirst({
      where: {
        movieId,
        userId,
      },
    });
  }
}

const movie = new Movie(prisma.movie, prisma.movieRating);
export default movie;
