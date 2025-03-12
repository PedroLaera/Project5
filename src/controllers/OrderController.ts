import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Orders = await OrderModel.findAll();
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const GetOrderById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Orders = await OrderModel.findByPk(req.params.id);

    if (!Orders) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    return res.status(200).json(Orders);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const Orders = await OrderModel.create({ name });
    return res.status(201).json(Orders);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


/*export const updateOrder = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Produto válido" });
    }

    const category = await OrderModel.findByPk(req.params.id);

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


export const destroyOrderById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Orders = await OrderModel.findByPk(req.params.id);

    if (!Orders) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await Orders.destroy();
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
