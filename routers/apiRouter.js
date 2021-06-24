const router = require("express").Router(),
  categoryController = require("../api/categoryController");
  userFavAppsController = require("../api/userFavAppsController");

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.get("/api/user/favourites", userFavAppsController.getFavouriteAppsByUser, userFavAppsController.respondJSON);

module.exports = router;
