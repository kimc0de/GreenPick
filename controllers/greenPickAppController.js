const GreenPickApp = require("../models/greenPickApp");
const { respondNoResourceFound } = require("./errorController");

module.exports = {
  renderNewApp: (req, res) => {
    res.render("newApp");
  },

  saveGreenPickApp: (req, res) => {
    let newApp = new GreenPickApp({
      category: req.body.category,
      name: req.body.name,
      website: req.body.website,
      slogan: req.body.slogan,
      description: req.body.description
      //image: Buffer
    });
    newApp.save()
      .then(() => {
        res.render("newApp");
      })
      .catch(error => {
        res.send(error);
      });
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
          appImg: '/images/tooGoodToGoLogo.png' // will be replaced when we implement images
        });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
}