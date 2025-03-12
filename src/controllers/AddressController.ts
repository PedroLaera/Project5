import { Request, Response } from "express";
import AddresModel from "../models/AddressModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Addres = await AddresModel.findAll();
    res.status(200).json(Addres);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const getAddresById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    return res.status(200).json(Addres);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const createAddres = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const Addres = await AddresModel.create({ name });
    return res.status(201).json(Addres);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


/*export const updateAddres = async (req: Request<{ id: string }>, res: Response) => {
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


export const destroyAddresById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Addres = await AddresModel.findByPk(req.params.id);

    if (!Addres) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await Addres.destroy();
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
