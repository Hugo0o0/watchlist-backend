"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const getSearchShowQuery = (query) => ({
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
class Search extends elasticsearch_1.Client {
    constructor(opts) {
        super(opts);
    }
    searchShow(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResponse = (yield this.search(getSearchShowQuery(query))).hits
                .hits;
            return searchResponse.map((show) => show._source);
        });
    }
}
const elastic = new Search({
    node: "https://localhost:9200",
    auth: {
        username: process.env.ELASTIC_USER || "",
        password: process.env.ELASTIC_PASSWORD || "",
    },
});
exports.default = elastic;
//# sourceMappingURL=Search.js.map