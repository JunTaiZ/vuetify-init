const crypto = require('crypto'),
  jwt = require('jsonwebtoken'),
  userModel = require('../models/userModel.js'),
  Base64 = require('js-base64').Base64;

let timeoutMap = new Map()

let getRandomVerify = () => {
  return Math.floor((Math.random() * 9 + 1) * 100000)
}
class UserController {
  // 用户找回密码获取邮箱验证码
  static async getVerifyCode(ctx) {
    const { email } = ctx.request.body;
    const checkUser = await userModel.findOne({
      email
    });
    if (checkUser === null) {
      return ctx.sendError('000002', '该用户不存在');
    }
    let verifyCode = getRandomVerify()
    clearTimeout(timeoutMap[email])
    let verifyTimeout = setTimeout(async () => {
      const deleteVerifyCode = await userModel.updateOne({
        email,
      }, {
        verifyCode: '',
        // verifyTimeout: '0',
      })
    }, 1000 * 60 * 5)
    timeoutMap[email] = verifyTimeout
    // console.log(timeoutMap)
    // console.log('timeout', verifyTimeout)
    let updateVerify
    try {
      updateVerify = await userModel.updateOne({
        email,
      }, {
        verifyCode,
        // verifyTimeout: JSON.stringify(verifyTimeout)
      })
      return ctx.sendMail({
        email: Base64.decode(email),
        subject: '写梦书验证码',
        text:  `您的验证码：${verifyCode}，5分钟内有效`
      });
      // console.log(updateVerify)
    } catch(e) {
      console.log('setVerifyCode', e)
      return ctx.sendError('000002', '邮箱验证码发送失败')
    }
  }
  // 用户获取邮箱验证码重置密码
  static async setForgetPassword(ctx) {
    const { email, password, code } = ctx.request.body;
    const checkUser = await userModel.findOne({
      email
    });
    if (checkUser === null) {
      return ctx.sendError('000002', '该用户不存在');
    }
    let { verifyCode } = await userModel.findOne({ email })

    if (code === verifyCode) { // 验证码正确
      // clearTimeout(JSON.parse(verifyTimeout))
      const result = await userModel.updateOne({ // 更新密码
        email,
      }, {
        password: crypto.createHash('md5').update(password).digest('hex'),
        verifyCode: '',
        // verifyTimeout: -1,
      })
      const timeout = timeoutMap[email]
      clearTimeout(timeout)
      delete timeoutMap[email]
      // console.log(timeoutMap)
      // console.log('updatePassword: ', result)
      const token = jwt.sign({
        email,
        _id: result._id,
      }, 'my_token_manage', {
        expiresIn: 60 * 60 * 60
      });
      let sendresult = {
        token: token,
        email: result.email,
        _id: result._id,
        // telephone: result.telephone,
      }
      return ctx.send(sendresult, '修改密码成功');
      // console.log(data.password)
    } else {
      return ctx.sendError('000002', '验证码错误')
    }

  }
  // 用户注册
  static async register(ctx) {
    const { email, verifyCode, password }= ctx.request.body;
    const checkUser = await userModel.findOne({
      email,
      verifyCode
    });
    if (checkUser === null) {
      const user = new userModel({
        email,
        password: crypto.createHash('md5').update(password).digest('hex'), // 密码加密存储
      })
      const result = await user.save();
      console.log('register', result);
      const token = jwt.sign({
        email: result.email,
        _id: result._id,
      }, 'my_token_manage', {
        expiresIn: 60 * 60 * 60
      });
      let sendresult = {
        token: token,
        email: result.email,
        _id: result._id,
        // telephone: result.telephone,
      }
      return result !== null ? ctx.send(sendresult, '注册成功') : ctx.sendError('000002', '注册失败');
    } else {
      return ctx.sendError('000002', '该用户名已存在');
    }
    // console.log(data.password)
  }
  // 用户登录
  static async login(ctx) {
    const data = ctx.request.body;
    console.log(data.email, crypto.createHash('md5').update(data.password).digest('hex'))
    if (!data.email || !data.password) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await userModel.findOne({
      $or: [{
        email: data.email
      }, {
        telephone: data.email
      }],
      password: crypto.createHash('md5').update(data.password).digest('hex')
      // password: data.password,
    })
    if (result !== null) {
      const token = jwt.sign({
        email: result.email,
        _id: result._id,
      }, 'my_token_manage', {
        expiresIn: 60 * 60 * 60
      });
      let sendresult = {
        token: token,
        email: result.email,
        _id: result._id,
        // telephone: result.telephone,
      }
      return ctx.send(sendresult, '登录成功');
    } else {
      return ctx.sendError('000002', '用户名或密码错误');
    }
  }
  // 更改密码
  static async changePassword(ctx) {
    const {
      email,
      oldPass,
      newPass
    } = ctx.request.body;
    console.log('修改密码', email, oldPass, newPass)
    if (!email | !newPass | !oldPass) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await userModel.findOne({
      email: email,
      password: crypto.createHash('md5').update(oldPass).digest('hex')
    })
    if (result !== null) {
      let newPassResult = await userModel.updateOne({
        _id: result._id
      }, {
        password: crypto.createHash('md5').update(newPass).digest('hex')
      })
      console.log(newPassResult)
      if (newPassResult) {
        const token = jwt.sign({
          email: result.email,
          _id: result._id,
          manage: result.manage,
        }, 'my_token_manage', {
          expiresIn: 60 * 60
        });
        let sendresult = {
          token: token,
          email: result.email,
          _id: result._id,
          // manage: result.manage,
        }
        return ctx.send(sendresult, '密码修改成功');
      } else {
        return ctx.sendError('000002', '数据库失去连接')
      }

    } else {
      return ctx.sendError('000002', '旧密码错误');
    }
  }
  // 管理员获取用户信息
  static async getUsers(ctx) {
    // console.log(ctx.state);        
    // const data = ctx.state.user;
    const users = await userModel.find();
    let result = {},
      results = [],
      user
    if (users !== null) {
      for (let i = 0; i < users.length, user=users[i]; i++) {
        
        result = {
          _id: user._id,
          email: user.email,
          telephone: user.telephone
          // email: user.email
        };
        results.push(result)
      }

      return ctx.send(results);
    } else {
      return ctx.sendError('000002');
    }
  }
  // 管理员获取用户信息
  static async getUserInfo(ctx) {
    // console.log(ctx.state);
    const { _id, exp} = ctx.state.user;
    const user = await userModel.findOne({ _id });
    if (user !== null) {
      console.log(user)
      return ctx.send({
        email: user.email,
      }, '获取用户信息成功')
    } else {
      return ctx.sendError('000002', '获取用户信息失败')
    }
  }
}

module.exports = UserController;