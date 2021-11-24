// 配置表相关接口
const db = wx.cloud.database()
const setting = db.collection('xh-setting')
/**
 * 获取配置积分
 */
function getIntegral() {
  const res = setting
  .field({
    integral:true,
  })
  .get()
  return res
}

export{
  getIntegral
}