const httpStatus = require('http-status-codes');

module.exports = {

  respondNoResourceFound: (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.render('error');
  },

  respondInternalError: (error, req, res) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log('ERROR:', error);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing  a problem!`);
  }

}