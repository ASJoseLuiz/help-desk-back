import { inject, injectable } from "tsyringe";
import CreateUserDTO from "../dto/CreateUserDTO";
import UpdateUserDTO from "../dto/UpdateUserDTO";
import IUserRepository from "./IUserRepository";
import { PrismaClient, User } from "../../generated/prisma/client";

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(@inject("PrismaClient") private prisma: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hash_password: data.password,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.hash_password = data.password;

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
