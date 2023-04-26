const login = async (client, { email, password }) => {
  const response = await client.post('/api/users/signin').send({
    email,
    password,
  });
  return response.body.token;
};

export { login };
