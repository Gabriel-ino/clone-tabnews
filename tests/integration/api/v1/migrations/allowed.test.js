import database from "infra/database.js";
import orchestrator from "../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("Json's header must have allowed methods GET and POST", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  const responseBody = await response.json();
  expect(response.headers.get("Allow")).toBe("GET, POST");
});
