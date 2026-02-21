import "reflect-metadata";
import express from "express";
import "./shared/config/container";
import routes from "./shared/router";
import { errorHandler } from "./shared/middlewares/ErrorHandler";

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use(routes);

app.listen("3333", () => {
  console.log("Server running on port 3333");
});
