// 兑换表相关接口
const db = wx.cloud.database()
const records = db.collection('xh-use-records')
/**
 * 获取兑换列表
 */
function getUseRecords(userId) {
  return records
    .where({
      userId: userId
    })
    .field({
      authCode: true,
      giftId: true,
      state: true,
      userId: true
    }).get()
}

/**
 * 添加兑换记录
 */
function addRecord(userId, giftId, authCode, state) {
  return records.add({
    data: {
      userId: userId,
      giftId: giftId,
      authCode: authCode,
      state: state
    }
  })
}

export{
  getUseRecords,
  addRecord
}