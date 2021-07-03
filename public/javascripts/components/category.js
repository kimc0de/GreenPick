app.component('component-category', {
  props: ['categories'],

  methods: {
    getActive(categoryName) {
      this.$parent.getActive(categoryName);
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
