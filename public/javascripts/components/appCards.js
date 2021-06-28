const AppCards = {
  data() {
    return {
      apps: []
    }
  },

  created: function () {
    fetch(`/api/category/all`)
      .then(response => response.json())
      .then(json => {
        this.apps = json.data.apps;
      });
  }
}

const app = Vue.createApp(AppCards);

app.component('app-card', {
  props: ['app'],
  template: `
  <div class="col col-lg-4 col-md-6 col-12" onclick="location.href='/app/{{ app._id }}';">
    <div v-bind:class="'card-body ' + app.category.className + ' d-flex'">
      <img class="app-logo" v-bind:src="app.image">
      <div>
        <h2>{{ app.name }}</h2>
        <p class="app-slogan">{{ app.slogan }}</p>
        <div v-bind:class="'badge rounded-pill text-light ' + app.category.badgeName">{{ app.category.name }}</div>
      </div>
    </div>
  </div>`
})

app.mount('#app-card');