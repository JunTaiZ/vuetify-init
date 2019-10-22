import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
    notice: {
      show: false,
      message: "",
      color: {
        bgcolor: "primary",
        textcolor: "whte--text",
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
    // updateToken(state, token) {
    // },
    // updateUserInfo(state, userInfo) {
    // },
  },
  actions: {

  }
})
