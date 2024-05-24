import {
  Creator,
  Genre,
  ProductionCompany,
  ProductionCountry,
  Season,
} from "@/@types";
import { Client, ClientOptions } from "@elastic/elasticsearch";
const getSearchShowQuery = (query: string) => ({
  size: 50,
  query: {
    bool: {
      should: [
        {
          match: {
            title: {
              query,
              boost: 3,
            },
          },
        },
        {
          match: {
            name: {
              query,
              boost: 2.9,
            },
          },
        },
        {
          nested: {
            path: "genres",
            ignore_unmapped: true,
            query: {
              match: {
                "genres.name": {
                  query,
                  boost: 2,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "productionCountries",
            ignore_unmapped: true,
            query: {
              match: {
                "productionCountries.name": {
                  query,
                  boost: 1.5,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "creators",
            ignore_unmapped: true,
            query: {
              match: {
                "creators.name": {
                  query,
                  boost: 1.5,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "productionCompanies",
            ignore_unmapped: true,
            query: {
              match: {
                "productionCompanies.name": {
                  query,
                  boost: 1.3,
                },
              },
            },
          },
        },
        {
          match: {
            status: {
              query,
              boost: 1,
            },
          },
        },
        {
          nested: {
            path: "seasons",
            ignore_unmapped: true,
            query: {
              match: {
                "seasons.name": {
                  query,
                  boost: 0.5,
                },
              },
            },
          },
        },
      ],
      minimum_should_match: 1,
    },
  },
});

const getSearchMovieQuery = (query: string) => ({
  size: 50,
  query: {
    bool: {
      should: [
        {
          match: {
            title: {
              query: query,
              boost: 3,
            },
          },
        },
        {
          nested: {
            path: "genres",
            ignore_unmapped: true,
            query: {
              match: {
                "genres.name": {
                  query: query,
                  boost: 2,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "productionCountries",
            ignore_unmapped: true,
            query: {
              match: {
                "productionCountries.name": {
                  query: query,
                  boost: 1.5,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "productionCompanies",
            ignore_unmapped: true,
            query: {
              match: {
                "productionCompanies.name": {
                  query: query,
                  boost: 1,
                },
              },
            },
          },
        },
      ],
      minimum_should_match: 1,
    },
  },
});

const getSearchSeriesQuery = (query: string) => ({
  size: 50,
  query: {
    bool: {
      should: [
        {
          match: {
            name: {
              query,
              boost: 3,
            },
          },
        },
        {
          nested: {
            path: "genres",
            ignore_unmapped: true,
            query: {
              match: {
                "genres.name": {
                  query,
                  boost: 2,
                },
              },
            },
          },
        },
        {
          nested: {
            path: "creators",
            ignore_unmapped: true,
            query: {
              match: {
                "creators.name": {
                  query,
                  boost: 1.5,
                },
              },
            },
          },
        },
        {
          match: {
            status: {
              query,
              boost: 1,
            },
          },
        },
        {
          nested: {
            path: "seasons",
            ignore_unmapped: true,
            query: {
              match: {
                "seasons.name": {
                  query,
                  boost: 0.5,
                },
              },
            },
          },
        },
      ],
      minimum_should_match: 1,
    },
  },
});

interface SearchShow {
  id: string;
  title?: string;
  name?: string;
  genres: Genre[];
  poster: {
    large: string;
    medium: string;
    small: string;
  };
  productionCompanies?: ProductionCompany[];
  productionCountries?: ProductionCountry[];
  firstAirDate?: Date;
  lastAirDate?: Date;
  releaseDate?: Date;
  creators?: Creator[];
  status: string;
  seasons?: Season[];
}

interface SearchMovie {
  id: string;
  genres: Genre[];
  imdbId: string;
  poster: {
    large: string;
    medium: string;
    small: string;
  };
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  status: string;
  title: string;
}

interface SearchSeries {
  id: string;
  name: string;
  status: string;
  poster: {
    large: string;
    medium: string;
    small: string;
  };
  firstAirDate: Date;
  lastAirDate: Date;
  genres: Genre[];
  creators: Creator[];
  seasons: Season[];
}

class Search extends Client {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  public async searchShow(query: string): Promise<SearchShow[]> {
    const data = await this.search({
      body: getSearchShowQuery(query),
    });
    return data.body.hits.hits.map((hit: any) => hit._source);
  }

  public async searchMovie(query: string): Promise<SearchMovie[]> {
    const data = await this.search({
      index: "movies",
      body: getSearchMovieQuery(query),
    });
    return data.body.hits.hits.map((hit: any) => hit._source);
  }

  public async searchSeries(query: string): Promise<SearchSeries[]> {
    const data = await this.search({
      index: "series",
      body: getSearchSeriesQuery(query),
    });
    return data.body.hits.hits.map((hit: any) => hit._source);
  }
}

const elastic = new Search({
  node: "https://search-watchlist-5cus3kplsjef2hlauhihtg4aji.aos.eu-north-1.on.aws",
  auth: {
    username: process.env.ELASTIC_USER || "",
    password: process.env.ELASTIC_PASSWORD || "",
  },
});

export default elastic;
