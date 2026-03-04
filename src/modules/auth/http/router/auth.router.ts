import { Router } from "express";
import AuthController from "../controller/AuthController";
import { authMiddleware } from "../../../../shared/middlewares/AuthMiddleware";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login)

authRouter.use(authMiddleware);
authRouter.get("/me", authController.me);

authRouter.post("/logout", authController.logout);

export default authRouter;