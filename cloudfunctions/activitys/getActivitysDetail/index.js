// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command
const $ = _.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('xh-activitys').aggregate().match({
      _id: event.activityId
    }).lookup({
      from: 'xh-articles',
      localField: '_id',
      foreignField: 'activityId',
      as: 'articles'
    })
    .addFields({
      article: $.arrayElemAt(['$articles', 0])
    })
    .project({
      articles: 0
    })
    .lookup({
      from: 'xh-clocks',
      let: {
        activityId: '$_id',
        articleId: '$article._id',
        userId: event.userId
      },
      pipeline: $.pipeline().match(_.expr($.and([
          $.eq(['$userId', '$$userId']),
          $.eq(['$activityId', '$$activityId']),
          $.eq(['$articleId', '$$articleId']),
        ])))
        .done(),
      as: 'clocks'
    })
    .addFields({
      isClock: $.gt([$.size('$clocks'), 0])
    })
    .end()
}