import { Router } from "express";
import { container } from "tsyringe";
import UserController from "../controller/UserController";

const usersRouter = Router();

const userController = new UserController();

usersRouter.post("/", (req, res) => userController.create(req, res));
usersRouter.get("/", (req, res) => userController.list(req, res));
usersRouter.get("/:id", (req, res) => userController.getById(req, res));
usersRouter.put("/:id", (req, res) => userController.update(req, res));
usersRouter.delete("/:id", (req, res) => userController.delete(req, res));

export default usersRouter;
