import { z } from "zod";
import { Priority, TicketStatus } from "../../../generated/prisma/enums";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Nome é obrigatório").max(30, "Nome pode ter no máximo 30 caracteres"),
  description: z.string().optional(),
  priority: z.enum(Priority).optional(),
  status: z.enum(TicketStatus).optional(),
});

export type CreateTicketDTO = z.infer<typeof createTicketSchema>;