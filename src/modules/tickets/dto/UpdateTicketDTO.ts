import { z } from "zod";
import { Priority, TicketStatus } from "../../../generated/prisma/enums";

export const updateTicketSchema = z.object({
  title: z.string().min(1, "Nome é obrigatório").max(30, "Nome pode ter no máximo 30 caracteres"),
  description: z.string().optional(),
  priority: z.enum(Priority).optional(),
  status: z.enum(TicketStatus).optional(),
  requested_user_id: z.uuid()
});

export type UpdateTicketDTO = z.infer<typeof updateTicketSchema>;