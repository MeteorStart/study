// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  let content = '你好'
  if (event.Content == '学习') {
    content = '快来学习吧！ \n  <a href="https://mp.weixin.qq.com/s/PgpQrJuW89JpqhK8E7AWNQ"> 点击查看教程</a>'
  }
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: content,
    },
  })
  return event
}