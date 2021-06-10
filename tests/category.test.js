import request from './request';
const app = require("../main");
const mongoDB = require("mongoose");
const GreenPickApp = require("../models/greenPickApp");
const Category = require("../models/category");
const categories = require("../categories.json");

describe("Test category slider", () => {
  beforeAll((done) => {
    mongoDB.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    let insertCategories = async (array) => {
      const categoryMap = array.map(async (c) => {
        await new Category(c).save();
      });
      await Promise.all(categoryMap);
      console.log("++ The amount of categories seeded: " + categoryMap.length);
    }
    insertCategories(categories).then(done());
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  test("Filter by category API test", async() => {
    // adding an app
    try {
      const categoryIds = await Category.find({});
      const newGreenPickApp = {
        "category": categoryIds[0]._id,
        "name": "Stefi",
        "website": "www.example.com",
        "slogan": "Short Slogan",
        "description": "This is a description."
      };
      const testApp = new GreenPickApp(newGreenPickApp);

      await testApp.save();
      // async/await can be used.

      const data = await getAppByCategory("food");
      console.log(data);
      expect(data.data.apps[0].name).toEqual('Stefi');

    } catch (error) {
      console.error(error);
    }

  });
});

function getAppByCategory(category) {
  return request('/api/category' + category);
}
