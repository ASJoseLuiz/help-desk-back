import { Router } from "express";
import usersRouter from "../../modules/users/http/router/users.routes";
import authRouter from "../../modules/auth/http/router/auth.router";
import ticketRouter from "../../modules/tickets/http/router/tickets.routes";

const routes: Router = Router();

routes.use("/users", usersRouter);
routes.use("/auth", authRouter);
routes.use("/ticket", ticketRouter);

export default routes;
