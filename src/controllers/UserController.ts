import { Request, Response } from "express";
import UserModel, { User } from "../models/UserModel";
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

export const createUser = async (
    req: Request, res: Response
) =>{
    try{
        const { name } = req.body

        if(!name || name === ""){
            return res.status(400)
            .json({error: 'Escreva um nome valido'})
        }

        const user = await UserModel.create({Nome: name})
            return res.status(201).json({})
    } catch (error){
      res.status(500).json("erro interno no servido" + error)
    }
}

export const updaterUser = async(
  req: Request<{ id: string}>,
  res: Response) => {
    try {
      const { name } = req.body

      if (!name || name ===''){
          return res.status(400).json({error:'Informe um nome valido'})
      }

      const user = await UserModel.findByPk(req.params.id)
      if (!user) {
          return res.status(404)
              .json({error: 'User not found'})
      }

      user.name = name;
      await user.save();


      res.status(200).json(User)
    } catch (error){
    res.status(500).json("erro no servido" + error)
  }
}

export const DestroyUserById = async(
    req: Request<{ id: string }>, res: Response) =>{
        
      try {
          const user = await UserModel.findByPk(req.params.id)
            if(!user) {
              return res.status(404).json({error: 'Usuario não encontrado'})
            }

            await user.destroy()

            res.status(204).send()
      } catch(error){
            res.status(500).json('erro interno do servidor' + error)
      }
    }

