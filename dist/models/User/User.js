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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma"));
const PasswordManager_1 = __importDefault(require("../../utils/bcrypt/PasswordManager"));
const AppError_1 = require("../../utils/Error/AppError");
const _types_1 = require("../../@types");
const BadRequestError_1 = __importDefault(require("../../utils/Error/BadRequestError"));
class User {
    constructor(user) {
        this.user = user;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield this.checkUserExists(email);
            if (!isUserExist)
                throw new AppError_1.AppEror("User not found", _types_1.StatusCodes.NOT_FOUND);
            const user = yield this.user.findUniqueOrThrow({ where: { email } });
            yield PasswordManager_1.default.compare(password, user.password);
            return user;
        });
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.checkUserExists(email);
            if (userExist)
                throw new BadRequestError_1.default("User already exists");
            return yield this.user.create({
                data: {
                    email,
                    password: yield PasswordManager_1.default.hash(password),
                },
            });
        });
    }
    checkUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.user.findUnique({ where: { email } });
            if (user) {
                return true;
            }
            return false;
        });
    }
}
const user = new User(prisma_1.default.user);
exports.default = user;
//# sourceMappingURL=User.js.map