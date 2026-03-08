import { Ticket } from "../../../generated/prisma/client";
import { CreateTicketDTO } from "../dto/CreateTicketDTO";
import { UpdateTicketDTO } from "../dto/UpdateTicketDTO";

export default interface ITicketRepository {
  create(data: CreateTicketDTO): Promise<Ticket>;
  findById(id: string): Promise<Ticket | null>;
  findByRequestedUserId(user_id: string): Promise<Ticket[]>;
  findAll(): Promise<Ticket[]>;
  update(id: string, data: UpdateTicketDTO): Promise<Ticket>;
  delete(id: string): Promise<void>;
}
