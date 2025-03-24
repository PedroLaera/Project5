import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "Senha_secreta";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (id_user: number, email: string) => {
  return jwt.sign({ id_user, email }, JWT_SECRET, { expiresIn: "7D" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
