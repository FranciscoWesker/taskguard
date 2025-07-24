const User = require('../models/User');

describe('Auth Routes', () => {
  it('registers a user and sets cookie', async () => {
    const res = await global
      .request()
      .post('/api/auth/register')
      .send({ username: 'test', password: 'secret' })
      .expect(201);

    expect(res.body.user.username).toBe('test');
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
  });

  it('logs in user and returns cookie', async () => {
    // first register
    await global
      .request()
      .post('/api/auth/register')
      .send({ username: 'john', password: 'pass123' });
    const res = await global
      .request()
      .post('/api/auth/login')
      .send({ username: 'john', password: 'pass123' })
      .expect(200);
    expect(res.body.user.username).toBe('john');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('logout clears cookie', async () => {
    const res = await global
      .request()
      .post('/api/auth/logout')
      .expect(200);
    expect(res.body.message).toBe('Sesión cerrada');
  });
}); 