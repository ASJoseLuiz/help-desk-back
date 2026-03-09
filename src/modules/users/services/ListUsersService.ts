import ListUserDTO from "../dto/ListUserDTO";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class ListUsersService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<ListUserDTO> {
    const users = await this.userRepository.findAll();

    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      })),
      total: users.length,
    };
  }
}
