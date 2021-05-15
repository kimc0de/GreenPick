const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost:27017/green_pick",
    {useNewUrlParser: true}
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});


const port = 3000,
  express = require('express'),
  app = express(),
  path = require("path"),
  layouts = require('express-ejs-layouts');

//set the view engine as ejs
app.set("view engine", "ejs");

//set port to the environment variable PORT value or 3000 if the former value is undefined
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

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

//all the routers:
//app.use(require('./routers/userRouter'));
app.use(require('./routers/homeRouter'));
app.use(require('./routers/newAppRouter'));
app.use(require('./routers/errorRouter'));

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${app.get("port")}`);
// });
