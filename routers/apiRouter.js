const router = require("express").Router(),
  categoryController = require("../api/categoryController");
  userFavAppsController = require("../api/userFavAppsController");

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.use(categoryController.errorJSON);

router.get("/api/favourites/:username", userFavAppsController.getFavouriteAppsByUser, userFavAppsController.respondJSON);

module.exports = router;
