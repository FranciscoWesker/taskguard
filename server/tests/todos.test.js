const User = require('../models/User');
const Todo = require('../models/Todo');

let cookie;

beforeEach(async () => {
  await User.deleteMany();
  await Todo.deleteMany();
  // register and get cookie
  const res = await global
    .request()
    .post('/api/auth/register')
    .send({ username: 'todoUser', password: 'pass123' });
  cookie = res.headers['set-cookie'];
});

describe('Todo Routes', () => {
  it('creates a todo', async () => {
    const res = await global
      .request()
      .post('/api/todos')
      .set('Cookie', cookie)
      .send({ title: 'Comprar pan' })
      .expect(201);
    expect(res.body.title).toBe('Comprar pan');
    expect(res.body.completed).toBe(false);
  });

  it('gets todos', async () => {
    await Todo.create({ user: (await User.findOne())._id, title: 'Task' });
    const res = await global
      .request()
      .get('/api/todos')
      .set('Cookie', cookie)
      .expect(200);
    expect(res.body.length).toBe(1);
  });

  it('updates todo', async () => {
    const todo = await Todo.create({ user: (await User.findOne())._id, title: 'Task' });
    const res = await global
      .request()
      .put(`/api/todos/${todo._id}`)
      .set('Cookie', cookie)
      .send({ completed: true })
      .expect(200);
    expect(res.body.completed).toBe(true);
  });

  it('deletes todo', async () => {
    const todo = await Todo.create({ user: (await User.findOne())._id, title: 'Task' });
    await global
      .request()
      .delete(`/api/todos/${todo._id}`)
      .set('Cookie', cookie)
      .expect(200);
    const count = await Todo.countDocuments();
    expect(count).toBe(0);
  });
}); 