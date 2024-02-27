import express from "express";
import helmet from "helmet";
import authRouter from "@routes/auth/authRoutes";
import showRouter from "@routes/show/showRoutes";
import errorHandler from "@middlewares/error/errorHandler";
import { AppEror } from "@utils/Error/AppError";

const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/v1", authRouter, showRouter);
app.all("*", (req, res, next) => {
  next(new AppEror("Route not found", 404));
});
app.use(errorHandler);

export default app;
