"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailLoginValidation = void 0;
const express_validator_1 = require("express-validator");
const emailLoginValidation = () => (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is required",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email is not valid",
            bail: true,
        },
        escape: true,
    },
    password: {
        in: ["body"],
        escape: true,
        notEmpty: {
            errorMessage: "Password is required",
            bail: true,
        },
    },
});
exports.emailLoginValidation = emailLoginValidation;
//# sourceMappingURL=emailLoginValidation.js.map