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
  constructor(private readonly movie: PrismaClient["movie"]) {}

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

  public async rateMovie(id: string, rating: number, userId: string) {
    return prisma.$transaction(async (tx) => {
      let ratedMovie;
      ratedMovie = await tx.movie.update({
        where: { id },
        data: {
          ratings: {
            create: {
              rating,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          },
        },
        select: movieSelectOptions,
      });

      if (ratedMovie.ratings.length > 10) {
        const averageRating =
          ratedMovie.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          ratedMovie.ratings.length;
        ratedMovie = await tx.movie.update({
          where: { id },
          data: {
            averageRating,
          },
        });
      }

      return ratedMovie;
    });
  }
}

const movie = new Movie(prisma.movie);
export default movie;
