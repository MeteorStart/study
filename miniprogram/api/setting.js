// 配置表相关接口

/**
 * 获取配置积分
 */
function getIntegral() {
  const db = wx.cloud.database();
  const integral = db.collection('xh-setting');
  return integral.orderBy('integral', 'esc').get()
}

export{
  getIntegral
}