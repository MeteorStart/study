// 打卡表相关接口

/**
 * 添加打卡记录
 * @param {文章ID} articleId 
 * @param {用户ID} userId 
 * @param {活动ID} activityId 
 **/
function addClocks(articleId, userId, activityId) {
  const db = wx.cloud.database();
  const clocks = db.collection('xh-clocks');
  return clocks.add({
    data: {
      articleId: articleId,
      userId: userId,
      activityId,
      activityId,
      date: new Date().getTime()
    }
  })
}

/**
 * 查询时间段内打卡记录
 * @param {开始时间} startDate 
 * @param {结束时间} endDate 
 * @param {用户ID} userId 
 **/
function queryTimeClocks(userId, startDate, endDate) {
  const db = wx.cloud.database();
  const clocks = db.collection('xh-clocks');
  const _ = db.command
  return clocks.where({
    userId: userId,
    date: _.gte(startDate).and(_.lte(endDate))
  }).get()
}

/**
 * 查询用户是否打卡记录
 * @param {用户ID} userId 
 **/
function queryUserIsClock(userId) {
  const db = wx.cloud.database();
  const clocks = db.collection('xh-clocks');
  return clocks.where({
    userId: userId,
  }).get()
}

export {
  addClocks,
  queryTimeClocks,
  queryUserIsClock
}