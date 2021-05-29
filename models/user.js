const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
  userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    apps: [{ type: mongoose.Schema.Types.ObjectId, ref: "greenPickApp" }]
  });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

module.exports = mongoose.model("users", userSchema);
