<template>
  <v-app>
    <core-drawer/>

    <core-app-bar/>

    <core-view/>

    <core-footer/>
    <notifications
      group="notify"
      position="top right"
      animation-type="velocity"
      class="notify-style"
    />
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
    
  }
};
</script>
