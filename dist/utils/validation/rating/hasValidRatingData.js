"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = __importDefault(require("../../Error/BadRequestError"));
const express_validator_1 = require("express-validator");
const hasValidRatingData = () => (0, express_validator_1.checkSchema)({
    rating: {
        errorMessage: "Rating is required",
        isInt: {
            errorMessage: "Rating must be an integer",
            bail: true,
            options: {
                max: 10,
                min: 1,
            },
        },
    },
    ratingId: {
        optional: true,
        isString: {
            errorMessage: "Rating id must be a string",
            bail: true,
            if: (value) => {
                const matched = value.match(/^[0-9a-fA-F]{24}$/);
                if (!matched)
                    throw new BadRequestError_1.default("Invalid id format");
                return matched;
            },
        },
    },
});
exports.default = hasValidRatingData;
//# sourceMappingURL=hasValidRatingData.js.map