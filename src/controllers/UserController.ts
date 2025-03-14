import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { error } from "console";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    console.log("📥 Dados Recebidos:", req.body);
    const { name, email, password, address, cart_creation_date } = req.body;

    /*if (!Nome || Nome === "") {
      return res.status(400).json({ error: "Escreva um nome válido" });
    }*/

    // Validação do e-mail
    /*const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!Email || !emailRegex.test(Email)) {
          return res.status(400).json({ error: "Digite um e-mail válido" });
      }

      // Validação da senha 
      const senhaRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      if (!Senha || !senhaRegex.test(Senha)) {
          return res.status(400).json({ error: "A senha deve ter no mínimo 8 caracteres e pelo menos 1 caractere especial" });
      }*/

    //const enderecoRegex =

    const user = await UserModel.create({
      name,
      email,
      password,
      address,
      cart_creation_date,
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error.message });
  }
};

export const updaterUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Informe um nome valido" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    /*user. = name;*/
    await user.save();

    res.status(200).json(UserModel);
  } catch (error) {
    res.status(500).json("erro no servido" + error);
  }
};

export const DestroyUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno do servidor" + error);
  }
};
