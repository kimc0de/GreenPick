const GreenPickApp = require("../models/greenPickApp");
const User = require("../models/user");
const { respondNoResourceFound, redirectIfUnauthorized } = require("./errorController");
const Category = require("../models/category");
const fs = require("fs");

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
    
    let appImg;
    if (req.file) {
      let imgBuffer = fs.readFileSync(req.file.path);
      appImg = `data:${req.file.mimetype};base64,` + imgBuffer.toString('base64');
    } else {
      appImg = '/images/greenpick/logo3.svg';
    }

    try {
      let newApp = new GreenPickApp({
        category: req.body.category,
        name: req.body.name,
        website: req.body.website,
        slogan: req.body.slogan,
        description: req.body.description,
        image: appImg,
        userId: userId
      });

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
          appImg: app.image
        });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
}
