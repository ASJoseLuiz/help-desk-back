import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTicketDTO } from "../../dto/CreateTicketDTO";
import CreateTicketService from "../../services/CreateTicketService";
import { UpdateTicketDTO } from "../../dto/UpdateTicketDTO";
import UpdateTicketService from "../../services/UpdateTicketService";
import DeleteTicketService from "../../services/DeleteTicketService";
import GetUserTicketsService from "../../services/GetUserTicketsService";
import GetTicketService from "../../services/GetTicketService";

export default class TicketController {
  constructor() {}

  public async create(req: Request, res: Response): Promise<Response> {
    const requested_user_id = req.user.sub;
    const { title, description, status, priority } = req.body;

    const data: CreateTicketDTO = { title, description, status, priority };
    const createTicketService = container.resolve(CreateTicketService);

    const ticket = await createTicketService.execute(data);

    return res.status(201).json(ticket);
  }

  async getTickets(req: Request, res: Response): Promise<Response> {
    const id = req.user.sub;
    const getTicketsService = container.resolve(GetUserTicketsService);
    const ticket = await getTicketsService.execute(id);

    return res.json(ticket);
  }

  async getTicketById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const getTicketService = container.resolve(GetTicketService);
    const ticket = await getTicketService.execute(id as string);

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
