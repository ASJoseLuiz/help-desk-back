import { inject, injectable } from "tsyringe";
import { PrismaClient, Ticket, TicketStatus } from "../../../generated/prisma/client";
import ITicketRepository from "./ITicketsRepository";
import { CreateTicketDTO } from "../dto/CreateTicketDTO";
import { UpdateTicketDTO } from "../dto/UpdateTicketDTO";
import { generateTicketCode } from "../../../shared/lib/generateCode";

@injectable()
export default class TicketRepository implements ITicketRepository {
  constructor(@inject("PrismaClient") private prisma: PrismaClient) {}

  async create(data: CreateTicketDTO, user_id: string): Promise<Ticket> {
    const id = crypto.randomUUID();
    const code = generateTicketCode(id);
  
    return this.prisma.ticket.create({
      data: {
        id,
        code,
        title: data.title,
        description: data.description || "",
        requestedUserId: user_id,
        priority: data.priority,
        status: data.status
      }
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
      include: {
        requestedUser: {
          select: {
            name: true
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany({
      include: {
        requestedUser: {
          select: {
            name: true
          }
        }
      }
    });
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

  async countByUser(user_id: string, status: TicketStatus): Promise<number> {
    return this.prisma.ticket.count({
      where: {
        status,
        requestedUserId: user_id
      }
    });
  }

  async count(status: TicketStatus): Promise<number> {
    return await this.prisma.ticket.count({where: { status }})
  }
}