const request = require("supertest");
const app = require("../main");
const mongoDB = require("mongoose");
const GreenPickApp = require("../models/greenPickApp");

describe("Test the greenPickAppController", () => {
  beforeAll(() => {
    mongoDB.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  test("Add greenPick app", (done) => {
    const newGreenPickApp = { "category": "shopping", "name": "Stefi", "website": "www.example.com", "slogan": "Short Slogan", "description": "This is a description." };
    const testApp = new GreenPickApp(newGreenPickApp);

    testApp.save()
      .then(() => {
        GreenPickApp.find({})
          .then(result => {
            expect(result.length).toBe(1);
            expect(result[0]).toHaveProperty('_id');
            done();
          });
      })
      .catch((error) => {
        done(error.message);
      });
  });

  test("Request details page", () => {
    GreenPickApp.find({})
      .then(result => {
        return request(app)
          .get(`/app/${result[0]._id}`)
          .expect(200);
      })
      .catch(error => {
        throw error;
      });
  });

});