import { Router } from "express";
import AuthController from "../controller/AuthController";
import { authMiddleware } from "../../../../shared/middlewares/AuthMiddleware";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post("/login", (req, res) => authController.login(req, res))

authRouter.use(authMiddleware);
authRouter.get("/me", (req, res) => authController.me(req, res));

authRouter.post("/logout", (req, res) => authController.logout(req, res));

export default authRouter;