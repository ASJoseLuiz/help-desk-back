import { inject, injectable } from "tsyringe";
import ITicketRepository from "../repository/ITicketsRepository";
import { Ticket } from "../../../generated/prisma/client";
import { UpdateTicketDTO } from "../dto/UpdateTicketDTO";
import { AppError } from "../../../shared/errors/AppError";


@injectable()
export default class UpdateTicketService {
  constructor(
    @inject("TicketRepository") private ticketRepository: ITicketRepository,
  ) {}

  async execute(id: string, data: UpdateTicketDTO): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) throw new AppError("Chamado não encontrado");
    return this.ticketRepository.update(id, data);
  }
}
