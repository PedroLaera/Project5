import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const Produtcs = await ProductModel.findAll();
    res.status(200).json(Produtcs);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const getProdutcsById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Produto não encontrada" });
    }

    return res.status(200).json(Produtcs);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const createProdutcs = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; 

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Digite um nome de categoria válido" });
    }

    const Produtcs = await ProductModel.create({ name });
    return res.status(201).json(Produtcs);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const updateProdutcs = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name, Descricao, Preco, ID_categoria, Estoque } = req.body;

    if (!name || name.trim() === ""){
      return res.status(400).json({ error: "Digite um nome de Produto válido" });
    }

    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

// adicionar todos os campos que deseja editar//

    if (name) Produtcs.name = name;
    if (Descricao) Produtcs.description = Descricao;
    if (Preco) Produtcs.price = Preco;
    if (ID_categoria) Produtcs.categoryId = ID_categoria;
    if (Estoque) Produtcs.stock = Estoque;

    await Produtcs.save();

    return res.status(200).json(Produtcs);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};


export const destroyProdutcsById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const Produtcs = await ProductModel.findByPk(req.params.id);

    if (!Produtcs) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    await Produtcs.destroy();
    return res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
