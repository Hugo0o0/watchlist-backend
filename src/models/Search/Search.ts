import { Client, ClientOptions } from "@elastic/elasticsearch";
import path from "path";
import fs from "fs";

const getSearchShowQuery = (query: string) => ({
  size: 50,
  query: {
    bool: {
      should: [
        {
          multi_match: {
            query: query,
            fields: ["name", "title", "status"],
          },
        },
        {
          nested: {
            path: "productionCompanies",
            query: {
              match: {
                "productionCompanies.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "creators",
            query: {
              match: {
                "creators.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "genres",
            query: {
              match: {
                "genres.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "productionCountries",
            query: {
              match: {
                "productionCountries.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
      ],
    },
  },
});

const getSearchMovieQuery = (query: string) => ({
  index: "movies",
  size: 50,
  query: {
    bool: {
      should: [
        {
          multi_match: {
            query: query,
            fields: ["title", "status"],
          },
        },
        {
          nested: {
            path: "productionCompanies",
            query: {
              match: {
                "productionCompanies.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "genres",
            query: {
              match: {
                "genres.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "productionCountries",
            query: {
              match: {
                "productionCountries.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
      ],
    },
  },
});

const getSearchSeriesQuery = (query: string) => ({
  index: "series",
  size: 50,
  query: {
    bool: {
      should: [
        {
          multi_match: {
            query: query,
            fields: ["name", "status"],
          },
        },
        {
          nested: {
            path: "creators",
            query: {
              match: {
                "creators.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
        {
          nested: {
            path: "genres",
            query: {
              match: {
                "genres.name": query,
              },
            },
            ignore_unmapped: true,
          },
        },
      ],
    },
  },
});

class Search extends Client {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  public async searchShow(query: string) {
    return (await this.search(getSearchShowQuery(query))).hits.hits.map(
      (show) => show._source
    );
  }

  public async searchMovie(query: string) {
    return (await this.search(getSearchMovieQuery(query))).hits.hits.map(
      (movie) => movie._source
    );
  }

  public async searchSeries(query: string) {
    return (await this.search(getSearchSeriesQuery(query))).hits.hits.map(
      (series) => series._source
    );
  }
}
const certPath = path.resolve(__dirname, "../../../http_ca.crt");

const elastic = new Search({
  node: "https://localhost:9200",
  auth: {
    username: process.env.ELASTIC_USER || "",
    password: process.env.ELASTIC_PASSWORD || "",
  },
  tls: {
    cert: fs.readFileSync(certPath),
    rejectUnauthorized: false,
  },
});

export default elastic;
