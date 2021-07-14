const httpStatus = require('http-status-codes');
const {respondNoResourceFound, redirectIfUnauthorized} = require("../controllers/errorController");
const GreenPickApp = require("../models/greenPickApp");

module.exports = {

  getFavouriteAppsByUser: async (req, res, next) => {
    try {
      if (!req.user) {
        redirectIfUnauthorized(req, res)
      } else {
        let favApps = req.user.favApps;
        res.locals = await GreenPickApp.find({_id: favApps});
        next();
      }
    } catch (error) {
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
