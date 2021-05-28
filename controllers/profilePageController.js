const User = require("../models/user");
const GreenPickApp = require("../models/greenPickApp");
const { respondNoResourceFound } = require("./errorController");

module.exports = {
    renderProfile: (req, res) => {
        res.render("user/profile");
    }
}
