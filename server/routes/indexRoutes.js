const router = require('koa-router')(),
  User = require('../controllers/user.js'),
  Order = require('../controllers/order.js'),
  Store = require('../controllers/store.js'),
  Product = require('../controllers/product.js'),
  ProdKey = require('../controllers/prodKey.js');

router.post('/setForgetPassword', User.setForgetPassword);
router.post('/getVerifyCode', User.getVerifyCode);
router.post('/register', User.register);
router.post('/login', User.login);
router.post('/insertOrder', Order.insertOrder);
router.post('/changePassword', User.changePassword);
router.post('/updateOrder', Order.updateOrder);
router.post('/deleteOrder', Order.deleteOrder);
router.post('/deleteManyOrder', Order.deleteManyOrder);
// 添加资源，店铺，产品，关键字
router.post('/addStore', Store.addStore);
router.post('/addProduct', Product.addProduct);
router.post('/addProductKey', ProdKey.addProductKey);
router.get('/getUsers', User.getUsers);
router.get('/getUserInfo', User.getUserInfo);
router.get('/order', Order.getOrder);
router.get('/getStore', Store.getStore)
router.get('/getProduct', Product.getProduct)
router.get('/getProdKey', ProdKey.getProdKey)
module.exports = router;
