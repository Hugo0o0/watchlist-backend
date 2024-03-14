const addIsBookmarkedAndRatingData = (shows: any[], userId: string) =>
  shows.map((show) => {
    const isBookmarked = show.userIds.includes(userId);
    const rating = show.ratings.find((rate: any) => rate.userId === userId);
    delete show.userIds;
    delete show.ratings;
    return {
      ...show,
      isBookmarked,
      rating: rating ? rating.rating : null,
    };
  });

export default addIsBookmarkedAndRatingData;
