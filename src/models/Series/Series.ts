import { Rate } from "@/@types";
import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";
import addIsBookmarkedAndRatingData from "@utils/addIsBookmarkedAndRatingData";

export const seriesSelectOptions = {
  averageRating: true,
  id: true,
  name: true,
  poster: true,
  genres: { select: { name: true, id: true } },
  creators: { select: { name: true, id: true } },
  firstAirDate: true,
  lastAirDate: true,
  numberOfEpisodes: true,
  numberOfSeasons: true,
  overview: true,
  status: true,
  seasons: {
    select: {
      id: true,
      seasonNumber: true,
      episodeCount: true,
      airDate: true,
      overview: true,
      name: true,
    },
  },
  ratings: true,
  userIds: true,
};

class Series {
  constructor(
    private readonly series: PrismaClient["series"],
    private readonly ratedSeries: PrismaClient["seriesRating"]
  ) {}

  public async getSeries(offset: number, limit: number) {
    const count = await this.series.count();
    const series = await this.series.findMany({
      skip: offset,
      take: limit,
      select: seriesSelectOptions,
    });
    return {
      series,
      count,
    };
  }
  public async getOneSeries(id: string, userId: string) {
    const series = await this.series.findUniqueOrThrow({
      where: { id },
      select: seriesSelectOptions,
    });
    const rating = await this.getRating(id, userId);
    const bookmarked = series?.userIds.some((id) => id === userId);
    return {
      ...series,
      rating,
      bookmarked,
    };
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
      select: seriesSelectOptions,
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

  public async getBookmarkedSeries(userId: string) {
    return await this.series.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: seriesSelectOptions,
    });
  }

  public async rateSeries(rateSeriesOptions: Rate) {
    return prisma.$transaction(
      async (tx) => {
        let ratedSeries;
        ratedSeries = await tx.seriesRating.upsert({
          where: {
            id: rateSeriesOptions.ratingId || "65da6f24e4bfb092f708b744",
          },
          update: {
            rating: rateSeriesOptions.rating,
          },
          create: {
            rating: rateSeriesOptions.rating,
            series: {
              connect: {
                id: rateSeriesOptions.showId,
              },
            },
            user: {
              connect: {
                id: rateSeriesOptions.userId,
              },
            },
          },
          select: {
            series: {
              select: seriesSelectOptions,
            },
          },
        });
        if (
          ratedSeries.series?.ratings &&
          ratedSeries.series?.ratings.length >= 0
        ) {
          let averageRating = 0;
          for (let i = 0; i < ratedSeries.series.ratings.length; i++) {
            averageRating += ratedSeries.series.ratings[i].rating;
          }
          averageRating = averageRating / ratedSeries.series.ratings.length;

          ratedSeries = await tx.series.update({
            where: {
              id: rateSeriesOptions.showId,
            },
            data: {
              averageRating,
            },
          });
        }

        return ratedSeries;
      },
      { timeout: 10000 }
    );
  }

  public async getRatedSeries(userId: string) {
    const ratedSeries = await this.ratedSeries.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        series: {
          select: seriesSelectOptions,
        },
      },
    });
    return ratedSeries.map((series) => series.series);
  }
  private async getRating(seriesId: string, userId: string) {
    const rating = await this.ratedSeries.findMany({
      where: {
        seriesId,
        userId,
      },
    });
    if (rating.length === 0) {
      return null;
    }
    return rating[0].rating;
  }

  public async isRatedBefore(seriesId: string, userId: string) {
    return await this.ratedSeries.findFirst({
      where: {
        series: {
          id: seriesId,
        },
        userId,
      },
    });
  }
}

const series = new Series(prisma.series, prisma.seriesRating);
export default series;
