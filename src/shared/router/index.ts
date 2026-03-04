import { Router } from "express";
import usersRouter from "../../modules/users/http/router/users.routes";
import authRouter from "../../modules/auth/http/router/auth.router";

const routes: Router = Router();

routes.use("/users", usersRouter);
routes.use("/auth", authRouter);

export default routes;
