import { Request, Response } from "express";
import PaymentModel from "../models/PaymentModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Payment = await PaymentModel.findAll();
    res.status(200).json(Payment);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const getCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Payment = await PaymentModel.findByPk(req.params.id);

    if (!Payment) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json(Payment);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const Payment = await PaymentModel.create({ name });
    return res.status(201).json(Payment);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


/*export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    Addres.name = name;
    await Addres.save();

    return res.status(200).json(Addres);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};*/


export const destroyCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Payment = await PaymentModel.findByPk(req.params.id);

    if (!Payment) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await Payment.destroy();
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
