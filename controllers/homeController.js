/**
 * Render the index.ejs file (index page).
 */
exports.getIndex = (req, res) => {
  // categories data - we may want to reuse this (then transfer to a separate file)
  let categories = [
    {
      label: "Food",
      className: "category-badge-food",
      current: false
    },
    {
      label: "Lifestyle",
      className: "category-badge-lifestyle",
      current: false
    },
    {
      label: "Shopping",
      className: "category-badge-shopping",
      current: false
    },
    {
      label: "Social",
      className: "category-badge-social",
      current: false
    },
    {
      label: "Household",
      className: "category-badge-household",
      current: false
    },
    {
      label: "Transport",
      className: "category-badge-transport",
      current: false
    }
  ]

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
  res.render("index", {
    categorySearch: false,
    categories: categories,
    data: data
  });
};
