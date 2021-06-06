const mongoose = require("mongoose"),
  categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    className: {type: String, required: true},
    badgeName: {type: String, required: true}
  });

module.exports = mongoose.model("categories", categorySchema);
