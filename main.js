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
  methodOverride = require("method-override");

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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.use(require('./routers/newAppRouter'));
app.use(require('./routers/errorRouter'));

module.exports = app;
