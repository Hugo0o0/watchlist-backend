"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = __importDefault(require("../../Error/BadRequestError"));
const express_validator_1 = require("express-validator");
const validateObjectId = () => (0, express_validator_1.param)("id").custom((input) => {
    const matched = input.match(/^[0-9a-fA-F]{24}$/);
    if (!matched)
        throw new BadRequestError_1.default("Invalid id format");
    return matched;
});
exports.default = validateObjectId;
//# sourceMappingURL=validateObjectId.js.map