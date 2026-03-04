import GetUserDTO from "../dto/GetUserDTO";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
export default class GetUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<GetUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
