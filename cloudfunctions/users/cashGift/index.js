// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  // 该参数从 wx-server-sdk 1.7.0 开始支持，默认为 true，指定 false 后可使得 doc.get 在找不到记录时不抛出异常
  throwOnNotFound: false,
})

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await db.runTransaction(async transaction => {

      await transaction.collection('xh-use-records').add({
        data: event.recordInfo
      })
      const giftRes = await transaction.collection('xh-gifts').doc(event.recordInfo.giftId).get()
      const userRes = await transaction.collection('xh-users').doc(event.recordInfo.userId).get()

      if (userRes.data && giftRes.data) {

        await transaction.collection('xh-users').doc(event.recordInfo.userId).update({
          data: {
            integral: _.inc(giftRes.data.integral * -1)
          }
        })

        console.log(`transaction succeeded`)

        // 会作为 runTransaction resolve 的结果返回
        return {
          userIntegral: userRes.data.integral - giftRes.data.integral,
        }
      } else {
        // 会作为 runTransaction reject 的结果出去
        await transaction.rollback(-100)
      }
    })

    return {
      success: true,
      userIntegral: result.userIntegral,
    }
  } catch (e) {
    console.error(`transaction error`, e)

    return {
      success: false,
      error: e
    }
  }
}