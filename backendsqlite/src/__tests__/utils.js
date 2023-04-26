const login = async (client, { email, password }) => {
  const response = await client.post('/api/users/signin').send({
    email,
    password,
  });
  return response.body.token;
};

const authTest = (client, method, url) => () => {
  test('Example: request without token', async () => {
    const response = await client[method](url).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('You must specify the token');
  });
  test('Example: request with fake token', async () => {
    const response = await client[method](url)
      .send({})
      .set({ token: 'fake' });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid token');
  });
};

export { login, authTest };
