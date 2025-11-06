test("PUT method on api/v1/migrations should return 405 and error", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  const responseBody = await response.json();

  expect(response.status).toBe(405);
  expect(responseBody).toEqual({ error: "Method PUT not allowed" });
});
