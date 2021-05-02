const { categories } = require('../categories');
const GreenpickApp = require("../models/greenpickApp");

/**
 * Render the index.ejs file (index page).
 */
module.exports = {
  /**
   * Get all app from data base
   * TODO: limit the apps show on index page
   */
  getAllApps: (req, res, next) => {
    GreenpickApp.find((error, apps) => {
      if(error) {
        res.render("error");
      }
      req.data = apps;
      next();
    })
  },

  renderIndex: (req, res) => {
    // to focus on one category, set activeCategory to the active label, else set to NULL
    let activeCategory = null;
    res.render("index", {
      activeCategory: activeCategory,
      categories: categories,
      data: req.data
    });
  }
}

