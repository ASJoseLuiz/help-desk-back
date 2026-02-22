import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1).max(30, "Nome pode ter no máximo 30 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
});