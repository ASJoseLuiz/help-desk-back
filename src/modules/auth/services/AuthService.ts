import { inject, injectable } from "tsyringe";
import IUserRepository from "../../users/repository/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDTO from "../dto/LoginDTO";


interface UserPayload {
  sub: string;
  email: string;
}

@injectable()
export class AuthService {
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository,
      ) {}
  public async execute(data: LoginDTO): Promise<string | null> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError(`Usuário de email ${data.email} não encontrado`);
    }

    const passwordIsValid = compareSync(data.password, user.hash_password);

    if (!passwordIsValid) {
      throw new AppError("Não autorizado. Senha ou email inválidos.");
    }

    const payload: UserPayload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: "1h",
    });

    return token;
  }
}
