import Vue from 'vue'
import Vuex from 'vuex'
import md5 from "js-md5";
import { Base64 } from 'js-base64'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: {
      email: '',
    },
    notice: {
      show: false,
      message: "",
      color: {
        bgcolor: "primary",
        textcolor: "white--text",
        closecolor: "blue",
      },
    },
  },
  getters: {
    NoticeInfo: state => {
      return state.notice
    },
    UserInfo: state => {
      return state.userInfo
    },
    UserEmail: state => {
      return Base64.decode(state.userInfo.email)
    },
  },
  mutations: {
    showNotice(state, notice) {
      console.log("Notice", notice)
      state.notice.message = notice.message
      state.notice.color = notice.color
      state.notice.show = true
    },
    hideNotice(state) {
      state.notice.show = false
    },
    updateToken(state, token) {

      localStorage.setItem("token", token);
      state.token = token
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      // console.log(userInfo)
    },
    deleteToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    // updateUserInfo(state, userInfo) {
    // },
  },
  actions: {
    async getUserInfo({ commit }) {
      let res = await axios.get('/api/getUserInfo')
      if (res.code === '000001') {
        commit('updateUserInfo', res.data)
        // console.log('getUserInfo', res.data)
        return res
      } else return res.msg
    },
    async login({ commit }, { email, password }) {
      email = Base64.encode(email)
      password = md5(password)
      //     return data.Login
      const res = await axios.post("/api/login", {
        email,
        password
      })
      console.log('service', res)
      if (res.code == "000001") {
        commit('updateToken', res.data.token)
        commit('updateUserInfo', res.data)
        return res
      }
      else
        return res.msg
    },
    async register({ commit }, { email, password }) {
      email = Base64.encode(email)
      password = md5(password)
      const res = await axios.post("/api/register", {
        email,
        password
      })
      console.log('service', res)
      if (res.code == "000001") {
        commit('updateToken', res.data.token)
        commit('updateUserInfo', res.data)
        return res
      }
      else
        return res.msg
    },
    async getVerifyCode({ commit }, { email }) {
      // console.log("Login...", id, password)
      // if (virtualData)
      email = Base64.encode(email)
      //     return data.Login
      let res
      try {
        res = await axios.post("/api/getVerifyCode", {
          email,
        })
      } catch (e) {
        console.error(e)
      }
      // console.log('service', res)
      if (res.code == "000001") {
        // commit('updateToken', res.token)
        return res
      }
      else
        return res.msg
    },
    async setForgetPassword({ commit }, { email, password, code }) {
      // console.log("Login...", id, password)
      // if (virtualData)
      email = Base64.encode(email)
      //     return data.Login
      let res
      try {
        res = await axios.post("/api/setForgetPassword", {
          email,
          password: md5(password),
          code
        })
      } catch (e) {
        console.error(e)
      }
      // console.log('service', res)
      if (res.code == "000001") {
        commit('updateToken', res.data.token)
        commit('updateUserInfo', res.data)
        return res
      }
      else
        return res.msg
    },
  }
})
