import z from "zod";
import { Role } from "../../../generated/prisma/enums";

export const updateUserSchema = z.object({
  name: z.string().min(1).max(30, "Nome pode ter no máximo 30 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
  role: z.enum(Role).optional()
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;