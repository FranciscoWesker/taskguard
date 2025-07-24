const User = require('../models/User');

describe('Auth Routes - errores', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('rechaza registro duplicado', async () => {
    await global
      .request()
      .post('/api/auth/register')
      .send({ username: 'dup', password: '123' })
      .expect(201);

    await global
      .request()
      .post('/api/auth/register')
      .send({ username: 'dup', password: '123' })
      .expect(400);
  });

  it('rechaza login usuario inexistente', async () => {
    await global
      .request()
      .post('/api/auth/login')
      .send({ username: 'nouser', password: '123' })
      .expect(400);
  });

  it('rechaza login contraseña incorrecta', async () => {
    await global
      .request()
      .post('/api/auth/register')
      .send({ username: 'wrongpass', password: '123' });

    await global
      .request()
      .post('/api/auth/login')
      .send({ username: 'wrongpass', password: 'bad' })
      .expect(400);
  });
}); 