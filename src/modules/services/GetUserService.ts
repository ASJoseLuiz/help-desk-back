import GetUserDTO from "../dto/GetUserDTO";
import IUserRepository from "../repository/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<GetUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
