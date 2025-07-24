describe('Todo Routes - autenticación requerida', () => {
  it('rechaza acceso sin cookie', async () => {
    await global.request().get('/api/todos').expect(401);
    await global.request().post('/api/todos').send({ title: 'x' }).expect(401);
  });
}); 