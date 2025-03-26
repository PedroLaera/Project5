import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { error } from "console";
import bcrypt from "bcrypt";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  console.log(users);
  res.send(users);
};

// Exemplo de rota paginada
export const listUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // pagina atual
    const limit = parseInt(req.query.limit as string) || 5; // total pag
    const offset = (page - 1) * limit;

    const { count, rows } = await UserModel.findAndCountAll({
      limit,
      offset,
      order: [["name", "ASC"]], // ordena
    });

    return res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro ao listar usuários", details: error.message });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  console.log(user);
  return res.json(user);
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    console.log("📥 Dados Recebidos:", req.body);
    const { name, email, password, CPF } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Escreva um nome válido" });
    }

    if (!email || email === "") {
      return res.status(400).json({ error: "Escreva um EMAIL válido" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Digite um e-mail válido (ex: nome@email.com)" });
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado." });
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (
      !CPF ||
      typeof CPF !== "string" ||
      !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(CPF)
    ) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const senhaRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!password || !senhaRegex.test(password)) {
      return res.status(400).json({
        error:
          "A senha deve ter no mínimo 8 caracteres e pelo menos 1 caractere especial",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      CPF,
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
    const { name, email, password, address, cart_creation_date } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Informe um nome válido" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualizando os campos do usuário
    user.name = name;
    user.email = email ?? user.email;
    user.address = address ?? user.address;
    user.cart_creation_date = cart_creation_date ?? user.cart_creation_date;

    // Atualiza a senha apenas se for enviada
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Erro no servidor", details: error.message });
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
