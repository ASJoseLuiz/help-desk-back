import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthService } from "../../services/AuthService";

export default class AuthController {
    constructor() {}

    public async login(req: Request, res: Response): Promise<void> {
        const data = req.body;
        const authService = container.resolve(AuthService);
        const token = await authService.execute(data)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
          });
      
        res.status(200).json({ message: "Login realizado com sucesso" });
      }
    
      public logout(req: Request, res: Response): void {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout realizado com sucesso" });
      }
    
      public me(req: Request, res: Response): void {
        res.status(200).json({ user: (req as any).user });
      }
} 