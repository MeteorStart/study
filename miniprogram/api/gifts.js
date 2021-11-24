// 礼物表相关接口
const db = wx.cloud.database()
const gifts = db.collection('xh-gifts')
/**
 * 获取礼物列表
 */
function getGifts() {
  const res = gifts
  .orderBy('sort','asc')
  .field({
    title:true,
    integral:true,
    picture:true
  })
  .get()
  return res
}

/**
 * 获取礼物列表
 */
function getGiftInfo(giftId) {
  const res = gifts.doc(id).get()
  return res
}

export {
  getGifts,
  getGiftInfo
}