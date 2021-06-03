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

  test("Add greenPick app", () => {
    const newGreenPickApp = { "category": "shopping", "name": "Stefi", "website": "www.example.com", "slogan": "Short Slogan", "description": "This is a description." };
    const testApp = new GreenPickApp(newGreenPickApp);

    testApp.save()
      .then(() => {
        GreenPickApp.find({})
          .then(result => {
            expect(result.length).toBe(1);
            expect(result[0]).toHaveProperty('_id');
          });
      })
      .catch((error) => {
        return error.message;
      });
  });

  test("Edit GreenPick app", () => {
    GreenPickApp.find({})
      .then(result => {
        let updatedName = "Updated name";
        GreenPickApp.findByIdAndUpdate(result[0]._id, {
          $set: { name: updatedName }
        }, { new: true }).then(updatedApp => {
          expect(updatedApp.name).toBe(updatedName);
        });
      })
  });

  test("Request details page", () => {
    GreenPickApp.find({})
      .then(result => {
        request(app)
          .get(`/app/${result[0]._id}`)
          .expect(200);
      }).catch(error => {
        throw error;
      });
  });

  test("Delete GreenPick app", () => {
    GreenPickApp.find({})
      .then(result => {
        GreenPickApp.findByIdAndRemove(result[0]._id)
          .then(() => {
            GreenPickApp.find({})
              .then(docs => {
                expect(docs.length).toBe(0);
              });
          })
      });
  });

});