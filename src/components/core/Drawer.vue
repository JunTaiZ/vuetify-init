<template>
  <v-navigation-drawer
    id="app-drawer"
    :mini-variant.sync="mini"
    mini-variant-width="60"
    v-model="inputValue"
    :src="image"
    app
    color="deep-orange darken-3"
    dark
    floating
    mobile-break-point="991"
    persistent
    permanent
    :width="drawerWidth"
  >
    <template v-slot:img="attrs">
      <v-img v-bind="attrs" gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"/>
    </template>

    <v-list-item two-line>
      <!-- <v-list-item-avatar color="white">
        <v-img
          src="http://weixin.campusplus.com/uploads/images/tqeditor/8ce70cb2-5ab7-4102-a32c-392b9829c668.jpg"
          height="34"
          contain
        />
      </v-list-item-avatar> -->
      <v-list-item-action @click.stop="openDrawer()">
        <v-icon>mdi-account</v-icon>
      </v-list-item-action>

      <v-list-item-title class="title">{{ UserEmail }}</v-list-item-title>

      <v-btn icon @click.stop="closeDrawer()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider class="mx-3 mb-3"/>

    <v-list flat>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div/>

      <v-list-item v-for="(link, i) in links" :key="i" :to="link.to"
        active-class="deep-orange white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text"/>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    drawerWidth: 280,
    mini: false,
    links: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Dashboard"
      },
      {
        to: "/user-profile",
        icon: "mdi-account",
        text: "User Profile"
      },
      {
        to: "/table-list",
        icon: "mdi-clipboard-outline",
        text: "Table List"
      },
      {
        to: "/typography",
        icon: "mdi-format-font",
        text: "Typography"
      },
      {
        to: "/icons",
        icon: "mdi-chart-bubble",
        text: "Icons"
      },
      {
        to: "/maps",
        icon: "mdi-map-marker",
        text: "Maps"
      },
      {
        to: "/message",
        icon: "mdi-bell",
        text: "message"
      }
    ]
  }),

  computed: {
    ...mapGetters(['UserEmail']),
    ...mapState(["image", "color"]),
    inputValue: {
      get() {
        return "this.$store.state.app.drawer";
      },
      set(val) {
        // this.setDrawer(val);
      }
    }
  },
  
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapActions(["getUserInfo"]),
    openDrawer() {
      this.drawerWidth = 280
    },
    closeDrawer() {
      this.drawerWidth = 60
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.mini = true;
      } else {
        this.mini = false;
      }
    }
  },
  mounted() {
    // console.log(this.getUserInfo())
    this.onResponsiveInverted();
    // window.addEventListener("resize", this.onResponsiveInverted);
  },
};
</script>
