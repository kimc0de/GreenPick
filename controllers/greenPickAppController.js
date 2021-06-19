const GreenPickApp = require("../models/greenPickApp");
const User = require("../models/user");
const { respondNoResourceFound, redirectIfUnauthorized } = require("./errorController");
const Category = require("../models/category");

module.exports = {
  renderNewApp: async (req, res) => {
    redirectIfUnauthorized(req, res);

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

    res.render("greenPickApp/newApp", {
      categories: await Category.find({}),
      app: editApp
    });
  },

  saveGreenPickApp: async (req, res) => {
    let userId = req.user._id;

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
      res.render("greenPickApp/confirmation");
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
      res.render("greenPickApp/confirmation", { app: app });
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
      res.redirect(`/user`);
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
      const category = await Category.findById(app.category);

      res.render('./greenPickApp/detailsPage',
        {
          id: id,
          app: app,
          categoryClass: category.className,
          appImg: '/images/brandlogos/tooGoodToGo.png' // will be replaced when we implement images
        });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Green Pick app adding favourite app
   */ 
  addFavouriteApp: async (req, res, next) => {

    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let appId = req.params.id;

    try {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { favApps: appId }
      });
      res.redirect("back");
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }

    next();
  },

  /**
   * Green Pick app getting favourite app
   */ 
  getFavouriteApps: async (req, res) => {
    try {
      let favApps = await GreenPickApp.find({ userId: req.user._id });
      req.data = favApps;
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
}
