import { User } from "../../../generated/prisma/client";
import CreateUserDTO from "../dto/CreateUserDTO";
import UpdateUserDTO from "../dto/UpdateUserDTO";


export default interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}
