const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    json = require('koa-json'),
    koajwt = require('koa-jwt'),
    serve = require('koa-static'),
    bodyparser = require('koa-bodyparser'),
    cors = require('koa-cors')

global.Promise = require('bluebird');
const db = require('./server/config/db.js'),
    errorHandle = require('./server/middlewares/errorHandle.js'),
    sendHandle = require('./server/middlewares/sendHandle.js'),
  sendMailHandle = require('./server/middlewares/sendMailHandle.js');
// 数据库初始化一个用户(email: admin@123.com, password: admin)
const initUser = require('./server/initUser.js');
const {DateFormat} = require('./server/config/js_config')


Date.prototype.Format = DateFormat

const user = require('./server/routes/indexRoutes.js');
app.use(cors());
app.use(serve('./dist'));
app.use(json());
app.use(bodyparser());
app.use(sendHandle());
app.use(sendMailHandle())
app.use(errorHandle);
app.use(koajwt({
    secret: 'my_token_manage'
}).unless({
    path: [/\/api\/register/, /\/api\/login/, /\/api\/getVerifyCode/, /\/api\/setForgetPassword/]
}));

router.use('/api', user.routes());
app.use(router.routes());

app.listen('3300', () => {
    console.log('koa is listening in 3300');
})
initUser();