import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios"
import qs from "qs"
import Public from './plugins/public'
import Service from './plugins/service'
import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
import './assets/css/index.css'

import { longStackSupport } from 'q';

Vue.config.productionTip = false
Vue.use(router)

Vue.use(Notifications, { velocity })

Vue.prototype.$ajax = axios
Vue.prototype.Public = Public
Vue.prototype.Service = Service

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
axios.interceptors.request.use(
  function (config) {
    config.baseURL = "http://localhost:3300"
    const token = localStorage.getItem("token")
    // console.log("token:",token)
    if (token)
      config.headers.common["Authorization"] = "Bearer " + token
    // config.params = config.data
    config.data = qs.stringify(config.data)
    console.log("config.data:", config.data)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (res) {
    if (res.status === 200) {
      return res.data
    }
    Vue.notify({
      type: 'warn',
      title: '服务器出错'
    })
  },
  function (res) {
    Vue.notify({
      type: 'error',
      title: '服务器出错'
    })
    console.error(res);

  }
)

router.beforeEach((to, from, next) => {
  // console.log(to, from, next);

  if (to.meta.requireAdmin) {
    if (localStorage.getItem("level") == "admin") next() // TODO: 权限判断
    else {
      next({
        path: from.fullPath
      })
      Public.Notice("无此权限", "error")
    }
  } else if (to.meta.requireLogin) {
    // console.log("login localStorage:", localStorage.getItem("token"))
    let LSToken = localStorage.getItem('token')
    if (LSToken && LSToken !== null && LSToken !== undefined) {
      let dis = store.dispatch('getUserInfo')
      // dis.then(val => console.log(val)).catch(err => console.log(err))
      store.commit('updateToken', localStorage.getItem('token'))
      // console.log(store.state.token);
      next()
    } else {
      store.commit("clearUserInfo")
      next({
        path: "/login",
        // querry: { redirect: to.fullPath } //从哪个页面跳转
      })
      Vue.notify('请先登陆')
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
