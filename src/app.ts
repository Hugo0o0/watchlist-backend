import express from "express";
import helmet from "helmet";
import authRouter from "@routes/auth/authRoutes";
import movieRouter from "@routes/show/movieRoutes/movieRoutes";
import seriesRouter from "@routes/show/seriesRoutes/seriesRouter";
import searchRouter from "@routes/show/searchRoutes/searchRoutes";
import errorHandler from "@middlewares/error/errorHandler";
import { AppEror } from "@utils/Error/AppError";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(helmet());
app.use(express.json());
app.use("/api/v1", authRouter, movieRouter, seriesRouter, searchRouter);
app.all("*", (req, res, next) => {
  next(new AppEror("Route not found", 404));
});
app.use(errorHandler);

export default app;
