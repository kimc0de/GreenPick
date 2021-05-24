const userController = require('../controllers/userController');
const router = require('express').Router();

// Signup
router.get("/signup", userController.renderSignUp);
router.post("/signup", userController.validateSignUp, userController.createUser, userController.redirectView);

// Login
router.get("/login", userController.renderLogin);

router.get("/users", userController.getAllUsers);

// Edit profile
router.get("/edit", userController.renderEdit);

module.exports = router;
