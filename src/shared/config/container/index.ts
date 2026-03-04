import "reflect-metadata";
import { container } from "tsyringe";
import { prismaClient } from "../prisma/client";
import IUserRepository from "../../../modules/users/repository/IUserRepository";
import UserRepository from "../../../modules/users/repository/UserRepository";

container.registerInstance("PrismaClient", prismaClient);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
