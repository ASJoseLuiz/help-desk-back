import "reflect-metadata";
import { container } from "tsyringe";
import UserRepository from "../../../modules/repository/UserRepository";
import IUserRepository from "../../../modules/repository/IUserRepository";
import { prismaClient } from "../prisma/client";

container.registerInstance("PrismaClient", prismaClient);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
