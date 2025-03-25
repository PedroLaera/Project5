import { Request, Response } from "express";
import {
  CreateUser,
  getUserById,
  getAll,
  updaterUser,
  DestroyUserById,
} from "../src/controllers/UserController";
import UserModel from "../src/models/UserModel";

jest.mock("../src/models/UserModel");

export const mockRequest = (body = {}, params = {}) => {
  return {
    body,
    params,
  } as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
};

it("Deve criar um novo usuário", async () => {
  const req = mockRequest({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "1234567$",
    CPF: "821.555.842-60",
  });
  const res = mockResponse();

  (UserModel.create as jest.Mock).mockResolvedValue({
    id_user: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "hashed_password",
  });

  await CreateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id_user: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    })
  );
});

it("criar", async () => {
  const req = mockRequest();
});

describe("UserController", () => {
  it("Deve retornar um usuário pelo ID", async () => {
    const req = mockRequest(
      {
        headers: {
          Authorization: "Bearer ${token}",
        },
      },
      { id: "1" }
    );
    const res = mockResponse();

    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      id_user: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    await getUserById(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id_user: 1,
        name: "John Doe",
        email: "johndoe@example.com",
      })
    );
  });
});

it("Deve listar todos os usuários", async () => {
  const req = mockRequest();
  const res = mockResponse();

  (UserModel.findAll as jest.Mock).mockResolvedValue([
    { id_user: 1, name: "John Doe", email: "johndoe@example.com" },
    { id_user: 2, name: "Jane Doe", email: "janedoe@example.com" },
  ]);

  await getAll(req, res);

  expect(res.send).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining({ id_user: 1, name: "John Doe" }),
      expect.objectContaining({ id_user: 2, name: "Jane Doe" }),
    ])
  );
});

it("Deve atualizar um usuário", async () => {
  const req = mockRequest({ name: "John Updated" }, { id: "1" });
  const res = mockResponse();

  (UserModel.findByPk as jest.Mock).mockResolvedValue({
    id_user: 1,
    name: "John Doe",
    save: jest.fn().mockResolvedValue({ id_user: 1, name: "John Updated" }),
  });

  await updaterUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ name: "John Updated" })
  );
});

it("Deve deletar um usuário", async () => {
  const req = mockRequest({}, { id: "1" });
  const res = mockResponse();

  (UserModel.findByPk as jest.Mock).mockResolvedValue({
    id_user: 1,
    destroy: jest.fn().mockResolvedValue({}),
  });

  await DestroyUserById(req, res);

  expect(res.status).toHaveBeenCalledWith(204);
});
