import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'
import { authMiddleware } from '../src/middleware/authMiddleware'

jest.mock('../src/middleware/authMiddleware', () => {
    return {
        authMiddleware: (req: any, res: any, next: any) => {
            req.body.user = {
                email: 'usuarioTeste@gmail.com',
                password: 'ReiDelas123@'
            }

            next()
        }
    }
})

describe('User Endpoint', () => {
    beforeAll(async () => {
  console.log("🔁 Sincronizando banco de testes...");
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log("✅ Banco sincronizado!");
});

    afterAll(async () => {
        await sequelize.close()
    })
});