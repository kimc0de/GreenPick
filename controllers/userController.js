const User = require("../models/user");
const { respondNoResourceFound } = require("./errorController");

module.exports = {
  renderLogin: (req, res) => {
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
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        respondNoResourceFound();
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
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render('user/edit', {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID:${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/user/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID:${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
};
