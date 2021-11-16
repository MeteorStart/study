// 用户表相关接口

/**
 * 注册用户
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
 * 根据openid 获取用户信息
 * @param {唯一标识} openid 
 */
function getUsre(openid) {
  let db = wx.cloud.database()
  let users = db.collection('xh-users')
  return users.where({
    _openid: openid
  }).get()
}

/**
 * 根据用户id 更改用户礼物
 * @param {用户ID} userId 
 * @param {礼物ID} giftId 
 */
function changeUserGift(userId, giftId) {
  const db = wx.cloud.database()
  const _ = db.command
  return db.collection('xh-users').doc(userId)
    .update({
      data: {
        giftId: giftId
      },
    })
}

/**
 * 根据积分倒序排序用户
 */
function getUserSort() {
  let db = wx.cloud.database()
  let users = db.collection('xh-users')
  return users.orderBy('integral', 'desc').get()
}

/**
 * 根据用户id 修改用户积分
 * @param {用户ID} userId 
 * @param {积分} integral 
 */
function changeUserIntegral(userId,integral) {
  const db = wx.cloud.database()
  const _ = db.command
  return db.collection('xh-users').doc(userId)
    .update({
      data: {
        integral: integral
      },
    })
}

/**
 * 根据用户id 修改用户打卡天数
 * @param {用户ID} userId 
 * @param {打卡天数} clockCount 
 */
function changeUserClockCount(userId,clockCount) {
  const db = wx.cloud.database()
  const _ = db.command
  return db.collection('xh-users').doc(userId)
    .update({
      data: {
        clockCount: clockCount
      },
    })
}

export {
  register,
  getUsre,
  changeUserGift,
  getUserSort,
  changeUserIntegral,
  changeUserClockCount

}