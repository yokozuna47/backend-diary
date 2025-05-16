const request = require('supertest');
const app = require('../server'); // 🧠 Attention : il faut que server.js exporte `app`

describe('API Auth', () => {
  it('should return 200 OK on root path', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
