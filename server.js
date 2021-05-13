const app = require("main");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost:27017/green_pick",
    {useNewUrlParser: true}
);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at ${app.get("port")}`);
});
