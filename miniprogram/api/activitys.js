// 活动表相关接口

/**
 * 获取所有活动
 * 根据创建时间排序，新创建的在前面
 */
function getActivitys() {
  // 获取数据库对象
  const db = wx.cloud.database();
  // 连接具体的数据表
  const activitys = db.collection('xh-activitys');
  // 查询所有的数据 
  const res = activitys
    .orderBy('_createTime', 'desc')
    .field({
      title: true,
      cover: true
    }).get()
  return res;
}
/**
 * 获取活动详细信息
 * @param {活动ID} id 
 */
function getActivityInfo(id) {
  const db = wx.cloud.database();
  const activitys = db.collection('xh-activitys');
  const res = activitys.doc(id).get()
  return res;
}

/**
 * 导出方法
 */
export {
  getActivitys,
  getActivityInfo
}