import { Router } from "express";
import UserController from "../controller/UserController";
import { validateBody } from "../../../../shared/middlewares/ZodValidation";
import { createUserSchema } from "../../dto/CreateUserDTO";
import { updateUserSchema } from "../../dto/UpdateUserDTO";


const usersRouter = Router();
const userController = new UserController();

usersRouter.post("/", validateBody(createUserSchema), userController.create);
usersRouter.get("/", userController.list);
usersRouter.get("/:id", userController.getById);
usersRouter.put("/:id", validateBody(updateUserSchema), userController.update);
usersRouter.delete("/:id", userController.delete);

export default usersRouter;