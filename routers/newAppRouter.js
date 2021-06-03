const greenPickAppController = require('../controllers/greenPickAppController');
const router = require('express').Router();

// routes to add new app page
router.get("/user/add", greenPickAppController.renderNewApp);
router.post("/user/add", greenPickAppController.saveGreenPickApp);

// routes to edit app page
router.get("/app/:id/edit", greenPickAppController.renderNewApp);
router.post("/app/:id/edit", greenPickAppController.editGreenPickApp);

// rout to delete app page
router.get("/app/:id/delete", greenPickAppController.deleteGreenPickApp);

// route to details page
router.get("/app/:id", greenPickAppController.getDetailsPage);

module.exports = router;
