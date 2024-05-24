import { GetOneSeries, GetSeries, Rate } from "@/@types";
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
      name: true,
      id: true,
      seasonNumber: true,
      overview: true,
      airDate: true,
      episodeCount: true,
    },
  },
  ratings: true,
  userIds: true,
};

class Series {
  constructor(
    private readonly series: PrismaClient["series"],
    private readonly ratedSeries: PrismaClient["rating"]
  ) {}

  public async getSeries(
    offset: number,
    limit: number,
    userId: string
  ): Promise<GetSeries> {
    const count = await this.series.count();
    const series = await this.series.findMany({
      skip: offset,
      take: limit,
      select: seriesSelectOptions,
    });
    return {
      series: series.map((series) => ({
        ...series,
        bookmarked: series.userIds.some((id) => id === userId),
        rating: null,
      })),
      count,
    };
  }
  public async getOneSeries(id: string, userId: string): Promise<GetOneSeries> {
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

  public async bookmark(id: string, userId: string): Promise<GetOneSeries> {
    const series = await this.series.update({
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
    return {
      ...series,
      rating: null,
      bookmarked: true,
    };
  }

  public async removeBookmark(
    id: string,
    userId: string
  ): Promise<GetOneSeries> {
    const series = await this.series.update({
      where: { id },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
      select: seriesSelectOptions,
    });
    return {
      ...series,
      rating: null,
      bookmarked: false,
    };
  }

  public async getBookmarkedSeries(userId: string): Promise<GetOneSeries[]> {
    const series = await this.series.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: seriesSelectOptions,
    });

    return series.map((series) => ({
      ...series,
      bookmarked: true,
      rating: null,
    }));
  }

  public async getRatedSeries(userId: string): Promise<GetOneSeries[]> {
    const ratedSeries = await this.series.findMany({
      where: {
        ratings: {
          some: {
            userId,
          },
        },
      },
      select: seriesSelectOptions,
    });
    const series = ratedSeries.map((s) => ({
      ...s,
      rating: null,
      bookmarked: s.userIds.some((id) => id === userId),
    }));
    return series;
  }

  public async rateSeries(rateSeriesOptions: Rate): Promise<GetOneSeries> {
    return prisma.$transaction(
      async (tx) => {
        const series = await this.series.update({
          data: {
            ratings: {
              create: {
                rating: rateSeriesOptions.rating,
                userId: rateSeriesOptions.userId,
              },
            },
          },
          where: {
            id: rateSeriesOptions.showId,
          },
          select: seriesSelectOptions,
        });
        const ratings = series.ratings.map((rating) => rating.rating);
        await this.updateAverageRating(series.id, ratings);
        return {
          ...series,
          rating: rateSeriesOptions.rating,
          bookmarked: series.userIds.some(
            (id) => id === rateSeriesOptions.userId
          ),
        };
      },
      { timeout: 5000 }
    );
  }

  public async updateRating(rateSeriesOptions: Rate): Promise<GetOneSeries> {
    return prisma.$transaction(async (tx) => {
      const series = await this.series.update({
        where: {
          id: rateSeriesOptions.showId,
        },
        data: {
          ratings: {
            update: {
              where: {
                id: rateSeriesOptions.ratingId,
              },
              data: {
                rating: rateSeriesOptions.rating,
              },
            },
          },
        },
        select: seriesSelectOptions,
      });
      const ratings = series.ratings.map((rating) => rating.rating);
      await this.updateAverageRating(rateSeriesOptions.showId, ratings);
      return {
        ...series,
        bookmarked: series.userIds.some(
          (id) => id === rateSeriesOptions.userId
        ),
        rating: rateSeriesOptions.rating,
      };
    });
  }

  public async deleteRating(
    seriesId: string,
    ratingId: string,
    userId: string
  ): Promise<GetOneSeries> {
    return prisma.$transaction(
      async (tx) => {
        const ratedSeries = await this.series.update({
          where: {
            id: seriesId,
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
          select: seriesSelectOptions,
        });
        const ratings = ratedSeries.ratings.map((rating) => rating.rating);
        await this.updateAverageRating(seriesId, ratings);
        return {
          ...ratedSeries,
          rating: null,
          bookmarked: ratedSeries.userIds.some((id) => id === userId),
        };
      },
      { maxWait: 5000 }
    );
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

  private async updateAverageRating(
    seriesId: string,
    ratings: number[]
  ): Promise<GetOneSeries | null> {
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const series = await this.series.update({
      where: {
        id: seriesId,
      },
      data: {
        averageRating: averageRating ? averageRating : 0,
      },
      select: seriesSelectOptions,
    });
    return {
      ...series,
      rating: null,
      bookmarked: null,
    };
  }

  private async getRating(
    seriesId: string,
    userId: string
  ): Promise<number | null> {
    const rating = await this.ratedSeries.findFirst({
      where: { userId, seriesId },
    });
    return rating ? rating.rating : null;
  }
}

const series = new Series(prisma.series, prisma.rating);
export default series;
