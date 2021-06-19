const User = require("../models/user");
const Category = require("../models/category");
const { respondNoResourceFound, redirectIfUnauthorized } = require("./errorController");
const passport = require("passport");
const GreenPickApp = require("../models/greenPickApp");

module.exports = {

  getAllApps: async (req, res, next) => {
    redirectIfUnauthorized(req, res);

    try {
      let apps = await GreenPickApp.find({ userId: req.user._id });
      req.data = apps;
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
    next();
  },

  renderProfile: async (req, res, next) => {
    let userId = req.user._id;

    try {
      const user = await User.findById(userId);
      res.render("user/profile", {
        user: user,
        categories: await Category.find({}),
        data: req.data,
        app: req.app,
      });
    } catch (error) {
      console.log(`Error :${error.message}`);
      next(error);
    }
  },

  renderLogin: (req, res) => {
    res.render("user/login");
  },

  renderSignUp: (req, res) => {
    res.render("user/signup");
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  },

  validateSignUp: (req, res, next) => {
    //validate password repeat
    let password = req.body.password;
    let passwordRepeat = req.body.password_repeat;

    if (password === passwordRepeat) {
      next();
    } else {
      req.flash("error", `Please make sure your passwords match.`);
      res.redirect("/signup");
    }
  },

  createUser: (req, res, next) => {
    let userParams = {
      username: req.body.username,
      email: req.body.email,
    };

    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `Account created successfully!`);
        res.locals.redirect = "/login";
        next();
      } else if (error) {
        console.error(`Error creating user: ${error.message}`);
        res.locals.redirect = "/signup";
        let errormessage = ``;
        if (error.message.includes('email')) {
          errormessage += `An account for this email already exists. `;
        }
        if (error.message.includes('username')) {
          errormessage += `This username is taken.`;
        }
        if (errormessage.length == 0) {
          errormessage = `Failed to create user account. ➥${error.message}.`;
        }
        req.flash("error", errormessage);
        next();
      }
    });
  },

  getAllUsers: (req, res) => {
    User.find({})
      .then(users => {
        res.render("user/index", {
          users: users
        })
      })
      .catch(error => {
        res.send(error);
        res.redirect("/");
      });
  },

  renderEdit: (req, res, next) => {
    redirectIfUnauthorized(req, res);
    res.render('user/edit', {
      user: req.user
    });
  },

  update: (req, res, next) => {
    let userId = req.user._id,
      userParams = {
        username: req.body.username,
        email: req.body.email
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/user/edit`;
        req.flash("success", `Your changes have been saved!`);
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID:${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  addFavouriteApp: async (req, res, next) => {

    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let appId = req.params.id;

    try {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { favApps: appId }
      });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }

    next();
  },

  getFavouriteApps: async (req, res) => {
    try {
      let favApps = await GreenPickApp.find({ userId: req.user._id });
      req.data = favApps;
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
};
