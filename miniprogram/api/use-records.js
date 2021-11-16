// 兑换表相关接口

/**
 * 获取兑换列表
 */
function getUseRecords() {
  const db = wx.cloud.database();
  const list = db.collection('xh-use-records');
  return list.orderBy('_updateTime', 'desc').get()
}

/**
 * 添加兑换记录
 */
function addRecord(userId, giftId, authCode, state) {
  const db = wx.cloud.database();
  const record = db.collection('xh-use-records');
  return record.add({
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