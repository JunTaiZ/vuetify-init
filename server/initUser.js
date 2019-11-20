const userModel = require('./models/userModel.js');
const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const crypto = require('crypto')
const email = Base64.encode('admin@123.com'),
  password = md5('admin123')
const initUser = async () => {
  const checkUser = await userModel.findOne({
    email,
  });
  console.log(email, password)
  if (checkUser !== null) {
    userModel.deleteOne({email: 'admin@123.com'})
    console.log('已经创建过用户admin@123.com');
    return ;
  }
  const user = new userModel({
    email,
    password: crypto.createHash('md5').update(password).digest('hex'), // 密码加密存储
    // telephone: data.telephone
  })
  const result = await user.save();
  console.log('创建用户admin@123.com成功')
  return result
}
module.exports = initUser