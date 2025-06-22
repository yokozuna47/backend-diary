const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');
const argon2 = require('argon2');

describe('POST /api/users/login', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const hashedPassword = await argon2.hash('secret1234@');

    await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: hashedPassword,
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

  it('rejette la connexion avec un mauvais mot de passe', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@gmail.com',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Identifiants invalides');
  });

  it('rejette la connexion avec un email inexistant', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'notfound@email.com',
        password: 'secret1234@'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Identifiants invalides');
  });

  it('rejette la connexion sans données', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({});

    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
