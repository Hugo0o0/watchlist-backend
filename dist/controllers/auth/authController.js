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
exports.emailRegister = exports.emailLogin = void 0;
const _types_1 = require("../../@types");
const TokenProcessor_1 = __importDefault(require("../../utils/jwt/TokenProcessor"));
const User_1 = __importDefault(require("../../models/User/User"));
const tryCatch_1 = __importDefault(require("../../utils/tryCatch"));
const validate_1 = __importDefault(require("../../utils/validation/validate"));
const sendSuccessResponse_1 = __importDefault(require("../../utils/sendSuccessResponse"));
const token = new TokenProcessor_1.default();
exports.emailLogin = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { email, id } = yield User_1.default.login(req.body.email, req.body.password);
    const jwt = token.generateToken({ email, id });
    (0, sendSuccessResponse_1.default)(res, { email, token: jwt });
}));
exports.emailRegister = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { email, id } = yield User_1.default.register(req.body.email, req.body.password);
    const jwt = token.generateToken({ email, id });
    (0, sendSuccessResponse_1.default)(res, { email, token: jwt }, _types_1.StatusCodes.CREATED);
}));
//# sourceMappingURL=authController.js.map