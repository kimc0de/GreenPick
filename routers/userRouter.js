const userController = require('../controllers/userController');
const router = require('express').Router();

router.get("/signup", userController.renderSignUp);
router.post("/signup", userController.createUser, userController.redirectView);

router.get("/users", userController.getAllUsers);

module.exports = router;
