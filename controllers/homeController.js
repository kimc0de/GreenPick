/**
 * Render the index.ejs file (index page).
 */
exports.getIndex = (req, res) => {
        let data = {
                // apps: [
                //         {
                //                 name: "Good on you",
                //                 description: "The Ultimate Guide to Sustainable Accessories",
                //                 category: "Shopping"
                //         },
                //         {
                //                 name: "Good on you",
                //                 description: "The Ultimate Guide to Sustainable Accessories",
                //                 category: "Shopping"
                //         },
                //         {
                //                 name: "Good on you",
                //                 description: "The Ultimate Guide to Sustainable Accessories",
                //                 category: "Shopping"
                //         },
                // ],

                appNameInCard: "Good on you!",
                appDescriptionInCard: "The Ultimate Guide to Sustainable Accessories",
                appCategoryBadge1: "Shopping",
                appCategoryBadge2: "Food"
        }
        res.render("index", {data: data});
};
