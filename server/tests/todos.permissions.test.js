const User = require('../models/User');
const Todo = require('../models/Todo');

let cookie1, cookie2, todoId;

beforeEach(async () => {
  await User.deleteMany();
  await Todo.deleteMany();

  // Usuario 1
  const r1 = await global
    .request()
    .post('/api/auth/register')
    .send({ username: 'u1', password: '123' });
  cookie1 = r1.headers['set-cookie'];

  // Usuario 2
  const r2 = await global
    .request()
    .post('/api/auth/register')
    .send({ username: 'u2', password: '123' });
  cookie2 = r2.headers['set-cookie'];

  // Crear tarea con usuario1
  const todoRes = await global
    .request()
    .post('/api/todos')
    .set('Cookie', cookie1)
    .send({ title: 'privada' });
  todoId = todoRes.body._id;
});

describe('Todo Routes - permisos usuario', () => {
  it('usuario 2 no puede actualizar tarea de usuario 1', async () => {
    await global
      .request()
      .put(`/api/todos/${todoId}`)
      .set('Cookie', cookie2)
      .send({ completed: true })
      .expect(404);
  });

  it('usuario 2 no puede eliminar tarea de usuario 1', async () => {
    await global
      .request()
      .delete(`/api/todos/${todoId}`)
      .set('Cookie', cookie2)
      .expect(404);
  });
}); 