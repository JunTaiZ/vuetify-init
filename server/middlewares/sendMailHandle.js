let nodemailer = require('nodemailer')
const sendMailHandle = () => {
  async function mail({ email, subject, text }) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "qq",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: '940806774@qq.com', // generated ethereal user
        pass: 'kcctlbwusyjubcic' // generated ethereal password
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '940806774@qq.com', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text, // plain text body
      // html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info
  }
  // 处理请求成功方法
  const sendMail = ctx => {
    return ({ email, subject, text }) => {
      ctx.set('Content-Type', 'application/json');
      try {
        let info = mail({ email, subject, text }).catch(console.error)
        console.log(email, info)
        if (info) {
          console.log('发送邮箱验证码成功');
          // console.log(ctx)
          ctx.body = {
            code: '000001',
            msg: '请到您的邮箱查看验证码'
          }
        } else {
          ctx.body = {
            code: '000002',
            msg: '请重新请求验证码'
          }
        }
      } catch (e) {
        console.log('mailhandler', e)
      }

    }

  }

  return async (ctx, next) => {
    ctx.sendMail = sendMail(ctx);
    await next();
  }
}

module.exports = sendMailHandle;