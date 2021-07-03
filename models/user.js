const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    apps: [{ type: mongoose.Schema.Types.ObjectId, ref: "greenPickApp" }],
    favApps: [{ type: mongoose.Schema.Types.ObjectId, ref: "greenPickApp" }],
    googleId: {type: String}
  });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("users", userSchema);
