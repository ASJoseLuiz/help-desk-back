import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../services/CreateUserService";
import GetUserService from "../../services/GetUserService";
import ListUsersService from "../../services/ListUsersService";
import UpdateUserService from "../../services/UpdateUserService";
import DeleteUserService from "../../services/DeleteUserService";
import { CreateUserDTO } from "../../dto/CreateUserDTO";
import { UpdateUserDTO } from "../../dto/UpdateUserDTO";


export default class UserController {
  constructor() {}

  public async create(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;

    const data: CreateUserDTO = { name, email, password, role };
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(data);

    res.status(201).json(user);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const getUserService = container.resolve(GetUserService);
    const user = await getUserService.execute(id as string);

    res.json(user);
  }

  async list(_req: Request, res: Response): Promise<void> {
    const listUsersService = container.resolve(ListUsersService);
    const users = await listUsersService.execute();

    res.json(users);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const data: UpdateUserDTO = {
      name,
      email,
      password,
      role,
    };

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute(id as string, data);

    res.json(user);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deleteUserService = container.resolve(DeleteUserService);
    await deleteUserService.execute(id as string);

    res.status(204);
  }
}
