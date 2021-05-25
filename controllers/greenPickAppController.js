const GreenPickApp = require("../models/greenPickApp");
const { respondNoResourceFound } = require("./errorController");
const { categories } = require('../categories');

module.exports = {
  renderNewApp: async (req, res) => {
    let editAppId = req.params.id;
    let editApp;

    if (editAppId) {
      try {
        editApp = await GreenPickApp.findById(editAppId);
      } catch (error) {
        console.error(error);
        respondNoResourceFound(req, res);
      }
    }

    res.render("newApp", {
      categories: categories,
      app: editApp
    });
  },

  saveGreenPickApp: async (req, res) => {
    let newApp = new GreenPickApp({
      category: req.body.category,
      name: req.body.name,
      website: req.body.website,
      slogan: req.body.slogan,
      description: req.body.description
      //image: Buffer
    });

    try {
      await newApp.save();
      res.render("confirmation");
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Edit Green Pick app
   */
  editGreenPickApp: async (req, res) => {
    let appId = req.params.id;

    let appParams = {
      category: req.body.category,
      name: req.body.name,
      website: req.body.website,
      slogan: req.body.slogan,
      description: req.body.description
      //image: Buffer
    };

    try {
      const app = await GreenPickApp.findByIdAndUpdate(appId, {
        $set: appParams
      });
      res.render("confirmation", { app: app });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },


  /**
   * Green Pick app details page
   */
  getDetailsPage: async (req, res) => {
    let id = req.params.id;
    try {
      const app = await GreenPickApp.findById(id);
      res.render('./detailsPage',
        {
          id: id,
          app: app,
          appImg: '/images/brandlogos/tooGoodToGo.png' // will be replaced when we implement images
        });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
}
