import { inject, injectable } from "tsyringe";
import { PrismaClient, Ticket } from "../../../generated/prisma/client";
import ITicketRepository from "./ITicketsRepository";
import { CreateTicketDTO } from "../dto/CreateTicketDTO";
import { UpdateTicketDTO } from "../dto/UpdateTicketDTO";

@injectable()
export default class TicketRepository implements ITicketRepository {
  constructor(@inject("PrismaClient") private prisma: PrismaClient) {}

  async create(data: CreateTicketDTO): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description || '',
        requestedUserId: data.requested_user_id,
        priority: data.priority,
        status: data.status
      },
    });
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async findByRequestedUserId(user_id: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        requestedUserId: user_id,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }

  async update(id: string, data: UpdateTicketDTO): Promise<Ticket> {
    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.priority) updateData.priority = data.priority;
    if (data.status) updateData.status = data.status;

    return this.prisma.ticket.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ticket.delete({
      where: { id },
    });
  }
}