const 
  crypto = require('crypto'),
  jwt = require('jsonwebtoken'),
  orderModel = require('../models/orderModel.js'),
  userModel = require('../models/userModel.js'),
  productModel = require('../models/productModel.js'),
  prodKeyModel = require('../models/prodKeyModel.js'),
  storeModel = require('../models/storeModel.js');

let getOrderByOneUser = async function (user_id) {
  let user_orders = await userModel.findOne({
    _id: user_id
  }); // 获取该用户的信息
  const result = await orderModel.find({ // 获取该用户的订单id
    user_id: user_id
  }).sort('-date');
  // console.log(result)
  let orderList = []

  // for (let idx = 0; idx < result.length; idx++) {
  //   // console.log(result[idx])
  //   let product = await productModel.findOne({
  //     _id: result[idx].product_id
  //   });
  //   let prodKey = await prodKeyModel.findOne({
  //     _id: result[idx].product_key_id
  //   });
  //   let store = await storeModel.findOne({
  //     _id: result[idx].store_id
  //   });
  //   let date = result[idx].date
  //   orderList[idx] = {
  //     _id: result[idx]._id,
  //     user_id,
  //     store_name: store.store_name,
  //     product_name: product.product_name,
  //     product_key: prodKey.key,
  //     store_id: store._id,
  //     product_id: product._id,
  //     product_key_id: prodKey._id,
  //     cost: result[idx].cost,
  //     num: result[idx].num,
  //     name: user_orders.name,
  //     telephone: user_orders.telephone,
  //     // date: date.Format("yyyy-MM-dd"),
  //     // time: date.Format("hh:mm"),
  //     date: date,
  //     order_id: result[idx].order_id,
  //     status: result[idx].status,
  //     // paydate: result[idx].paydate.Format("yyyy-MM-dd"),
  //     // paytime: result[idx].paydate.Format("hh:mm"),
  //     paydate: result[idx].paydate,
  //     express_id: result[idx].express_id,
  //   }
  //   // console.log(date.Format("yyyy-MM-dd"), date.Format("hh:mm:ss"))
  // }
  // console.log(orderList)
  return result
}
let sortCallBack = function (a, b) {
  // console.log(a.status, b.status)
  return a.status - b.status
}
let getOrderPage = function (list, pageSize, currentPage) {

}
class OrderControllers {
  // 获取订单列表
  
  static async getOrder(ctx) {
    const user = ctx.state.user;
    let {pageSize, pageNum, howManyTimes} = ctx.query;
    pageSize = parseInt(pageSize)
    pageNum = parseInt(pageNum)
    howManyTimes = parseInt(howManyTimes)
    // console.log(pageSize, pageNum, howManyTimes)
    let user_orders = await userModel.findOne({
      _id: user._id
    }); // 获取该用户的信息
    if (user_orders === null) {
      return ctx.sendError('000002', '请重新登陆');
    }
    // user_orders = JSON.stringify(user_orders)
    // user_orders = JSON.parse(user_orders)
    // console.log(user_orders._doc.order_ids)
    if (!user_orders.manage) {
      let orderList = await getOrderByOneUser(user._id)
      if (orderList === null) {
        return ctx.sendError('000002', "该用户还未有订单")
      }
      let oneTime = pageSize * pageNum
      orderList = orderList.sort(sortCallBack).slice(
        oneTime * (howManyTimes -1), 
        oneTime * howManyTimes,
      )
      // console.log(orderList);
      if (orderList !== null) {
        return ctx.send(orderList);
      } else {
        return ctx.sendError('000002', "无更多订单");
      }
    } else {
      let orders = [], ordersResult = [];
      let users = await userModel.find();
      if (users !== null) {
        for (let idx = 0; idx < users.length; idx++) {
          // console.log(`user_id: ${users[idx]._id}`)
          orders = await getOrderByOneUser(users[idx]._id);
          // console.log(orders)
          if (orders !== null) {
            ordersResult = ordersResult.concat(orders)
          }
        }
        
        if (ordersResult === null) {
          return ctx.sendError('000002', "该用户还未有订单")
        }
        let oneTime = pageSize * pageNum
        ordersResult = ordersResult.sort(sortCallBack).slice(
          oneTime * (howManyTimes -1), 
          oneTime * howManyTimes,
        )
        // console.log(ordersResult)
        if (ordersResult.length !== 0) {
          return ctx.send(ordersResult, "订单获取成功")
        } else {
          return ctx.sendError('000002', "无更多订单")
        }
      }
      
    }

  }
  // 插入order
  static async insertOrder(ctx) {
    const data = ctx.request.body;
    console.log(data)
    if (!data) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await orderModel.create(data);
    console.log(result)
    if (result !== null) {
      return ctx.send(result, '添加订单成功');
    } else {
      return ctx.sendError('000002', '添加订单失败，请刷新或重新登陆');
    }
  }
  // 更新order
  static async updateOrder(ctx) {
    let data = ctx.request.body;
    delete data.user_id
    if (!data) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await orderModel.updateOne({_id: data._id}, data);
    console.log(result)
    if (result !== null) {
      return ctx.send(result, '添加订单成功');
    } else {
      return ctx.sendError('000002', '添加订单失败，请刷新或重新登陆');
    }
  }
  // 删除一个order
  static async deleteOrder(ctx) {
    let data = ctx.request.body;
    if (!data) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await orderModel.deleteOne({_id: data._id});
    console.log(result)
    if (result !== null) {
      return ctx.send(result, '订单删除成功');
    } else {
      return ctx.sendError('000002', '订单删除失败，请刷新或重新登陆');
    }
  }
  // 删除多个个order
  static async deleteManyOrder(ctx) {
    let data = ctx.request.body;
    if (!data) {
      return ctx.sendError('000002', '参数不合法');
    }
    const result = await orderModel.deleteMany({_id: {$in: data}});
    console.log(result)
    if (result !== null) {
      return ctx.send(result, '订单删除成功');
    } else {
      return ctx.sendError('000002', '订单删除失败，请刷新或重新登陆');
    }
  }
}

module.exports = OrderControllers;