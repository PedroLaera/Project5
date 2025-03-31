import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { error } from "console";
import bcrypt from "bcrypt";
import { validateUserData, hashPassword } from "../services/userValidationService";
import { AuthRequest } from "../middleware/authMiddleware"; 


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
    const { name, email, password, CPF } = req.body;

    const validationError = await validateUserData(name, email, password, CPF);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const hashedPassword = await hashPassword(password);
    console.log("Senha Criptografada:", hashedPassword);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      CPF,
    });

    return res.status(201).json({
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      CPF: user.CPF,
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor", details: error.message });
  }
};

export const updaterUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name, password, address, email  } = req.body;

    if (email) {
      return res.status(400).json({ error: "A atualização do e-mail não é permitida." });
    }

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Informe um nome válido" });
    }

    // Verifica se o usuário está autenticado
    if (!req.user) {
  return res.status(401).json({ error: "Usuário não autenticado" });
    }

    // Pega o id do usuário autenticado no token
    const userIdFromToken = req.user.id_user;

    const userIdFromParams = parseInt(req.params.id);

    // Busca o usuário pelo ID autenticado
    const user = await UserModel.findByPk(userIdFromToken);
    if (!user) {
  return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica se o usuário autenticado está tentando modificar outro usuário
if (userIdFromToken !== userIdFromParams) {
  return res.status(403).json({ error: "Você não tem permissão para alterar os dados de outro usuário." });
}

    
    user.name = name;
    user.address = address ?? user.address;

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
