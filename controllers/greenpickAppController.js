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
            res.render("newApp");
        })
        .catch(error => {
            res.send(error);
        });
};

/**
 * Green Pick app details page
 */

exports.getDetailsPage = async (req, res) => {
    let id = req.params.id;
    const app = await GreenpickApp.findById(id);
    const title = app.name;
    const description = app.description;

    res.render('./detailsPage',
        {
            id: id,
            appTitle: title,
            appDescription: description
        });
};