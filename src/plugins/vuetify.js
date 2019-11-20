import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#ff5722',
        secondary: '#ffeb3b',
        accent: '#e91e63',
        error: '#D32F2F',
        warning: '#ffc107',
        info: '#00bcd4',
        success: '#8bc34a',
      }
    }
  }
});