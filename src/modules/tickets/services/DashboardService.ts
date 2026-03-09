import { inject, injectable } from "tsyringe";
import ITicketRepository from "../../tickets/repository/ITicketsRepository";
import IUserRepository from "../../users/repository/IUserRepository";
import { Ticket, TicketStatus, Role } from "../../../generated/prisma/client";

interface Result {
  chamadosAbertos: number;
  chamadosAndamento: number;
  chamadosResolvidos: number;
  usuarios: number;
  tickets: Ticket[];
}

@injectable()
export default class GetDashboardService {
  constructor(
    @inject("TicketRepository")
    private ticketRepository: ITicketRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(user_id: string): Promise<Result> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let chamadosAbertos: number;
    let chamadosAndamento: number;
    let chamadosResolvidos: number;
    let tickets: Ticket[];

    if (user.role === Role.ADMIN) {

      chamadosAbertos = await this.ticketRepository.count(TicketStatus.OPEN);

      chamadosAndamento = await this.ticketRepository.count(TicketStatus.IN_PROGRESS);

      chamadosResolvidos = await this.ticketRepository.count(TicketStatus.DONE);

      tickets = await this.ticketRepository.findAll();

    } else {

      chamadosAbertos = await this.ticketRepository.countByUser(user_id, TicketStatus.OPEN);

      chamadosAndamento = await this.ticketRepository.countByUser(user_id, TicketStatus.IN_PROGRESS);

      chamadosResolvidos = await this.ticketRepository.countByUser(user_id, TicketStatus.DONE);

      tickets = await this.ticketRepository.findByRequestedUserId(user_id);
    }

    const usuarios = await this.userRepository.findAll();

    return {
      chamadosAbertos,
      chamadosAndamento,
      chamadosResolvidos,
      usuarios: usuarios.length,
      tickets
    };
  }
}