// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('xh-clocks').aggregate()
    .match({
      activityId: event.activityId,
      articleId: event.articleId
    })
    .lookup({
      from: 'xh-users',
      localField: 'userId',
      foreignField: '_id',
      as: 'clockUsers',
    }).end()
}