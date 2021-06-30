const app = Vue.createApp({});

app.component('app-card', {
  props: ['apps'],

  template: `
  <div v-for="app in apps" class="col col-lg-4 col-md-6 col-12" onclick="location.href='/app/{{ app._id }}';">
    <div :class="'card-body ' + app.category.className + ' d-flex'">
      <img class="app-logo" :src="app.image">
      <div>
        <h2>{{ app.name }}</h2>
        <p class="app-slogan">{{ app.slogan }}</p>
        <div :class="'badge rounded-pill text-light ' + app.category.badgeName">{{ app.category.name }}</div>
      </div>
    </div>
  </div>`
});