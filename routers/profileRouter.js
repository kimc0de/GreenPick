const profilePageController = require('../controllers/profilePageController');
const router = require('express').Router();

router.get("/profile", profilePageController.renderProfile);

module.exports = router;
