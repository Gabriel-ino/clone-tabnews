import database from "infra/database.js";
import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("DELETE method on api/v1/migrations should return status code 405 and error", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });

  const responseBody = await response.json();
  expect(response.status).toBe(405);
  expect(responseBody).toEqual({ error: "Method DELETE not allowed" });
});
