const userController = require('../controllers/userController');
const router = require('express').Router();

// Profile
router.get("/user/:userId", userController.renderProfile);

// Signup
router.get("/signup", userController.renderSignUp, userController.redirectView);
router.post("/signup", userController.validateSignUp, userController.createUser, userController.redirectView);

// Login
router.get("/login", userController.renderLogin);

router.get("/users", userController.getAllUsers);

module.exports = router;
