const router = require("express").Router(),
  categoryController = require("../api/categoryController");
  userFavAppsController = require("../api/userFavAppsController");

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.get("/api/favourites", userFavAppsController.getFavouriteAppsByUser, userFavAppsController.respondJSON);
// router.use(categoryController.errorJSON);

module.exports = router;
