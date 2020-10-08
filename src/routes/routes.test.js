const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

it("Gets the location endpoint", async (done) => {
  const response = await request
    .get("/v1/location")
    .set({ "x-forwarded-for": "181.23.197.40" });

  expect(response.status).toBe(200);
  expect(response.body).toBe("Almagro");

  done();
});

it("Gets the current endpoint", async (done) => {
  const response = await request
    .get("/v1/current")
    .set({ "x-forwarded-for": "181.23.197.40" });

  expect(response.status).toBe(200);
  expect(response.body.city).toBe("Almagro");

  done();
});

it("Gets the forecast endpoint", async (done) => {
  const response = await request
    .get("/v1/forecast")
    .set({ "x-forwarded-for": "181.23.197.40" });

  expect(response.status).toBe(200);
  expect(response.body.city).toBe("Almagro");

  done();
});
