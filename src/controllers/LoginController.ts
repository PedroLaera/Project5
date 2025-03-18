import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ error: "Senha e E-mail Necessarias" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "Usuario Não Encontrado" });
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Senha e E-mail Necessarias" });
  }

  console.log("Gerando token para:", user.id_user, user.email);


  console.log("Usuário encontrado:", user);
  const token = generateToken(user.id_user, user.email);
  console.log("Token gerado:", token);

  res.status(200).json({ message: "Usuario Logado Com Sucesso", token });
};
