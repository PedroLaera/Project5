import { Request, Response } from "express";
import CommentModel from "../models/CommentModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Comments = await CommentModel.findAll();
    res.status(200).json(Comments);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};

export const getCommentsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Comments = await CommentModel.findByPk(req.params.id);

    if (!Comments) {
      return res.status(404).json({ error: "Comentário não encontrada" });
    }

    return res.status(200).json(Comments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

export const createComments = async (req: Request, res: Response) => {
  try {
    const { id_user, id_product, content, rating, creation_date } = req.body;

    /*if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Comentário válido" });
    }*/

    const Comments = await CommentModel.create({
      id_user,
      id_product,
      content,
      rating,
      creation_date,
    });
    return res.status(201).json(Comments);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};

/*export const updateComments = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const category = await CommentModel.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    category.name = name;
    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};*/

export const destroyCommentsById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const Comments = await CommentModel.findByPk(req.params.id);

    if (!Comments) {
      return res.status(404).json({ error: "Comentário não encontrada" });
    }

    await Comments.destroy();
    return res.status(200).json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro interno no servidor", details: error });
  }
};
