import { inject, injectable } from "tsyringe";
import IUserRepository from "../repository/IUserRepository";

@injectable()
export default class DeleteUserService {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);
  }
}
