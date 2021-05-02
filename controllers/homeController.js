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
