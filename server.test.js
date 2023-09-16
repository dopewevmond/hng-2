const request = require("supertest");
const mongoose = require("mongoose");
const createServer = require("./src/server");
const PersonSchema = require("./src/models/Person");
require("dotenv").config();

beforeEach((done) => {
  mongoose
    .connect(process.env.MONGO_TEST_URI)
    .then(() => {
      console.log("connected to test database");
    })
    .catch((err) => {
      console.log("unable to connect to test database");
      console.log(err);
      process.exitCode = 1;
    })
    .finally(() => {
      done();
    });
});

afterEach(async () => {
  await mongoose.connection.db.dropCollection("people");
});

const app = createServer();

test("GET Person resource", async () => {
  const personName = "john doe";
  const createdperson = await PersonSchema.create({
    name: personName,
  });
  const { _id } = createdperson;
  const response = await request(app).get(`/api/${_id.toString()}`);
  expect(response.status).toBe(200);
  expect(response.body.name).toEqual(personName);
});

test("PUT (update) a Person resource", async () => {
  const updatedName = "Jane Doe";
  const person = await PersonSchema.create({
    name: "wrong name",
  });
  expect(person.name).not.toEqual(updatedName);
  const { _id } = person;
  const response = await request(app)
    .put(`/api/${_id.toString()}`)
    .send({ name: updatedName })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  expect(response.status).toBe(200);
  expect(response.body.name).toEqual(updatedName);
});

test("CREATE Person resource", async () => {
  const body = {
    name: "Jimmy Cooks",
  };
  const response = await request(app)
    .post("/api")
    .send(body)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  expect(response.status).toBe(201);
  expect(response.body.name).toEqual(body.name);
});

test("DELETE Person resource", async () => {
  const { _id } = await PersonSchema.create({
    name: "wrong name",
  });

  const BeforeDeletionGETRequestResponse = await request(app).get(`/api/${_id.toString()}`);
  expect(BeforeDeletionGETRequestResponse.status).toBe(200);
  
  const DELETERequest = await request(app).delete(`/api/${_id.toString()}`)
  expect(DELETERequest.status).toBe(204);
  
  const AfterDeletionGETRequestResponse = await request(app).get(`/api/${_id.toString()}`);
  expect(AfterDeletionGETRequestResponse.status).toBe(404);
});
