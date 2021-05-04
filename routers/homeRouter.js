const homeController = require('../controllers/homeController');
const router = require('express').Router();

//route to index page
router.get("/", homeController.getAllApps, homeController.renderIndex);

module.exports = router;
