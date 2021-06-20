const router = require("express").Router(),
  categoryController = require("../api/categoryController"),
  userController = require("../controllers/userController");

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.get("/api/user/apps", userController.getAllApps, userController.respondJSON);

router.use(categoryController.errorJSON);

module.exports = router;
