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
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../Error/AppError");
const _types_1 = require("../../@types");
class PasswordManager {
    compare(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordMatch = yield (0, bcrypt_1.compare)(password, hashedPassword);
            if (!passwordMatch)
                throw new AppError_1.AppEror("Invalid password", _types_1.StatusCodes.UNAUTHORIZED);
        });
    }
    hash(password, saltRounds) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(saltRounds || 10);
            return yield (0, bcrypt_1.hash)(password, salt);
        });
    }
}
exports.default = new PasswordManager();
//# sourceMappingURL=PasswordManager.js.map