import { Router } from "express";
import TicketController from "../controller/TicketController";
import { validateBody } from "../../../../shared/middlewares/ZodValidation";
import { createTicketSchema } from "../../dto/CreateTicketDTO";
import { updateTicketSchema } from "../../dto/UpdateTicketDTO";
import { authMiddleware } from "../../../../shared/middlewares/AuthMiddleware";

const ticketRouter = Router();
const ticketController = new TicketController()
ticketRouter.use(authMiddleware);

ticketRouter.post("/", validateBody(createTicketSchema), ticketController.create);
ticketRouter.get("/", ticketController.getTickets);
ticketRouter.get("/dashboard", ticketController.dashboard);
ticketRouter.get("/:id", ticketController.getTicketById);
ticketRouter.put("/:id", validateBody(updateTicketSchema), ticketController.update);
ticketRouter.delete("/:id", ticketController.delete);

export default ticketRouter;