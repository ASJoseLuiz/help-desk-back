import { inject, injectable } from "tsyringe";
import ITicketRepository from "../repository/ITicketsRepository";
import { Ticket } from "../../../generated/prisma/client";

@injectable()
export default class GetTicketService {
  constructor(
    @inject("TicketRepository") private ticketRepository: ITicketRepository,
  ) {}

  async execute(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findById(id);
  }
}
