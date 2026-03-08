import { inject, injectable } from "tsyringe";
import ITicketRepository from "../repository/ITicketsRepository";
import { AppError } from "../../../shared/errors/AppError";


@injectable()
export default class DeleteTicketService {
  constructor(
    @inject("TicketRepository") private ticketRepository: ITicketRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) throw new AppError("Chamado não encontrado");
    return this.ticketRepository.delete(id);
  }
}
