import { Client, ClientOptions } from "@elastic/elasticsearch";
import path from "path";
import fs from "fs";

const searchFields = [
  "title",
  "name",
  "genres.name",
  "creators.name",
  "productionCountries.name",
  "productionCompanies.name",
  "seasons.name",
  "imdbId",
];

const getSearchShowQuery = (query: string) => ({
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

class Search extends Client {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  public async searchShow(query: string) {
    const searchResponse = (await this.search(getSearchShowQuery(query))).hits
      .hits;
    return searchResponse.map((show) => show._source);
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