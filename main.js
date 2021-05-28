const express = require('express'),
  app = express(),
  path = require("path"),
  layouts = require('express-ejs-layouts'),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");

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

app.use(layouts);

//defines the folder for static files (css f.e.)
app.use(express.static(path.join(__dirname, 'public')));

//flash messaging (22.1)
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

//22.2
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//all the routers:
app.use(require('./routers/userRouter'));
app.use(require('./routers/profileRouter'))
app.use(require('./routers/homeRouter'));
app.use(require('./routers/newAppRouter'));
app.use(require('./routers/errorRouter'));

module.exports = app;
