const greenPickAppController = require('../controllers/greenPickAppController');
const upload = require('../imageUpload');
const router = require('express').Router();

// routes to add new app page
router.get("/user/add", greenPickAppController.renderNewApp);
router.post("/user/add", upload.single('image'), greenPickAppController.saveGreenPickApp);

// routes to edit app page
router.get("/app/:id/edit", greenPickAppController.renderNewApp);
router.put("/app/:id/edit", greenPickAppController.editGreenPickApp);

// route to delete app page
router.delete("/app/:id/delete", greenPickAppController.deleteGreenPickApp);

// route to details page
router.get("/app/:id", greenPickAppController.getDetailsPage);
router.post("/app/:id", greenPickAppController.addFavouriteApp);

module.exports = router;
