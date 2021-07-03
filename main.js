const express = require('express'),
  app = express(),
  path = require("path"),
  layouts = require('express-ejs-layouts'),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  passport = require("passport"),
  User = require("./models/user"),
  expressValidator = require("express-validator"),
  methodOverride = require("method-override"),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config({path: __dirname + '/.env'});

//set the view engine as ejs
app.set("view engine", "ejs");

//set port to the environment variable PORT value or 3000 if the former value is undefined
app.set("port", process.env.PORT || 3000);

//tell express to use body-parser for processing URL encoded and JSON as parameters
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(expressValidator());

app.use(layouts);

//defines the folder for static files (css f.e.)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://wtat1-group-03.herokuapp.com/auth/google/greenpick",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id,
      username: profile.displayName
    }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//all the routers:
app.use(require('./routers/userRouter'));
app.use(require('./routers/homeRouter'));
app.use(require('./routers/greenPickAppRouter'));
app.use(require('./routers/apiRouter'));
app.use(require('./routers/errorRouter'));

module.exports = app;
