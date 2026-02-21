import CreateUserDTO from "../dto/CreateUserDTO";
import GetUserDTO from "../dto/GetUserDTO";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<GetUserDTO> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await this.userRepository.create(data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
