const router = require("express").Router(),
  categoryController = require("../api/categoryController");
  userFavAppsController = require("../api/userFavAppsController");
  userAppsController = require('../api/userAppsController');

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.get("/api/user/favourites", userFavAppsController.getFavouriteAppsByUser, userFavAppsController.respondJSON);
router.get("/api/user/apps", userAppsController.getAllApps, userAppsController.respondJSON);

module.exports = router;
