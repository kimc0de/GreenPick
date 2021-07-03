const userController = require("../controllers/userController");
const router = require("express").Router();
const passport = require("passport");

// Profile
router.get("/user", userController.getAllApps, userController.renderProfile);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/auth/google/greenpick",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });

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
router.put("/user/update", userController.update, userController.redirectView);

module.exports = router;
