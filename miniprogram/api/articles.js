// 文章表相关接口
const db = wx.cloud.database();
const articles = db.collection('xh-articles');
/**
 * 获取文章列表
 */
function getArticles() {
  const res = articles.where({
    activityId:activityId
  })
  .field({
    title:true,
    url:true
  })
  .get()
  return res
}
/**
 * 获取文章详细信息
 * @param {活动ID} id 
 */
function getArticleInfo(activityId) {
  const res = articles.where({
    activityId: activityId
  }).get()
  return res;
}

export {
  getArticles,
  getArticleInfo
}