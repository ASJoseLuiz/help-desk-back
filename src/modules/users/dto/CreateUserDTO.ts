import { z } from "zod";
import { Role } from "../../../generated/prisma/enums";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(30, "Nome pode ter no máximo 30 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(Role).optional()
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;