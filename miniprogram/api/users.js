// 用户表相关接口

const db = wx.cloud.database()
const _ = db.command
const users = db.collection('xh-users')

/**
 * 注册用户
 * @param {用户信息} userInfo 
 */
function register(userInfo) {
  return users.add({
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
function getUser(openid) {
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
  return users.doc(userId)
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
function changeUserIntegral(userId, integral) {
  const res = users.doc(userId).update({
    data: {
      integral: _.inc(integral)
    }
  })
  return res
}

/**
 * 根据用户id 修改用户打卡天数
 * @param {用户ID} userId 
 * @param {打卡天数} clockCount 
 */
function changeUserClockCount(userId, clockCount) {
  const res = users.doc(userId).update({
    data: {
      clockCount: _.inc(clockCount)
    }
  })
  return res
}

export {
  register,
  getUser,
  changeUserGift,
  getUserSort,
  changeUserIntegral,
  changeUserClockCount

}