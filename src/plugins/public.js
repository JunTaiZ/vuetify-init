// import Vue from 'vue'
import store from "../store";
import axios from "axios";
import md5 from "js-md5";
// import router from './router'

const noticeConfig = {
  primary: {
    bgcolor: "el_primary",
    textcolor: "white--text",
    closecolor: "white"
  },
  success: {
    bgcolor: "el_success",
    textcolor: "white--text",
    closecolor: "white"
  },
  warning: {
    bgcolor: "el_warning",
    textcolor: "white--text",
    closecolor: "white"
  },
  error: {
    bgcolor: "el_danger",
    textcolor: "white--text",
    closecolor: "white"
  },
  danger: {
    bgcolor: "el_danger",
    textcolor: "white--text",
    closecolor: "white"
  },
  default: {
    bgcolor: "white",
    textcolor: "blue--text",
    closecolor: "red"
  },
  black: {
    bgcolor: "default",
    textcolor: "white--text",
    closecolor: "blue"
  }
};

var noticeTimer;

export default {

  Notice(message, type = "default", timeout = 2500) {
    // console.log(message, type)
    if (!noticeConfig.hasOwnProperty(type)) type = "default";
    var notice = {
      type: type,
      message: message,
      color: noticeConfig[type],
      timeout: timeout
    };

    store.commit("hideNotice");
    clearTimeout(noticeTimer)

    setTimeout(() => {
      store.commit("showNotice", notice);
    }, 100);
    noticeTimer = setTimeout(() => {
      if (store.state.notice.message == message) {
        store.commit("hideNotice");
      }
    }, timeout);
  },
  HideNotice() {
    store.commit("hideNotice");
  },
  Login(loginname, password) {
    console.log(loginname, password, md5(password));

    axios
      .post("/api/user/login", {
        username: loginname,
        password: password
        // password: md5(password)
      })
      .then(res => {
        if (res.data.code == "200") {
          console.log(res.data);
          // store.commit("updateUserInfo", res.data.data.user);
          // store.commit("hideLoginDialog");
          this.Notice("登录成功", "success");
        }
      });
  },

  Logout() {
    store.commit("clearUserInfo");
    this.Notice("已登出", "info");
    this.router.push({path: "/"});
    // setTimeout(() => {
    //   location.reload();
    // }, 600);
  },

  CheckLogin() {
    const token = localStorage.getItem("token");
    console.log("localStorage", token);
    if (token) {
      axios
        .get("/api/user/info")
        .then(res => {
          if (res.data.code == "200") {
            // store.commit("updateUserInfo", res.data.data);
            this.Notice("自动登录成功", "success", 1000)
          } else {
            this.Logout()
          }
        });
    }
  },

  test(a) {
    console.log(a);
  },

  filterTimeString(time, fmt) {
    var date = new Date(time);
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    var week = {
      "0": "\u65e5",
      "1": "\u4e00",
      "2": "\u4e8c",
      "3": "\u4e09",
      "4": "\u56db",
      "5": "\u4e94",
      "6": "\u516d"
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt
  }

}

