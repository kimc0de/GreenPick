const mongoDB = require("mongoose");
const User = require("../models/user");

describe("Test the userController", () => {
  beforeAll(() => {
    mongoDB.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  test("User has been created after signup", (done) => {
    const newUser = {
      username: "testing",
      email: "test@testing.com",
      password: "test"
    };
    const testUser = new User(newUser);

    testUser.save()
      .then(() => {
        User.find({})
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

  test('User edit profile', (done) => {
    User.find({})
      .then(result => {
        let updatedName = "Updated name";
        User.findByIdAndUpdate(result[0]._id, {
          $set: { username: updatedName }
        }, { new: true }).then(updatedUser => {
          expect(updatedUser.username).toBe(updatedName);
          done();
        });
      });
  });

});
