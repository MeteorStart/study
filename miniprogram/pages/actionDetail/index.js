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

import {
  getGiftInfo,
} from '../../api/gifts.js'

var app = getApp()
var time = require('../../utils/DateUtils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: ['https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg', 'https://img.yzcdn.cn/vant/cat.jpeg'],
    activityInfo: {},
    articleInfo: {},
    giftInfo: {},
    clockUserList: [],
    activityStartDate: '',
    activityEndDate: '',
    integral: 0,
    needIntegral: 0,
    isClock: false
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
  clock: function () {
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: ['SH5eYsuzKv1_n0t4CyOQH2Djd9KmVDMAs1iQRIdHUIU'],
      success(res) {
        console.log(res)
        if (res.SH5eYsuzKv1_n0t4CyOQH2Djd9KmVDMAs1iQRIdHUIU == 'accept') {
          // 发送消息给到用户
          wx.cloud.callFunction({
            name: 'sendMessage'
          }).then(res => {
            console.log(res)
            that.goWeb()
          })
        }
      }
    })
  },

  goWeb: function () {
    if (!this.data.activityInfo.isClock) {
      let clockInfo = {
        activityId: this.data.articleInfo.activityId,
        articleId: this.data.articleInfo._id,
        userId: app.globalData.user._id
      }
      this.userClock(clockInfo)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = app.globalData.user
    console.log("当前用户:", user)
    if (user) {
      this.setData({
        integral: user.integral
      })
    }
    console.log("当前用户礼物ID:", user.giftId)

    this.getGiftInfo(user.giftId).then(giftInfo => {
      if (giftInfo) {
        let needIntegral = giftInfo.integral - this.data.integral
        this.setData({
          giftInfo: giftInfo,
          needIntegral: needIntegral
        })
      }
    })

    let activityId = JSON.parse(options.activityId)
    console.log("子组件传过来的activityId：" + activityId)

    this.getDeatil(activityId, user._id)

  },
  /** 
   * 获取活动和文章详情
   **/
  getDeatil: function (activityId, userId) {
    wx.cloud.callFunction({
      name: 'activitys',
      data: {
        type: 'getActivitysDetail',
        activityId: activityId,
        userId: userId
      }
    }).then(res => {
      console.log('查询活动详情', res.result)
      let activityInfo = res.result.list[0]

      if (activityInfo) {
        this.setData({
          activityInfo: activityInfo,
          isClock: activityInfo.isClock,
          activityStartDate: time.formatTimeTwo(activityInfo.startDate / 1000, 'Y年M月D'),
          activityEndDate: time.formatTimeTwo(activityInfo.endDate / 1000, 'Y年M月D')
        })
        console.log('活动开始时间：', time.formatTimeTwo(activityInfo.startDate / 1000, 'Y年M月D'))
        console.log('活动结束时间：', time.formatTimeTwo(activityInfo.endDate / 1000, 'Y年M月D'))
      }

      let articleInfo = res.result.list[0].article
      if (activityInfo) {
        this.setData({
          articleInfo: articleInfo
        })
        this.getClockUserList(articleInfo)
      }

      let clockInfo = res.result.list[0].clocks[0]
      // userClock(clockInfo)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 根据openId 获取用户
  async getGiftInfo(giftId) {
    const giftInfo = await getGiftInfo(giftId)
    console.log('礼物详情', giftInfo.data[0])
    return giftInfo.data[0]
  },

  /**
   * 打卡
   */
  userClock(clockInfo) {
    console.log('打卡信息', clockInfo)
    wx.cloud.callFunction({
      name: 'clock',
      data: {
        type: 'userClock',
        clockInfo: clockInfo
      }
    }).then(res => {
      console.log('查询礼物兑换信息', res.result)
      this.setData({
        isClock: true
      })
      this.getClockUserList(this.data.articleInfo)
      wx.navigateTo({
        url: '../webview/index',
      })
    })
  },

  /**
   * 获取打卡用户列表
   */
  getClockUserList(article) {
    wx.cloud.callFunction({
      name: 'clock',
      data: {
        type: 'clockUserList',
        activityId: article.activityId,
        articleId: article._id
      }
    }).then(res => {
      console.log('打卡用户列表', res.result)
      if (res.result.list[0]) {
        this.setData({
          clockUserList: res.result.list[0].clockUsers
        })
      }
    })
  }
})