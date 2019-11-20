const 
  // crypto = require('crypto'), 
  // jwt = require('jsonwebtoken'),
  // orderModel = require('../models/orderModel.js'),
  // userModel = require('../models/userModel.js'),
  productModel = require('../models/productModel.js')
  // storeModel = require('../models/storeModel.js'),
class ProductControllers {
  // 获取所有商店列表
  static async getProduct(ctx) {
    const user = ctx.state.user;
    let product = await productModel.find();
    // console.log(product);
    if (product !== null) {
      return ctx.send(product, '产品列表获取成功');
    } else {
      return ctx.sendError('000002');
    }
  }
  
  static async addProduct(ctx) {
    const user = ctx.state.user;
    let data = ctx.request.body;
    console.log(data)
    if (user.manage) {
      let newProduct = await productModel.create(data);
      console.log(newProduct);
      if (newProduct !== null) {
        return ctx.send(newProduct, '增加产品成功');
      } else {
        return ctx.sendError('000002');
      }
    }
    
  }
}

module.exports = ProductControllers;