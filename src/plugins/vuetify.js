import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        el_primary: "#409EFF",
        el_success: "#67C23A",
        el_warning: "#E6A23C",
        el_danger: "#F56C6C",
        el_info: "#909399",
        go_primary: "#4285f4",
        go_success: "#34a853",
        go_warning: "#fbbc05",
        go_danger: "#ea4335",
        go_info: "#7c868d",
      }
    }
  }
});