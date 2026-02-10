import "reflect-metadata";
import { container } from "tsyringe";
import UserRepository from "../../../modules/repository/UserRepository";
import IUserRepository from "../../../modules/repository/IUserRepository";
import { PrismaClient } from "../../../generated/prisma/client";

container.registerInstance("PrismaClient", PrismaClient);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
