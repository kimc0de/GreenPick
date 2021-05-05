const mongoose = require("mongoose"),
    greenPickAppSchema = mongoose.Schema({
        category: String,
        name: String,
        website: String,
        slogan: String,
        description: String,
        image: Buffer
    });


module.exports = mongoose.model("greenPickApp", greenPickAppSchema);
