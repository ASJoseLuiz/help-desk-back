import ListUserDTO from "../dto/ListUserDTO";
import IUserRepository from "../repository/IUserRepository";
import { inject, injectable } from "tsyringe";

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
        createdAt: user.createdAt.toISOString(),
      })),
      total: users.length,
    };
  }
}
