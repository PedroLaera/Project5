import { Request, Response } from "express";
import CategoryModel, { Category } from "../models/CategoryModel";
import { error } from "console";
import { Error } from "sequelize";

export const getAll = async (req: Request, res: Response) => {
  const users = await CategoryModel.findAll();
  res.send(Category);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await CategoryModel.findByPk(req.params.id);

  return res.json(Category);
};

export const createCategory = async (
  req: Request, res: Response) => {
    try{
      const { Category } = req.body

      if(!Category || Category === ''){
          return res.status(400).json({erro:"Digite uma categoria"})
      }
      const categoria = await CategoryModel.create({Category})
      res.status(201).json(categoria)
    } catch(erro){
      res.status(500).json('Erro interno no servido')
    }
}

export const updateCategory = async( req: Request<{id: string}>, res: Response) =>{

    try{
      const { categoria } = req.body

      if(!categoria || categoria === ''){
         return res.status(400).json({error: "digite uma categoria valida"})
      }

      const Category = await CategoryModel.findByPk(req.params.id)
      if (!categoria){
        return res.status(404).json({error: "Usuario não encontrado"})
      }

      categoria.name = name;
      await categoria.save()
    }  
}
