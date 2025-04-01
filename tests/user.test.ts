import app from "../src/app";
import sequelize from "../src/config/database";
import request from "supertest";
import { authMiddleware } from "../src/middleware/authMiddleware";
import jwt from "jsonwebtoken";

// Função para gerar o token
const generateToken = (id_user: number, email: string) => {
  const payload = { id_user, email };
  const secretKey = "sua_chave_secreta"; // Defina sua chave secreta aqui
  return jwt.sign(payload, secretKey, { expiresIn: "7D" });
};

jest.mock("../src/middleware/authMiddleware", () => {
  return {
    authMiddleware: (req: any, res: any, next: any) => {
      req.body.user = {
        email: "usuarioTeste@gmail.com",
        password: "1234568@",
      };

      next();
    },
  };
});

describe("User Endpoint", () => {
  beforeAll(async () => {
    console.log("🔁 Sincronizando banco de testes...");
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✅ Banco sincronizado!");
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // CREATE USER
  test("POST /users shold create a new user and return success", async () => {
    const response = await request(app).post("/users").send({
      id_user: "1",
      name: "usuario teste",
      email: "usuarioTeste@gmail.com",
      CPF: "538.395.170-95",
      password: "1234568@",
    });
    console.log(response.body);
    expect(response.status).toBe(201);
  });

  //criar teste para logar

  //GET BY ID
  test("Get /users shold return a user by ID and return success", async () => {
    const response = await request(app)
      .get("/users/1")
      .set({ Authorization: "Auth" });

    expect(response.status).toBe(200);
  });

  // POST UPADATE USER
  test("POST /users shold UPDATE a user and return success", async () => {
    const response = await request(app)
      .put("/users/1")
      .send({
        name: "usuario teste EDITADO",
        CPF: "231.339.070-50",
        password: "ReiDelas123EDIT@",
      })
      .set({ Authorization: "Auth" });
    expect(response.status).toBe(200);
  });

  // GET ALL
  test("GET /users should return all users", async () => {
    const response = await request(app)
      .get("/users")
      .set({ Authorization: "Auth" });

    expect(response.status).toBe(200);
  });
});
