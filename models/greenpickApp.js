const mongoose = require("mongoose"),
    greenpickAppSchema = mongoose.Schema({
        category: String,
        name: String,
        website: String,
        slogan: String,
        description: String,
        image: Buffer
    });


module.exports = mongoose.model("Subscriber", greenpickAppSchema);