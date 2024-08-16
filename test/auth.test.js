import request from "supertest";
import app from "../server.js"; // Adjust the path if necessary

describe("Auth API", () => {
  it("should register a new teacher", async () => {
    const response = await request(app)
      .post("/api/auth/register/teacher")
      .send({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Teacher registered successfully");
  });

  it("should login an existing teacher", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "jane@example.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "jane@example.com", password: "wrongpassword" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid password");
  });
});
