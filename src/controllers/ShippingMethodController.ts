import { Request, Response } from "express";
import ShippingMethodModel from "../models/ShippingMethodModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const methods = await ShippingMethodModel.findAll();
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const getMethodById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res.status(404).json({ error: "Método não encontrada" });
    }

    return res.status(200).json(Method);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const createMethod = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Método válido" });
    }

    const Method = await ShippingMethodModel.create({ name });
    return res.status(201).json(Method);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const updateMethod = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de Método válido" });
    }

    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res.status(404).json({ error: "Método não encontrada" });
    }

    Method.name = name;
    await Method.save();

    return res.status(200).json(Method);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const destroyMethodById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Method = await ShippingMethodModel.findByPk(req.params.id);

    if (!Method) {
      return res.status(404).json({ error: "Método não encontrada" });
    }

    await Method.destroy();
    return res.status(200).json({ message: "Método deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
