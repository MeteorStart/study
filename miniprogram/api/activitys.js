// 活动表相关接口

// 获取数据库对象
const db = wx.cloud.database();
// 连接具体的数据表
const activitys = db.collection('xh-activitys');

/**
 * 获取所有活动
 * 根据创建时间排序，新创建的在前面
 */
function getActivitys(skip, limit) {
  const res = activitys
    .orderBy('_createTime', 'desc')
    .skip(skip)
    .limit(limit)
    .field({
      title: true,
      cover: true
    })
    .get()
  return res
}

/**
 * 获取所有活动数量
 */
function getActsTotal(){
  return activitys.count()
}
/**
 * 获取活动详细信息
 * @param {活动ID} id 
 */
function getActivityInfo(id) {
  const res = activitys.doc(id).get()
  return res;
}

/**
 * 监听活动
 * @param {活动ID} id 
 */
function watchActivityInfo(id, onChange, onError) {
  activitys.doc(id).watch({
    onChange: onChange,
    onError: onError
  })
}

/**
 * 导出方法
 */
export {
  getActivitys,
  getActivityInfo,
  watchActivityInfo,
  getActsTotal
}