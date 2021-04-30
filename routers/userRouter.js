const userController = require('../controllers/userController');
const router = require('express').Router();

//route to index page
router.get("/add", userController.renderNewApp);

module.exports = router;
