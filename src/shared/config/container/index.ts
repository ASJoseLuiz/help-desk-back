import "reflect-metadata";
import { container } from "tsyringe";
import { prismaClient } from "../prisma/client";
import IUserRepository from "../../../modules/users/repository/IUserRepository";
import UserRepository from "../../../modules/users/repository/UserRepository";
import TicketRepository from "../../../modules/tickets/repository/Repository";
import ITicketRepository from "../../../modules/tickets/repository/ITicketsRepository";

container.registerInstance("PrismaClient", prismaClient);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<ITicketRepository>("TicketRepository", TicketRepository);
