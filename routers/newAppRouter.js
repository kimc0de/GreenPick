const greenPickAppController = require('../controllers/newAppController');
const router = require('express').Router();

// routes to add new app page
router.get("/add", greenPickAppController.renderNewApp);
router.post("/add", greenPickAppController.saveGreenPickApp);

// route to details page
router.get("/app/:id", greenPickAppController.getDetailsPage);

module.exports = router;
