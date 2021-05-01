const GreenpickApp = require("../models/greenpickApp");

exports.renderNewApp = (req, res) => {
    res.render("newApp");
}


exports.saveGreenpickApp = (req, res) => {
    let newApp = new GreenpickApp ({
        category: req.body.category,
        name: req.body.name,
        website: req.body.website,
        slogan: req.body.slogan,
        description: req.body.description
        //image: Buffer
    });
    newApp.save()
        .then(() => {
            console.log("!!!!!Thank you, you made a new entry!!!!");
            res.render("newApp");
        })
        .catch(error => {
            res.send(error);
        });
};
