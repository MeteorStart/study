// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {

  return db.collection('xh-use-records').aggregate()
    .match({
      userId: event.userId
    })
    .lookup({
      from: 'xh-gifts',
      localField: 'giftId',
      foreignField: '_id',
      as: 'gifts',
    }).end()
}