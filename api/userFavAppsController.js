const httpStatus = require('http-status-codes');
const GreenPickApp = require("../models/greenPickApp");
const User = require("../models/user");
const {respondNoResourceFound} = require("../controllers/errorController");

module.exports = {
  
  getFavouriteAppsByUser: async (req, res, next) => {
    
    try {
      let userName = await User.find({ username: req.params.username});
      res.locals.favApps = await GreenPickApp.find({ username: userName});
      next()
      
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
  
  errorJSON: (error, req, res) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  
  
  
}