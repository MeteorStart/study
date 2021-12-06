const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  throwOnNotFound: false
})

const _ = db.command

exports.main = async (event, context) => {
  // 开启事务
  const transaction = await db.startTransaction()
  // 提取打卡信息
  const clockInfo = event.clockInfo
  // 查询打卡记录
  const clocks = await transaction.collection('xh-clocks').where(clockInfo).get()
  // 判断打卡记录是否存在
  if (clocks.data && clocks.data.length == 0) {
    // 添加打卡记录
    await transaction.collection('xh-clocks').add({
      data: clockInfo
    })
    // 查询打卡用户
    const userRes = await transaction.collection('xh-users').doc(clockInfo.userId).get()
    // 查询打卡活动
    const activityRes = await transaction.collection('xh-activitys').doc(clockInfo.activityId).get()
    // 查询打卡文章
    const articleRes = await transaction.collection('xh-articles').doc(clockInfo.articleId).get()
    if (userRes.data && activityRes.data && articleRes.data) {
      const settingRes = await transaction.collection('xh-setting').get()
      const integral = settingRes.data[0].integral
      await transaction.collection('xh-users').doc(clockInfo.userId).update({
        data: {
          clockCount: _.inc(1),
          integral: _.inc(integral)
        }
      })
      await transaction.commit()
      return {
        success: true,
        msg: '打卡成功'
      }
    } else {
      // 回滚
      await transaction.rollback()
      return {
        success: false,
        msg: '打卡失败'
      }
    }

  } else {
    // 回滚
    await transaction.rollback()
    return {
      success: false,
      msg: '已经打卡'
    }
  }
}