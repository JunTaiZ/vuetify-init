<template>
  <v-app light id="LoginOrRegister" class="deep-orange lighten-2">
    <div class="header d-flex align-center">
      <v-icon>LOGO</v-icon>
      <div>Vuetify | 初始化模板</div>
    </div>
    <div elevation="3" class="login-register-con">
<!--      <v-toolbar color="primary" dark flat>-->
<!--        <v-toolbar-title>登录</v-toolbar-title>-->
<!--        <v-spacer></v-spacer>-->
<!--      </v-toolbar>-->
<!--      <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>-->
      <div class="text-center mb-12">
        <v-content size="89">
          <span class="black--text headline">{{ typeTitle }}</span>
        </v-content>
      </div>
      <v-carousel
        v-model="loginOrRegister"
        :show-arrows="false"
        :hide-delimiters="true"
      >
        <v-carousel-item>
          <v-form class="pa-5">
            <div>
              <v-text-field
                ref="input1"
                light
                rounded
                filled
                single-line
                v-model="loginForm.email"
                label="邮箱"
                name="email"
                type="text"
                :rules="[formRules.email]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-email</v-icon>
                </template>
              </v-text-field>

              <v-text-field
                ref="input2"
                light
                rounded
                filled
                single-line
                v-model="loginForm.password"
                label="密码"
                name="password"
                append-icon="mdi-lock"
                type="password"
                :rules="[formRules.password]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-lock</v-icon>
                </template>
              </v-text-field>
            </div>
          </v-form>
          <div class="d-flex px-6 justify-center">
            <v-avatar
              size="60"
              color="white hover-box-shadow"
              class="pointer"
              rounded
            >
              <v-icon
                @click.stop="clickLogin" color="primary" v-if="!logining"
              >mdi-arrow-right</v-icon>
              <v-progress-circular
                v-if="logining"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-avatar>
          </div>
          <v-card-actions class="px-6">
            <span class="left1">
              <span class="subtitle-2" @click="goToLOR('register')">立即注册</span>
            </span>
            <v-spacer></v-spacer>
<!--            <v-progress-circular-->
<!--              v-show="logining"-->
<!--              indeterminate-->
<!--              color="primary"-->
<!--              style="margin-right: 1rem;"-->
<!--            ></v-progress-circular>-->
  
            <span class="pointer subtitle-2" @click="goToVerify">忘记密码</span>
          </v-card-actions>
        </v-carousel-item>
        <v-carousel-item>
          <v-form class="pa-5">
            <span v-show="loginType=='email'">
              <v-text-field
                ref="input3"
                light
                rounded
                filled
                single-line
                v-model="registerForm.email"
                label="邮箱"
                name="email"
                append-icon="mdi-email"
                type="text"
                :rules="[formRules.email]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-email</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                ref="input5"
                light
                rounded
                filled
                single-line
                v-model="registerForm.password"
                label="密码"
                name="email"
                append-icon="mdi-lock"
                type="password"
                :rules="[formRules.password]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-lock</v-icon>
                </template>
              </v-text-field>
            </span>
          </v-form>
          <v-card-actions class="px-6">
            <span class="left1" @click="goToLOR('login')">
              <v-icon color="black">mdi-arrow-left </v-icon>
              <span class="subtitle-2">返回登陆</span>
            </span>
            <v-spacer></v-spacer>
            <!--            <v-progress-circular-->
            <!--              v-show="logining"-->
            <!--              indeterminate-->
            <!--              color="primary"-->
            <!--              style="margin-right: 1rem;"-->
            <!--            ></v-progress-circular>-->
<!--            <span class="subtitle-2" @click="goToVerify">测试</span>-->
            <v-avatar
              size="60"
              color="white hover-box-shadow"
              class="pointer"
              rounded
            >
              <v-icon
                color="primary"
                @click.stop="clickRegister"
                v-if="!verifying"
              >mdi-arrow-right</v-icon>
              <v-progress-circular
                v-if="verifying"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-avatar>
          </v-card-actions>
        </v-carousel-item>
  
        <v-carousel-item>
          <v-form class="pa-5">
            <span v-show="loginType=='email'">
              <v-text-field
                ref="input5"
                light
                rounded
                filled
                single-line
                v-model="forgetForm.email"
                label="邮箱"
                name="email"
                append-icon="mdi-lock"
                type="email"
                :rules="[formRules.email]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-email</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                ref="input4"
                light
                rounded
                filled
                single-line
                v-model="forgetForm.verifycode"
                label="邮箱验证码"
                name="verify"
                type="text"
                :rules="[formRules.verifycode]"
              >
                <template v-slot:append>
                  <span
                    v-if="!verifying" class="pointer black--text pt-1"
                    @click.stop="clickGetVerify"
                  >获取验证码</span>
                  <span v-if="verifying" class="black--text pt-1">重新获取 {{ countVerify }}s</span>
                </template>
              </v-text-field>
              <v-text-field
                ref="input5"
                light
                rounded
                filled
                single-line
                v-model="forgetForm.password"
                label="密码"
                name="password"
                append-icon="mdi-lock"
                type="password"
                :rules="[formRules.password]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-lock</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                ref="input6"
                light
                rounded
                filled
                single-line
                v-model="forgetForm.repassword"
                label="确定密码"
                name="repassword"
                append-icon="mdi-lock"
                type="password"
                :rules="[formRules.password]"
              >
                <template v-slot:append>
                  <v-icon color="gray">mdi-lock</v-icon>
                </template>
              </v-text-field>
            </span>
          </v-form>
          <v-card-actions class="px-6">
            <span class="left1" @click="goToLOR('login')">
              <v-icon color="black">mdi-arrow-left </v-icon>
              <span class="subtitle-2">返回登陆</span>
            </span>
            <v-spacer></v-spacer>
            <v-avatar
              size="60"
              color="white hover-box-shadow"
              class="pointer"
              @click.stop="clickRegister"
              rounded
            >
              <v-icon color="primary" @click.stop="clickSetForgetPassword" v-if="!forgeting">mdi-arrow-right</v-icon>
              <v-progress-circular
                v-if="forgeting"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-avatar>
          </v-card-actions>
        </v-carousel-item>
      </v-carousel>

    </div>

    <notifications
      group="notify"
      position="top center"
      animation-type="velocity"
      class="notify-style"
    />
  </v-app>
