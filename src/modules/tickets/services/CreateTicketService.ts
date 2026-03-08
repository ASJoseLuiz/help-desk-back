import { inject, injectable } from "tsyringe";
import ITicketRepository from "../repository/ITicketsRepository";
import { CreateTicketDTO } from "../dto/CreateTicketDTO";
import { Ticket } from "../../../generated/prisma/client";


@injectable()
export default class CreateTicketService {
  constructor(
    @inject("TicketRepository") private ticketRepository: ITicketRepository,
  ) {}

  async execute(data: CreateTicketDTO, user_id: string): Promise<Ticket> {
    return this.ticketRepository.create(data, user_id);
  }
}
