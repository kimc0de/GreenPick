const greenpickAppController = require('../controllers/greenpickAppController');
const router = require('express').Router();

// routes to add new app page
router.get("/add", greenpickAppController.renderNewApp);
router.post("/add", greenpickAppController.saveGreenpickApp);

// route to details page
router.get("/app/:id", greenpickAppController.getDetailsPage);

module.exports = router;