</template>


<script>
import { mapActions } from 'vuex'
const blankLoginForm = {
  email: "",
  password: "",
  verifycode: ""
};
const blankRegisterForm = {
  email: "",
  password: "",
  verifycode: "",
}
const blankForgetForm = {
  email: "",
  password: "",
  repassword: "",
  verifycode: "",
}
export default {
  name: "Login",
  data() {
    return {
      timeout: [],
      countVerify: 60, // 重新发送验证码倒计时
      loginOrRegister: 0,
      animation: {
        enter(element) {
          /*
           *  "element" - is a notification element
           *    (before animation, meaning that you can take it's initial height, width, color, etc)
           */
          let height = element.clientHeight;

          return {
            // Animates from 0px to "height"
            height: [height, 0],

            // Animates from 0 to random opacity (in range between 0.5 and 1)
            opacity: [1, 0]
          };
        },
        leave: {
          height: 0,
          opacity: 0
        }
      },
      verifying: false,
      registering: false,
      logining: false,
      forgeting: false,
      loginForm: Object.assign({}, blankLoginForm),
      registerForm: Object.assign({}, blankRegisterForm),
      forgetForm: Object.assign({}, blankForgetForm),
      loginType: "email", //email phonenumber
      formRules: {
        required: value => (!!value && value.length >= 3) || "",
        email: value => {
          let emailReg = /^[a-z0-9]([a-z0-9]*[-_.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[.][a-z0-9]{2,3}([.][a-z0-9]{2})?$/i
          return emailReg.test(value) ? true : '请检查邮箱格式'
        },
        phonenumber: value => {
          const pattern = /^1\d{10}$/;
          return pattern.test(value) ? true : "请输入11位手机号";
        },
        password: value => {
          if (value.length < 6) return "密码过短";
          const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
          return pattern.test(value) ? true : "请输入符合要求的密码";
        },
        verifycode: value => {
          return value.length === 6 ? true : '验证码长度为6';
        }
      }
    };
  },
  computed: {
    typeTitle() {
      switch (this.loginOrRegister) {
        case 0: return '登陆';
        break;
        case 1: return '注册';
        break;
        case 2: {
          return '找回密码'
        }
      }
    }
  },
  watch: {
    verifying(newV, oldV) {
      if (newV) {
        this.countVerify = 60
        this.timeout[0] = setTimeout(() => {
          this.verifying = false
        }, 60000)
        for (let i = 1; i <= 60; i++) {
          this.timeout[i] = setTimeout(() => {
            this.countVerify--
          }, i*1000)
        }
      }
    }
  },
  methods: {
    ...mapActions(['login', 'getVerifyCode', 'register', 'setForgetPassword']),
    setBoxShadow(type) {
      let refProperty
      if (type === 'login') refProperty = ['input1', 'input2']
      if (type === 'register') refProperty = ['input3']
      if (type === 'verify') refProperty = ['input4', 'input5', 'input6']
      // console.log(this.$refs)
      // console.log(refProperty)
      setTimeout(() => {
        refProperty.forEach(val => {
          let node = this.$refs[val].$el.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
          node.onfocus = (e) => {
            // console.log(e.srcElement.parentNode.parentNode)
            e.srcElement.parentNode.parentNode.style.boxShadow = "0 6px 15px #CC3712"
          }
          node.onblur = (e) => {
            e.srcElement.parentNode.parentNode.style.boxShadow = "none"
          }
        })
      }, 200)
    },
    goToVerify() {
      this.setBoxShadow('verify')
      this.forgetForm.email = this.loginForm.email
      this.loginOrRegister = 2
    },
    goToLOR(type) {
      // console.log(type)
      this.verifying = false
      // this.timeout.forEach((val) => {
      //   if (val > 0) {
      //     clearTimeout(val)
      //   }
      // })
      this.clearForm()
      this.loginOrRegister = type === 'login' ? 0 : 1
      this.setBoxShadow(type)
    },
    async clickSetForgetPassword() {
      this.forgeting = true
      let { email, password, repassword, verifycode} = this.forgetForm
      if (
        this.formRules.email(email) === true &&
        this.formRules.password(repassword) === true &&
        this.formRules.password(password) === true &&
        this.formRules.verifycode(verifycode) === true
      ) {
        let result = await this.setForgetPassword({
          email,
          password,
          code: verifycode,
        })
        console.log(result)
        if (result.code === '000001') {
          this.$notify({
            type: 'success',
            group: 'notify',
            text: result.msg
          })
          await this.$router.push("/");
        } else {
          this.$notify({
            type: 'error',
            group: 'notify',
            text: result
          })
        }
        // this.goToVerify()
      } else {
        this.$notify({
          type: 'error',
          group: 'notify',
          text: '请检查输入格式'
        })
      }
      this.forgeting = false

    },
    async clickGetVerify() {
      let email = this.forgetForm.email
      if (this.formRules.email(email) === true) {
        let result = await this.getVerifyCode({
          email: this.forgetForm.email
        })
        console.log(result)
        if (result.code === '000001') {
          this.$notify({
            type: 'success',
            group: 'notify',
            text: result.msg
          })
          this.verifying = true
        } else {
          this.$notify({
            type: 'error',
            group: 'notify',
            text: result
          })
        }
        // this.goToVerify()
      } else {
        this.$notify({
          type: 'error',
          group: 'notify',
          text: '邮箱格式错误'
        })
      }

    },
    async clickRegister() {
      this.registering = true
      let res
      let { email, password } = this.registerForm
      if (
        this.formRules.email(email) !== true ||
        this.formRules.password(password) !== true
      ) {
        this.$notify({
          type: 'error',
          group: 'notify',
          text: '请检查输入格式',
        })
        this.registering = false
        return
      }
      try {
        res = await this.register({
          email,
          password
        })
      } catch (e) {
        console.log(e)
        return
      }
      // console.log(res)
      if (res.code === '000001') {
        this.registering = false;
        this.$notify({
          type: "success",
          group: "notify",
          text: "注册成功"
        });
        await this.$router.push("/");
      } else {
        this.registering = false
        this.$notify({
          type: "error",
          group: "notify",
          text: res
        });
      }

      // console.log(this.$notify)
    },
    async clickLogin() {
      this.logining = true
      // console.log(this.loginForm);
      let { email, password } = this.loginForm
      if (
        this.formRules.email(email) !== true ||
        this.formRules.password(password) !== true
      ) {
        this.$notify({
          type: 'error',
          group: 'notify',
          text: '请检查输入格式',
        })
        this.logining = false
        return
      }
      let res
      try {
        res = await this.login({
          email,
          password
        })
      } catch (e) {
        console.log(e)
      }
      console.log(res)
      if (res.code === '000001') {
        this.logining = false;
        this.$notify({
          type: "success",
          group: "notify",
          text: "登陆成功"
        });
        await this.$router.push("/");
      } else {
        this.logining = false
        this.$notify({
          type: "error",
          group: "notify",
          text: res
        });
      }

      // console.log(this.$notify)
    },
    clearForm() {
      this.loginForm = Object.assign({}, blankLoginForm);
      this.registerForm = Object.assign({}, blankRegisterForm);
      this.forgetForm = Object.assign({}, blankForgetForm);
      
    },
    switchLoginType() {
      this.loginType =
        this.loginType == "email" ? "phonenumber" : "email";
    }
  },
  mounted() {
    this.setBoxShadow('login')
    // this.$refs.input.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[1].onfocus = (e) => {
    //   console.log(e.srcElement.parentNode.parentNode)
    //   e.srcElement.parentNode.parentNode.style.boxShadow = "1px 1px 3px #eee"
    //   // this.$ref.input.$el.style.boxShadow = "1px 1px 3px #eee"
    // }
  }
};
</script>

<style lang="scss" scoped>
#LoginOrRegister {
  background-image: url("https://cdn.vuetifyjs.com/images/parallax/material2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header {
    // padding: 1.5rem;
    font-size: 18px;
    :nth-child(1) {
      font-size: 38px;
    }
    :nth-child(n + 1) {
      padding: 1.5rem 0 1.5rem 1.5rem;
    }
  }
  .login-register-con {
    .left1 {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    background-color: rgba(0, 0, 0, 0);
    /*width: 600px;*/
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    .v-application .error--text {
      color: white;
    }
    @media screen and (max-width: 720px) {
      & {
        width: 80%;
      }
    }
    @media screen and (min-width: 720px) {
      & {
        width: 60%;
      }
    }
    @media screen and (min-width: 1250px) {
      & {
        width: 30%;
      }
    }
    @media screen and (min-width: 1920px) {
      & {
        width: 30%;
      }
    }
  }
}

</style>