const newAppController = require('../controllers/newAppController');
const router = require('express').Router();

// routes to add new app page
router.get("/add", newAppController.renderNewApp);
router.post("/add", newAppController.saveGreenPickApp);

// route to details page
router.get("/app/:id", newAppController.getDetailsPage);

module.exports = router;
