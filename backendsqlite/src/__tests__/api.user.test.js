const app = require("../adapters/driving/app");
const request = require("supertest");

describe("e2e: /api/users", () => {
  describe('GET /api/users', () => {
    test('Test if get users works with initialized table user', async () => {
      const response = await request(app)
        .get('/api/users')
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Returning users')
      expect(response.body.data.length).toBe(1)
    })
  })

  describe("POST /api/users", () => {
    test("Example: sends a request with name, email and password", async () => {
      const response = await request(app).post("/api/users").send({
        name: "test",
        email: "test@email.com",
        password: "MyPassw0rd!",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("User registered");
    });
    test("Example: sends a request with name, email and weak password", async () => {
      const response = await request(app).post("/api/users").send({
        name: "test",
        email: "test@email.com",
        password: "weak",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Weak password!");
    });
    test("Example: sends a request with name, email and no password", async () => {
      const response = await request(app).post("/api/users").send({
        name: "test",
        email: "test@email.com",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("You must specify the name, email and password");
    });
  });
});
