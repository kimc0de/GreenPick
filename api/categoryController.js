const httpStatus = require('http-status-codes');
const GreenPickApp = require("../models/greenPickApp");
const Category = require("../models/category");
const {respondNoResourceFound} = require("../controllers/errorController");

module.exports = {

  getAppsByCategory: async (req, res, next) => {
    try {
      let categories = await Category.find({name: req.params.categoryName});

      res.locals.apps = await GreenPickApp.find({category: categories[0]._id});

      next();
    }
    catch(error) {
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
