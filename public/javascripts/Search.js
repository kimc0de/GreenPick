const appSearch = Vue.createApp({});

appSearch.component('component-search', {
  data() {
    return {
      query: '',
      apps: []
    }
  },

  methods: {
    search: function () {
      if(this.query) {
        fetch(`/?format=json`)
          .then(response => response.json())
          .then(res => {
            if (this.query) {
              this.apps = res.filter(app =>
                app.name.toLowerCase().includes(this.query.toLowerCase())
              );
              console.log(this.apps);
            } else {
              this.apps = res.results;
            }
          });
      }
    }
  },

  created() {
    this.search();
  },

  template:
  `
    <div id="homepage-search" class="search-bg">
      <form v-on:submit.prevent="search">
      <div class="container p-5">
        <h1>Find your sustainable alternative</h1>
        <div class="search-container row">
          <div class="col-12 col-md-8 my-auto">
            <input class="form-control search-field" type="text" v-model="query" value="" placeholder="What are you looking for?">
          </div>
          <div class="col-12 col-md-4 my-auto pb-2 pb-md-0">
            <button type="submit" class="btn btn-primary search-button" href="#">Search</button>
          </div>
        </div>
      </div>
      </form>
    </div>
    
    <div>
        <p v-for="app in apps" >
          <p>{{ app.name }}</p>
          <p>{{ app.slogan }}</p>
          <p>{{ app.description }}</p>
        </p>
    </div>
  `
});

appSearch.mount('#search');
