import { inject, injectable } from "tsyringe";
import ITicketRepository from "../repository/ITicketsRepository";
import { Ticket } from "../../../generated/prisma/client";
import IUserRepository from "../../users/repository/IUserRepository";


@injectable()
export default class GetTicketsService {
  constructor(
    @inject("TicketRepository") private ticketRepository: ITicketRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(user_id: string): Promise<Ticket[]> {
    const user = await this.userRepository.findById(user_id);
    if (user && user.role === 'CLIENT') {
        return this.ticketRepository.findByRequestedUserId(user_id);
    } 

    if (user && user.role === 'ADMIN') {
        return this.ticketRepository.findAll();
    }

    return []
  }
}
