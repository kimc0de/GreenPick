app.component('component-category', {
  data() {
    return {
      categories: []
    }
  },

  created: function() {
    fetch(`/api/categories`)
      .then(response => response.json())
      .then(res => {
        this.categories = res.data.categories;
      });
  },

  methods: {
    getActive(categoryName) {
      this.categories.forEach( (category) => {
        let element = document.getElementById(category.name);
        if (categoryName !== category.name) {
          element.classList.add('inactive');
        }
        if (categoryName === category.name) {
          element.classList.remove('inactive');
        }
      })
    }
  },

  template:
    `
      <button :id="category.name" v-for="category in categories" :name="category.name" class="badge" 
      :class="category.badgeName" @click='getActive(category.name)'>
        {{category.name}}
      </button>
  `
});
