"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const paginationQueriesValidation = () => (0, express_validator_1.checkSchema)({
    page: {
        optional: true,
        isInt: {
            errorMessage: "page must be an integer",
            bail: true,
            options: { min: 1 },
        },
    },
    limit: {
        optional: true,
        isInt: {
            errorMessage: "Limit can only be an integer and must be between 1 and 50",
            bail: true,
            options: { min: 1, max: 50 },
        },
    },
});
exports.default = paginationQueriesValidation;
//# sourceMappingURL=pagination.js.map