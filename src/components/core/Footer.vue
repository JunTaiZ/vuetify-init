<template>
  <v-footer id="core-footer" app inset height="82">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a href="https://vuetifyjs.com/" target="_blank">vuetify.js</a>, made with
      <v-icon color="tertiary" size="17">mdi-heart</v-icon>for a better web
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "Home", Link: "/#" },
      { name: "Creative Tim", Link: "/#" },
      { name: "About Us", Link: "/#" },
      { name: "Blog", Link: "/#" }
    ]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
