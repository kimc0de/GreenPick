const router = require("express").Router(),
  categoryController = require("../api/categoryController");

router.get("/api/category/:categoryName", categoryController.getAppsByCategory, categoryController.respondJSON);
router.use(categoryController.errorJSON);

module.exports = router;
