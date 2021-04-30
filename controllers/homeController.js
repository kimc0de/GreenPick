const { categories } = require('../categories');

/**
 * Render the index.ejs file (index page).
 */
exports.getIndex = (req, res) => {
  // to focus on one category, set activeCategory to the active label, else set to NULL
  let activeCategory = null;

  let data = {
    appNameInCard: "Good on you!",
    appDescriptionInCard: "The Ultimate Guide to Sustainable Accessories",
    appCategoryBadge1: "Shopping",
    appCategoryBadge2: "Food"
  }
  res.render("index", {
    activeCategory: activeCategory,
    categories: categories,
    data: data
  });
};

exports.getDetailsPage = (req, res) => {
  let id = req.params.id;
  let title = "Good on you!";
  let description = "Good On You is your trusted source of sustainability ratings for fashion. Join more than a million people worldwide using Good On You to shop better and create a sustainable future. The Good On You app gives you the power to easily check the impact of your favourite fashion brands on the issues you care about. Use the app to discover better alternatives, learn more about ethical fashion shopping, and get exclusive offers from the best brands.  "
  res.render('./detailsPage', 
  { 
    id: id,
    appTitle: title,
    appDescription: description
  });
};
