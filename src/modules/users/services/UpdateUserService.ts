import GetUserDTO from "../dto/GetUserDTO";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";
import { UpdateUserDTO } from "../dto/UpdateUserDTO";

@injectable()
export default class UpdateUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<GetUserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (data.email && data.email !== user.email) {
      const userExists = await this.userRepository.findByEmail(data.email);
      if (userExists) {
        throw new AppError("Email já está em uso");
      }
    }

    const updatedUser = await this.userRepository.update(id, data);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt.toISOString(),
    };
  }
}
