const mongoose = require("mongoose"),
    greenPickAppSchema = mongoose.Schema({
        category: {type: String, required: true},
        name: {type: String, required: true},
        website: {type: String, required: true},
        slogan: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: Buffer, required: false}
    });

module.exports = mongoose.model("greenPickApp", greenPickAppSchema);
