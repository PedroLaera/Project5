import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id_user: number; email?: string };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token recebido:", token);

  if (!token) {
    return res.status(401).json({ error: "Acesso Negado, Token Inexistente" });
  }

  try {
    const decoded: any = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "Acesso Negado, Token Invalido" + error });
  }
};
