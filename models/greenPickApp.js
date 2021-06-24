const mongoose = require("mongoose"),
    greenPickAppSchema = mongoose.Schema({
        category: {type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true},
        name: {type: String, required: true},
        website: {type: String, required: true},
        slogan: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
    });

module.exports = mongoose.model("greenPickApp", greenPickAppSchema);
