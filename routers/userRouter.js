const userController = require('../controllers/userController');
const router = require('express').Router();

// Profile
router.get("/user", userController.renderProfile);

// Signup
router.get("/signup", userController.renderSignUp);
router.post("/signup", userController.validateSignUp, userController.createUser, userController.redirectView);

// Login
router.get("/login", userController.renderLogin);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout, userController.redirectView);

router.get("/users", userController.getAllUsers);

// Edit profile
router.get("/user/edit", userController.renderEdit);
router.post("/user/update", userController.update, userController.redirectView);

module.exports = router;
