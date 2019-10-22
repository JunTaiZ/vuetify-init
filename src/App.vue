<template>
  <v-app>
    <core-drawer/>

    <core-app-bar/>

    <core-view/>

    <core-footer/>

    <!-- <v-content>
      <HelloWorld/>
    </v-content>-->
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreAppBar: () => import("@/components/core/AppBar"),
    CoreView: () => import("@/components/core/View")
  },
  computed: {},
  data: () => ({
    //
  }),
  methods: {},
  mounted() {
    this.Public.Notice("success test", "success");
    setTimeout(() => {
      this.Public.Notice("primary test", "primary");
    }, 3000);
    setTimeout(() => {
      this.Public.Notice("warning test", "warning");
    }, 6000);
    setTimeout(() => {
      this.Public.Notice("danger test", "danger");
    }, 9000);
    setTimeout(() => {
      this.Public.Notice("info test", "info");
    }, 12000);
  }
};
</script>
