/**
 * 
 * @param {用户信息} userInfo 
 */
function register(userInfo) {
  let db = wx.cloud.database()
  return db.collection('xh-users').add({
    data: {
      nickName: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      integral: 0,
      clockCount: 0,
      registerDate: db.serverDate()
    }
  })
}

/**
 * 
 * @param {唯一标识} openid 
 */
function getUsre(openid) {
  let db = wx.cloud.database()
  let users = db.collection('xh-users')
  return users.where({
    _openid:openid
  }).get()
}

/**
 * 
 * @param {用户ID} userId 
 * @param {礼物ID} giftId 
 */
function changeUserGift(userId, giftId) {
  const db = wx.cloud.database()
  const _ = db.command
  return db.collection('xh-users').doc(userId)
    .update({
      data: {
        gift: giftId
      },
    })
}

export{    
  register,
  getUsre,
  changeUserGift
}