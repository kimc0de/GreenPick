const request = require("supertest");
const app = require("../main");
const mongoDB = require("mongoose");

describe("Test the homeController", () => {
  beforeAll(() => {
    mongoDB.connect(process.env.MONGODB_URI ||
      "mongodb://localhost:27017/green_pick",
      {useNewUrlParser: true});
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  test("Request index page", () => {
    return request(app)
      .get("/")
      .expect(200);
  });

});