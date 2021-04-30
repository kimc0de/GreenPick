const detailsController = require('../controllers/homeController');
const router = require('express').Router();

//route to details page
router.get("/:id", detailsController.getDetailsPage);

module.exports = router;