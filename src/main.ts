import "reflect-metadata";
import express from "express";
import "./shared/config/container";
import routes from "./shared/router";
import { errorHandler } from "./shared/middlewares/ErrorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(errorHandler);

app.use(routes);

app.listen("3333", () => {
  console.log("Server running on port 3333");
});
