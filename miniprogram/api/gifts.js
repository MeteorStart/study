// 礼物表相关接口

/**
 * 获取礼物列表
 */
function getGifts() {
  const db = wx.cloud.database();
  const gifts = db.collection('xh-gifts');
  return gifts.orderBy('sort', 'esc').get()
}

/**
 * 获取礼物列表
 */
function getGiftInfo(giftId) {
  const db = wx.cloud.database();
  const gifts = db.collection('xh-gifts');
  return gifts.where({
    _id: giftId
  }).get()
}

export {
  getGifts,
  getGiftInfo
}