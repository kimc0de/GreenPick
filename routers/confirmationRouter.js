const homeController = require('../controllers/homeController');
const router = require('express').Router();

//route to confirmation page
router.get("/confirmation", homeController.getConfirmation);

module.exports = router;