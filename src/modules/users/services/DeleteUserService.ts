import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
export default class DeleteUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}
