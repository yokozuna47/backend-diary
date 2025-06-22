const request = require('supertest');
const app = require('../server');
const { sequelize, User } = require('../models');


describe('API Auth', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should return 200 OK on root path', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      firstName: 'Yoko',
      lastName: 'Zuna',
      email: 'yoko@gmail.com',
      password: 'azerty123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('doit rejeter l\'inscription avec un email dupliqué', async () => {
    const res = await request(app).post('/api/users/register').send({
      firstName: 'Duplicate',
      lastName: 'User',
      email: 'yoko@gmail.com', // même email que ci-dessus
      password: 'azerty123'
    });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('doit se connecter avec des identifiants valides', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'yoko@gmail.com',
      password: 'azerty123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('doit rejeter la connexion avec un mot de passe invalide', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'blabla@gmail.com',
      password: 'fauxpassword'
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
