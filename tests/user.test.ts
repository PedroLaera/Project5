import app from '../src/app'
import sequelize from '../src/config/database'
import request from 'supertest'
import { authMiddleware } from '../src/middleware/authMiddleware'

jest.mock('../src/middleware/authMiddleware', () => {
    return {
        authMiddleware: (req: any, res: any, next: any) => {
            req.body.user = {
                email: 'beludo@onlyfans.com',
                password: '12345789&'
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

    test('POST /users shold create a new user and return success', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                id_user: '100',
                name: 'lal',
                email: 'vivi@onlyfans.com',
                CPF: '959.256.888-80',
                password: '12344556661@'
            })
            console.log(response.body);
        expect(response.status).toBe(201)
    })

    test('GET /users should return a list of books', async () => {
        const response = await request(app)
            .get('/users')
            .set({Authorization: 'xablau'})

        expect(response.status).toBe(200)
    })
})