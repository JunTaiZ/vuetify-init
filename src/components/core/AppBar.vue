<template>
  <v-app-bar id="core-app-bar" absolute app color="transparent" flat height="88">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">{{ title }}</v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field class="mr-4 purple-input" color="purple" label="Search..." hide-details/>

        <v-btn icon to="/">
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </v-btn>

        <v-menu bottom left offset-y transition="slide-y-transition" open-on-hover>
          <template v-slot:activator="{ attrs, on }">
            <v-btn to="/message" class="toolbar-items" icon v-bind="attrs" v-on="on">
              <v-badge color="error" overlap>
                <template slot="badge">{{ message.length }}</template>
                <v-icon color="tertiary">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list dense flat>
              <v-list-item to="/message" v-for="notification in message" :key="notification">
                <v-list-item-title v-text="notification"/>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-btn to="/user-profile" icon>
          <v-icon color="tertiary">mdi-account</v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";

export default {
  data: () => ({
    message: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One"
    ],
    title: null,
    responsive: false
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  mounted() {
    this.title = this.$route.name;

    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  }
};
</script>

<style>
/* Fix coming in v2.0.8 */
#core-app-bar {
  width: auto;
}

#core-app-bar a {
  text-decoration: none;
}
</style>
