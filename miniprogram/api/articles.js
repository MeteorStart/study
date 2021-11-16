// 文章表相关接口

/**
 * 获取文章列表
 */
function getArticles() {
  const db = wx.cloud.database();
  const articles = db.collection('xh-articles');
  return articles.orderBy('_createTime', 'desc').get().then(console.log)
}
/**
 * 获取文章详细信息
 * @param {活动ID} id 
 */
function getArticleInfo(activityId) {
  const db = wx.cloud.database();
  const articles = db.collection('xh-articles');
  const res = articles.where({
    activityId: activityId
  }).get()
  return res;
}

export {
  getArticles,
  getArticleInfo
}