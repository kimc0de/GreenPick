const httpStatus = require('http-status-codes');
const {respondNoResourceFound, redirectIfUnauthorized} = require("../controllers/errorController");

module.exports = {
  
  getFavouriteAppsByUser: async (req, res, next) => {
    try {
      if (!req.user) {
        redirectIfUnauthorized(req, res)
      } else {
        res.locals = req.user.favApps
        next()
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