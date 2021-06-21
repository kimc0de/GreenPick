const router = require("express").Router(),
    categoryController = require("../api/categoryController"),
    userAppsController = require("../api/userAppsController"),
    userController = require('../controllers/homeController');

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.get("/api/user/apps", userController.getAllApps, userAppsController.respondJSON);

router.use(categoryController.errorJSON);

module.exports = router;
