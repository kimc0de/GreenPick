app.component('homepage-base', {
  data() {
    return {
      apps: [],
      appsIsEmpty: false,
      categories: []
    }
  },

  created: function () {
    fetch(`/api/categories`)
      .then(response => response.json())
      .then(res => {
        this.categories = res.data.categories;
      }).then(() => {
        fetch(`/api/category/all`)
          .then(response => response.json())
          .then(json => {
            this.apps = json.data.apps;
          });
      });
  },

  methods: {
    getActive(categoryName) {
      let selectedElement;
      this.categories.forEach((category) => {
        let element = document.getElementById(category.name);
        //check which category is active and which are not, adjust class name
        if (categoryName !== category.name) {
          element.classList.add('inactive');
        }
        if (categoryName === category.name) {
          selectedElement = element; // save selected category for toggle filter
          element.classList.remove('inactive');
        }
      });
      // if button doesnt have 'selected' class, add selected, run category filter
      if (!selectedElement.classList.contains("selected")) {
        selectedElement.classList.add("selected");
        fetch("/api/category/" + categoryName + '?format=json')
          .then(response => response.json())
          .then((json) => {
            if (json.data.apps.length === 0) {
              this.appsIsEmpty = true;
            } else {
              this.appsIsEmpty = false;
              this.apps = json.data.apps;
            }
          });
      } else { // if press active button again, category filter will be reset, all apps will appear
        selectedElement.classList.remove("selected");
        this.categories.forEach((category) => {
          let element = document.getElementById(category.name);
          element.classList.remove("inactive");
        });
        fetch(`/api/category/all`)
          .then(response => response.json())
          .then(json => {
            if (json.data.apps.length === 0) {
              this.appsIsEmpty = true;
            } else {
              this.appsIsEmpty = false;
              this.apps = json.data.apps;
            }
          });
      }
    }
  },

  template: `
  <div class="container mt-3">
    <h2 id="categories-title">
      Or choose one of our categories:
    </h2>
    <div id="category-slider">
      <component-category
      v-bind:categories="categories"></component-category>
    </div>
  </div>

  <div class="container">
    <h2 id="suggestedAppsHeader">
      Suggested Apps:
    </h2>
    <h3 v-if="appsIsEmpty" class="pb-5">There is no green pick application for this category</h3>
    <div v-else id="app-card" class="row">
      <app-card
      v-bind:apps="apps"></app-card>
    </div>
  </div>
  `
});

app.mount('#homepage');
