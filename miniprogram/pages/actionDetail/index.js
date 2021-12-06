// pages/actionDetail/index.js
/** 
 *  1、通过活动ID获取活动详情
 *  2、通过活动ID获取文章详情
 *  3、通过用户ID获取礼物ID 用户积分
 *  4、通过礼物ID获取礼物详情
 *  5、通过活动ID获取打卡记录
 *  6、通过打卡记录获取打卡用户ID
 *  7、通过打卡用户ID获取打卡用户头像
 * */
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg']
  },

  changeGift: function () {
    wx.navigateTo({
      url: '../gift/index',
    })
  },
  goIntegral: function () {
    wx.navigateTo({
      url: '../integral/index',
    })
  },
  goWeb: function () {
    wx.navigateTo({
      url: '../webview/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = app.globalData.user
    console.log("当前用户:", user)

    let that = this
    let activityId = JSON.parse(options.activityId)
    console.log("子组件传过来的activityId：" + activityId)

    this.getDeatil(activityId, user._id)

  },

  getDeatil: function (activityId, userId) {
    wx.cloud.callFunction({
      name: 'activitys',
      data: {
        type: 'getActivitysDetail',
        activityId: activityId,
        userId: userId
      }
    }).then(res => {
      console.log('查询礼物兑换信息', res.result)
      let clockInfo = res.result.list[0].clocks[0]
      console.log('打卡信息', clockInfo)
    })
  },

  userClock: function (clockInfo) {
    wx.cloud.callFunction({
      name: 'clock',
      data: {
        type: 'userClock',
        clockInfo: clockInfo
      }
    }).then(res => {
      console.log('查询礼物兑换信息', res.result)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})