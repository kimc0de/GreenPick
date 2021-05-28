const GreenPickApp = require("../models/greenPickApp");
const User = require("../models/user");
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
      userId: req.params.userId,
      app: editApp
    });
  },

  saveGreenPickApp: async (req, res) => {
    let userId = req.params.userId;

    let newApp = new GreenPickApp({
      category: req.body.category,
      name: req.body.name,
      website: req.body.website,
      slogan: req.body.slogan,
      description: req.body.description,
      //image: Buffer
      userId: userId
    });

    try {
      let savedApp = await newApp.save();
      await User.findByIdAndUpdate(userId, {
        $addToSet: { apps: savedApp }
      });
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
      }, { new: true });
      res.render("confirmation", { app: app });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Delete Green Pick app 
   */
  deleteGreenPickApp: async (req, res) => {
    let appId = req.params.id;

    try {
      let app = await GreenPickApp.findByIdAndRemove(appId);
      let user = await User.findByIdAndUpdate(app.userId, {
        $pull: { apps: app._id }
      }, { new: true });
      req.flash("success", `Your GreenPick "${app.name}" has been deleted.`);
      res.redirect(`/user/${user._id}`);
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
