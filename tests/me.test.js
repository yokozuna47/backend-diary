const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

describe('GET /api/users/me', () => {
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const user = await User.create({
      firstName: 'Ken',
      lastName: 'Shiro',
      email: 'kenshiro@example.com',
      password: await argon2.hash('secret1234'),
      role: 'user'
    });

    token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
  });

  it('return le profile du user authé', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('email', 'kenshiro@example.com');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
