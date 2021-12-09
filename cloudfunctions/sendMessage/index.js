// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      //这里是写死了我的账号
      "touser": 'oEGQU0SY3cZC2QQJZO8BH1-zSB2A',
      // "touser": wxContext.OPENID,
      "page": 'pages/index/index.js',
      "lang": 'zh_CN',
      "data": {
        "thing1": {
          "value": '该打卡了'
        },
        "time2": {
          "value": '2021年11月01日'
        },
        "time3": {
          "value": '2021年12月01日'
        },
        "thing4": {
          "value": '习惯养成，坚持打卡365赢精美礼品'
        }
      },
      "templateId": 'SH5eYsuzKv1_n0t4CyOQH2Djd9KmVDMAs1iQRIdHUIU',
      "miniprogramState": 'developer'
    })
    return result
  } catch (err) {
    return err
  }
}