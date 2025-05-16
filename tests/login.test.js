const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');
const argon2 = require('argon2');

describe('POST /api/users/login', () => {
  beforeAll(async () => {
    // nettoyer la base de test
    await sequelize.sync({ force: true });

    // créer un utilisateur de test
    await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: await argon2.hash('secret1234@'),
      role: 'user'
    });
  });

  it('return un JWT token si les creds sont valide', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@gmail.com',
        password: 'secret1234@'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await sequelize.close(); // Fermer proprement la connexion
  });
});
