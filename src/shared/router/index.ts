import { Router } from "express";
import usersRouter from "../../modules/users/http/router/users.routes";

const routes: Router = Router();

routes.use("/users", usersRouter);

export default routes;
