const httpStatus = require('http-status-codes');
const GreenPickApp = require("../models/greenPickApp");
const Category = require("../models/category");
const { respondNoResourceFound } = require("../controllers/errorController");

module.exports = {

  getAppsByCategory: async (req, res, next) => {
    try {
      if (req.params.categoryName == 'all') {
        let allApps = await GreenPickApp.find({});
        let apps = [];

        let promise = allApps.map(async (a) => {
          apps.push({
            "_id": a._id,
            "category": await Category.findById(a.category),
            "name": a.name,
            "website": a.website,
            "slogan": a.slogan,
            "description": a.description,
            "image": a.image,
            "userId": a.userId
          });
        });
        await Promise.all(promise);
        res.locals.apps = apps;
      } else {
        let categories = await Category.find({ name: req.params.categoryName });

        let allApps = await GreenPickApp.find({ category: categories[0]._id });
        let apps = [];

        allApps.forEach((a) => {
          apps.push({
            "_id": a._id,
            "category": categories[0],
            "name": a.name,
            "website": a.website,
            "slogan": a.slogan,
            "description": a.description,
            "image": a.image,
            "userId": a.userId
          });
        });

        res.locals.apps = apps;
      }

      next();
    }
    catch (error) {
      console.log(error);
      respondNoResourceFound(req, res);
    }
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },
}
