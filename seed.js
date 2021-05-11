const mongoose = require('mongoose'),
  GreenPickApp = require('./models/greenPickApp'),
  data = require('./seed.json')

mongoose.connect("mongodb://localhost:27017/green_pick", {
  useNewUrlParser: true,
});

mongoose.connection;

GreenPickApp.deleteMany()
  .exec()
  .then(() => {
    console.log("Green Pick app data is cleared");
  })

let apps = [];

// loop through seed to create promises
data.forEach((app) => {
  apps.push(GreenPickApp.create({
    category: app.category.toString().toLowerCase(),
    name: app.name,
    website: app.website,
    slogan: app.slogan,
    description: app.description
  }));
});

Promise.all(apps)
  .then( app => {
    console.log(JSON.stringify(app));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  })
