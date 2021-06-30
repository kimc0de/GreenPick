app.component('homepage-base', {
  // data() {
  //   return {
  //     apps: [],
  //     categories: []
  //   }
  // },
  template: `
  <div class="container mt-3">
    <h2 id="categories-title">
      Or choose one of our categories:
    </h2>
    <div id="category-slider">
      <component-category></component-category>
    </div>
  </div>

  <div class="container">
    <h2 id="suggestedAppsHeader">
      Suggested Apps:
    </h2>
    <div id="app-card" class="row">
      <app-card></app-card>
    </div>
  </div>
  `
});

app.mount('#homepage');