import { Rate } from "@/@types";
import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";
import addIsBookmarkedAndRatingData from "@utils/addIsBookmarkedAndRatingData";

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
  productionCompanies: {
    select: { name: true, id: true, originCountry: true },
  },
  releaseDate: true,
  productionCountries: { select: { name: true, id: true, iso_3166: true } },
  ratings: { select: { id: true, rating: true, userId: true } },
  revenue: true,
  runtime: true,
  status: true,
  userIds: true,
};

class Movie {
  constructor(
    private readonly movie: PrismaClient["movie"],
    private readonly ratedMovie: PrismaClient["movieRating"]
  ) {}

  public async getMovies(offset: number, limit: number) {
    const count = await this.movie.count();
    const movies = await this.movie.findMany({
      skip: offset,
      take: limit,
      select: movieSelectOptions,
    });

    return {
      movies,
      count,
    };
  }
  public async getMovie(id: string, userId: string) {
    const movies = await this.movie.findUnique({
      where: { id },
      select: movieSelectOptions,
    });
    const rating = await this.getRating(id, userId);
    const bookmarked = movies?.userIds.some((id) => id === userId);
    return {
      ...movies,
      rating,
      bookmarked,
    };
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

  public async rateMovie(rateMovieOptions: Rate) {
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
              id: rateMovieOptions.showId,
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

      if (ratedMovie.movie.ratings && ratedMovie.movie?.ratings.length >= 0) {
        let averageRating = 0;
        for (let i = 0; i < ratedMovie.movie.ratings.length; i++) {
          averageRating += ratedMovie.movie.ratings[i].rating;
        }
        averageRating = averageRating / ratedMovie.movie.ratings.length;
        ratedMovie = await tx.movie.update({
          where: {
            id: rateMovieOptions.showId,
          },
          data: {
            averageRating,
          },
          select: movieSelectOptions,
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
      },
    });
  }

  private async getRating(movieId: string, userId: string) {
    const rating = await this.ratedMovie.findMany({
      where: {
        movieId,
        userId,
      },
    });
    if (rating.length === 0) {
      return null;
    }
    return rating[0].rating;
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

const movie = new Movie(prisma.movie, prisma.movieRating);
export default movie;
