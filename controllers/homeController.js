const { categories } = require('../categories');
const GreenPickApp = require("../models/greenPickApp");
const {respondNoResourceFound} = require("./errorController");

/**
 * Render the index.ejs file (index page).
 */
module.exports = {
  /**
   * Get all app from data base
   * TODO: limit the apps show on index page
   */
  getAllApps: (req, res, next) => {
    GreenPickApp.find((error, apps) => {
      try {
        req.data = apps;
      }
      catch(error) {
        console.log(error);
        respondNoResourceFound(req, res);
      }

      next();
    })
  },

  renderIndex: (req, res) => {
    if (req.query.format === "json") {
      res.json(req.data);
    } else {
      // to focus on one category, set activeCategory to the active label, else set to NULL
      let activeCategory = null;
      res.render("index", {
        activeCategory: activeCategory,
        categories: categories,
        data: req.data,
        userId: req.params.userId
      });
    }

  }
}
