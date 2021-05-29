const User = require("../models/user");
const { respondNoResourceFound } = require("./errorController");
const passport = require("passport");

module.exports = {
  renderProfile: (req, res) => {
    res.render("user/profile");
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

    req.sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = '/signup';
        next();
      } else {
        next();
      }
    });
  },

  createUser: (req, res, next) => {
    let userParams = {
      username: req.body.username,
      email: req.body.email,
    };
    
    let newUser = new User(userParams);

    User.register(newUser, req.body.password, (error, user) => {
      if(user){
        req.flash("success", `Account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      } else {
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
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render('user/edit', {
          user: user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID:${error.message}`);
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
        res.locals.redirect = `/user/${userId}/edit`;
        res.locals.user = user;
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
  }
};
