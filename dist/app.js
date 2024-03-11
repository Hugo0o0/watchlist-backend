"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/show/movieRoutes/movieRoutes"));
const seriesRouter_1 = __importDefault(require("./routes/show/seriesRoutes/seriesRouter"));
const searchRoutes_1 = __importDefault(require("./routes/show/searchRoutes/searchRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/error/errorHandler"));
const AppError_1 = require("./utils/Error/AppError");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", authRoutes_1.default, movieRoutes_1.default, seriesRouter_1.default, searchRoutes_1.default);
app.all("*", (req, res, next) => {
    next(new AppError_1.AppEror("Route not found", 404));
});
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map