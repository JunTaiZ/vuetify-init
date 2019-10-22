import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios"
import qs from "qs"
import Public from './plugins/public'
import Service from './plugins/service'

Vue.config.productionTip = false
Vue.use(router)

Vue.prototype.$ajax = axios
Vue.prototype.Public = Public
Vue.prototype.Server = Service

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    // console.log("token:",token)
    if (token)
      config.headers.common["Authorization"] = "Bearer " + token
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
    console.log(res)
    if (res.data.code != "200") {
      switch (res.data.ret) {
        case "10":
          store.commit("clearUserInfo")
          router.push({
            path: "/login",
            querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
          })
          break
        case "18":
          //"无权限"
          break
        default:
          break
      }
      Public.Notice(res.data.msg, "warning")
    }
    else {
      if (res.data.data.token) {
        console.log("updateToken", res.data.data.token);
        store.commit("updateToken", res.data.data.token);
      }
      if (res.data.data.user) {
        console.log("updateUserInfo", res.data.data.user);
        store.commit("updateUserInfo", res.data.data.user);
      }
    }
    return res
  },
  function (res) {
    Public.Notice("服务请求失败", "error")
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
    if (localStorage.getItem("token")) {
      console.log(store.state.token);
      next()
    } else {
      store.commit("clearUserInfo")
      next({
        path: "/login",
        querry: { redirect: to.fullPath } //从哪个页面跳转
      })
      Public.Notice("请先登录", "warning")
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
