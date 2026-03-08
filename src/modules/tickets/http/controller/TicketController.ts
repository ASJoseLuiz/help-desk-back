import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTicketDTO } from "../../dto/CreateTicketDTO";
import CreateTicketService from "../../services/CreateTicketService";
import GetTicketsService from "../../services/GetUserTicketsService";
import { UpdateTicketDTO } from "../../dto/UpdateTicketDTO";
import UpdateTicketService from "../../services/UpdateTicketService";
import DeleteTicketService from "../../services/DeleteTicketService";

export default class UserController {
  constructor() {}

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description, status, priority, requested_user_id } = req.body;

    const data: CreateTicketDTO = { title, description, status, priority, requested_user_id };
    const createTicketService = container.resolve(CreateTicketService);

    const ticket = await createTicketService.execute(data);

    return res.status(201).json(ticket);
  }

  async getTickets(req: Request, res: Response): Promise<Response> {
    const id = req.user.sub;
    const getTicketsService = container.resolve(GetTicketsService);
    const ticket = await getTicketsService.execute(id);

    return res.json(ticket);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, status, priority, requested_user_id } = req.body;

    const data: UpdateTicketDTO = { title, description, status, priority, requested_user_id }

    const updateTicketService = container.resolve(UpdateTicketService);

    const ticket = await updateTicketService.execute(id as string, data);

    return res.json(ticket);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteTicketService = container.resolve(DeleteTicketService);
    await deleteTicketService.execute(id as string);

    return res.status(204);
  }
}
