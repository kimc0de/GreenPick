const User = require("../models/user");
const { respondNoResourceFound } = require("./errorController");

module.exports = {
  renderLogin: (req, res, next) => {
    res.render("user/login");
  },

  renderSignUp: (req, res) => {
    res.render("user/signup");
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
      password: req.body.password
    };
    User.create(userParams)
      .then(user => {
        req.flash("success", `Account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/signup";
        if (error.message.includes('email')) {
          req.flash("error", `An account for this email already exists.`);
        } else if (error.message.includes('username')) {
          req.flash("error", `This username is taken.`);
        } else {
          req.flash("error", `Failed to create user account because: ➥${error.message}.`);
        }
        next();
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

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
