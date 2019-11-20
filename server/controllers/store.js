const 
  // crypto = require('crypto'),
  // jwt = require('jsonwebtoken'),
  // orderModel = require('../models/orderModel.js'),
  // userModel = require('../models/userModel.js'),
  // productModel = require('../models/productModel.js'),
  storeModel = require('../models/storeModel.js');
class StoreControllers {
  // 获取所有商店列表
  static async getStore(ctx) {
    const user = ctx.state.user;
    let store = await storeModel.find();
    // console.log(store);
    if (store !== null) {
      return ctx.send(store, '店铺列表获取成功');
    } else {
      return ctx.sendError('000002');
    }
  }
  static async addStore(ctx) {
    const user = ctx.state.user;
    let data = ctx.request.body;
    console.log(data)
    if (user.manage) {
      let newStore = await storeModel.create(data);
      console.log(newStore);
      if (newStore !== null) {
        return ctx.send(newStore, '增加店铺成功');
      } else {
        return ctx.sendError('000002');
      }
    }
    
  }

}

module.exports = StoreControllers;