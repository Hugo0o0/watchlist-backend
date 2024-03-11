import { Rate } from "@/@types";
import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";

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
  public async getOneSeries(id: string) {
    return await this.series.findUnique({
      where: { id },
      select: seriesSelectOptions,
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
    return prisma.$transaction(async (tx) => {
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
      const series = await this.getOneSeries(rateSeriesOptions.showId);
      if (series?.ratings && series?.ratings.length >= 0) {
        const averageRating =
          series.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          series.ratings.length;
        await tx.series.update({
          where: {
            id: rateSeriesOptions.showId,
          },
          data: {
            averageRating,
          },
        });
      }

      return ratedSeries;
    });
  }

  public async getRatedSeries(userId: string) {
    return await this.ratedSeries.findMany({
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
