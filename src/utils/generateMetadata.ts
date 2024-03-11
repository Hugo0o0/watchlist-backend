import { MetaData, MetaDataResponse } from "@/@types";

const getNextPage = (
  page?: number,
  hasNextPage?: boolean | null
): number | null => {
  if (!page) return null;
  return hasNextPage ? page + 1 : null;
};

const getHasNextPage = (
  limit?: number,
  offset?: number,
  totalItems?: number
) => {
  if (!limit || offset === undefined || !totalItems) return null;
  return totalItems > offset + limit;
};

const getPrevPage = (page?: number, offset?: number): number | null => {
  if (!page || !offset) return null;
  const hasPrevPage = offset > 0;
  return hasPrevPage ? page - 1 : null;
};

const generateMetadata = (data?: MetaData): MetaDataResponse => {
  const hasNextPage = getHasNextPage(
    data?.limit,
    data?.offset,
    data?.totalItems
  );
  const nextPage = getNextPage(data?.page, hasNextPage);
  const prevPage = getPrevPage(data?.page, data?.offset);
  return {
    page: data?.page || 1,
    nextPage,
    prevPage,
    itemsPerPage: data?.limit || 1,
    hasNextPage: !!nextPage,
    hasPrevPage: !!prevPage,
  };
};

export default generateMetadata;
