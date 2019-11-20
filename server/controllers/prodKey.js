const 
  // crypto = require('crypto'),
  // jwt = require('jsonwebtoken'),
  // orderModel = require('../models/orderModel.js'),
  // userModel = require('../models/userModel.js'),
  prodKeyModel = require('../models/prodKeyModel.js')
  // storeModel = require('../models/storeModel.js'),
class ProductControllers {
  // 获取所有商店列表
  static async getProdKey(ctx) {
    const user = ctx.state.user;
    let prodKeys = await prodKeyModel.find();
    // console.log(product);
    if (prodKeys !== null) {
      return ctx.send(prodKeys, '产品关键字列表获取成功');
    } else {
      return ctx.sendError('000002');
    }
  }
  static async addProductKey(ctx) {
    const user = ctx.state.user;
    let data = ctx.request.body;
    // console.log(data)
    if (user.manage) {
      let newProductKey = await prodKeyModel.create(data);
      console.log(newProductKey);
      if (newProductKey !== null) {
        return ctx.send(newProductKey, '增加产品关键字成功');
      } else {
        return ctx.sendError('000002');
      }
    }
    
  }
}

module.exports = ProductControllers;