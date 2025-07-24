const User = require('../models/User');
const Todo = require('../models/Todo');

let cookie;

beforeEach(async () => {
  await User.deleteMany();
  await Todo.deleteMany();
  const res = await global
    .request()
    .post('/api/auth/register')
    .send({ username: 'filterUser', password: '123' });
  cookie = res.headers['set-cookie'];
});

describe('Todo Routes - filtros', () => {
  it('filtra por estado', async () => {
    // Crear 2 tareas
    const user = await User.findOne();
    const todo1 = await Todo.create({ user: user._id, title: 't1' });
    const todo2 = await Todo.create({ user: user._id, title: 't2', completed: true });

    // todas
    const all = await global
      .request()
      .get('/api/todos')
      .set('Cookie', cookie)
      .expect(200);
    expect(all.body.length).toBe(2);

    // pendientes
    const pending = await global
      .request()
      .get('/api/todos?estado=pendiente')
      .set('Cookie', cookie)
      .expect(200);
    expect(pending.body.length).toBe(1);
    expect(pending.body[0]._id).toBe(todo1.id);

    // completadas
    const done = await global
      .request()
      .get('/api/todos?estado=completado')
      .set('Cookie', cookie)
      .expect(200);
    expect(done.body.length).toBe(1);
    expect(done.body[0]._id).toBe(todo2.id);
  });
}); 