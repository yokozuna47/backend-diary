const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

describe('GET /api/users/me', () => {
  let token;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const user = await User.create({
      firstName: 'Ken',
      lastName: 'Shiro',
      email: 'kenshiro@test.com',
      password: await argon2.hash('secret1234'),
      role: 'user'
    });

    token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
  });

  it('return le profil du user authentifié', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'kenshiro@test.com');
  });

  it('rejette la requête sans token', async () => {
    const res = await request(app)
      .get('/api/users/me');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token manquant ou mal formé');
  });

  it('rejette la requête avec un token invalide', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer faketoken123');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token invalide');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
