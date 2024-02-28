import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";

const seriesSelectOptions = {
  averageRating: true,
  id: true,
  creators: true,
  firstAirDate: true,
  genres: true,
  lastAirDate: true,
  name: true,
  numberOfEpisodes: true,
  numberOfSeasons: true,
  overview: true,
  poster: true,
  ratings: true,
  seasons: true,
  status: true,
};

class Series {
  constructor(
    private readonly series: PrismaClient["series"],
    private readonly ratedSeries: PrismaClient["seriesRating"]
  ) {}

  public async getSeries(offset: number, limit: number) {
    return await this.series.findMany({
      skip: offset,
      take: limit,
      select: seriesSelectOptions,
    });
  }
  public async getOneSeries(id: string) {
    return await this.series.findUnique({
      where: { id },
    });
  }

  public async bookmark(id: string, userId: string) {
    return await this.series.update({
      where: { id },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async removeBookmark(id: string, userId: string) {
    return await this.series.update({
      where: { id },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  public async getBookmarkedMovies(userId: string) {
    return await this.series.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  //   public async rateMovie(rateMovieOptions: RateMovie) {
  //     return prisma.$transaction(async (tx) => {
  //       let ratedMovie;
  //       ratedMovie = await tx.movieRating.upsert({
  //         where: {
  //           id: rateMovieOptions.ratingId || "65da6f24e4bfb092f708b744",
  //         },
  //         update: {
  //           rating: rateMovieOptions.rating,
  //         },
  //         create: {
  //           rating: rateMovieOptions.rating,
  //           movie: {
  //             connect: {
  //               id: rateMovieOptions.movieId,
  //             },
  //           },
  //           user: {
  //             connect: {
  //               id: rateMovieOptions.userId,
  //             },
  //           },
  //         },
  //         select: {
  //           movie: {},
  //         },
  //       });
  //       const movie = await this.getMovie(rateMovieOptions.movieId);
  //       if (movie?.ratings && movie?.ratings.length > 10) {
  //         const averageRating =
  //           movie.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
  //           movie.ratings.length;
  //         await tx.movie.update({
  //           where: {
  //             id: rateMovieOptions.movieId,
  //           },
  //           data: {
  //             averageRating,
  //           },
  //         });
  //       }

  //       return ratedMovie;
  //     });
  //   }

  //   public async getRatedMovies(userId: string) {
  //     return await this.ratedMovie.findMany({
  //       where: {
  //         user: {
  //           id: userId,
  //         },
  //       },
  //       include: {
  //         movie: {},
  //         user: true,
  //       },
  //     });
  //   }

  //   public async isRatedBefore(movieId: string, userId: string) {
  //     return await this.ratedMovie.findFirst({
  //       where: {
  //         seriesId,
  //         userId,
  //       },
  //     });
  //   }
}

const series = new Series(prisma.series, prisma.seriesRating);
export default series;
