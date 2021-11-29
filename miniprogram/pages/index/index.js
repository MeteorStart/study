import {
  getActivitys,
  getActivityInfo,
  watchActivityInfo
} from '../../api/activitys.js'

import {
  register,
  getUser,
  changeUserGift,
  getUserSort,
  changeUserIntegral,
  changeUserClockCount
} from '../../api/users.js'

import {
  getArticleInfo,
  getArticles
} from '../../api/articles.js'

import {
  addClocks,
  queryTimeClocks,
  queryUserIsClock,
  getClocksByMonth
} from '../../api/clocks.js'

import {
  getGifts,
  getGiftInfo,
} from '../../api/gifts.js'

import {
  getIntegral
} from '../../api/setting.js'

import {
  addRecord,
  getUseRecords
} from '../../api/use-records.js'
Component({
  pageLifetimes: {
    show() {
      let isFirst = wx.getStorageSync('isFirst')
      if (isFirst == "111") {
        console.log(isFirst)
        this.setData({
          isFirst: false
        })
      } else {
        console.log("首次打开")
        wx.setStorageSync('isFirst', "111")
      }

      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    },
  },

  data: {
    isFirst: true,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    activitys: []
  },

  methods: {

    async onLoad(options) {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }

      this.getActivitys()

      const res = await wx.cloud.callFunction({
        name: 'activitys',
        data: {
          type: 'getActivitysCount'
        }
      })
      console.log('activitysCount', res.result.list[0])
    },

    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      if (!this.data.hasUserInfo) {
        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            console.log('userinfo', res.userInfo)
            this.registerUser(res.userInfo)
          }
        })
      } else {
        this.goChoose()
      }
    },

    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      if (!this.data.hasUserInfo) {
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        console.log('userinfo', res.userInfo)
      } else {
        this.goChoose()
      }
    },

    close() {
      this.setData({
        isFirst: false
      })
    },

    goChoose() {
      this.close()
      wx.navigateTo({
        url: '../gift/index',
      })
    },

    goDetail: function (e) { //事件监听函数
      console.log("子组件传过来的数据：" + e.currentTarget.dataset.postid + e.detail.title + e.detail.srcUrl)
      wx.navigateTo({
        url: '../actionDetail/index?activityId=' + JSON.stringify(e.currentTarget.dataset.postid)
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    async getUseRecords() {
      const list = await getUseRecords()
      console.log('list', list.data)
    },

    async addRecord() {
      const res = await addRecord('fa24ce1a61922aa906b3873a203db15c', 'fa24ce1a6191f56d06a3b0af7ac793d8', 0, "1")
      console.log('res', res)
    },

    async getIntegral() {
      const integral = await getIntegral()
      console.log('integral', integral)
    },

    async getGifts() {
      const list = await getGifts()
      console.log('list', list)
    },

    async getGiftInfo() {
      const giftInfo = await getGiftInfo('fa24ce1a6191f56d06a3b0af7ac793d8')
      console.log('giftInfo', giftInfo)
    },

    // 查询用户是否打卡
    async queryUserIsClock() {
      const list = await queryUserIsClock('fa24ce1a61922aa906b3873a203db15c')
      if (list.data.length == 0) {
        console.log('无打卡记录')
      } else {
        console.log('有打卡记录：', list)
      }
    },

    // 查询时间段内的打卡记录
    async queryTimeClocks() {
      const clocks = await queryTimeClocks('fa24ce1a61922aa906b3873a203db15c', 1536992000000, 1736992000000)
      console.log('clocks', clocks)
    },

    // 添加打卡记录
    async addClocks() {
      const addClock = await addClocks('18ed09686191f9db055bc49b490cfeea', 'fa24ce1a61922aa906b3873a203db15c', '859059a56191f9b705ee65401e14cca5')
      console.log('addClock', addClock)
    },

    // 获取文章详情
    async getArticleInfo(activityId) {
      const articleInfo = await getArticleInfo(activityId)
      console.log('articleInfo', articleInfo)
    },

    // 更改用户积分
    async changeUserIntegral(userId, integral) {
      const changeRes = await changeUserIntegral(userId, integral)
      console.log('changeRes', changeRes)
    },

    // 更改用户打卡天数
    async changeUserClockCount(userId, clockCount) {
      const changeRes = await changeUserClockCount(userId, clockCount)
      console.log('changeRes', changeRes)
    },

    // 通过积分排序
    async getUserSort() {
      const res = await getUserSort()
      console.log('res', res)
    },

    // 注册用户
    async registerUser(userInfo) {
      const user = await this.getUser()
      if (user.data.length == 0) {
        const registerRes = await register(userInfo)
        console.log('注册成功', registerRes)
      } else {
        console.log('已经注册', user.data[0])
      }
    },

    // 根据openId 获取用户
    async getUser() {
      const res = await wx.cloud.callFunction({
        name: 'users',
        data: {
          type: 'getOpenId'
        }
      })
      console.log('openid', res.result.openid)
      const user = await getUser(res.result.openid)
      return user
    },

    // 更改用户礼物
    async changeUserGift(user) {
      const changeRes = await changeUserGift(user.data[0]._id, 'fa24ce1a6191f56d06a3b0af7ac793d8')
      console.log('changeRes', changeRes)
    },

    // 获取所有活动
    async getActivitys() {
      const list = await getActivitys()
      console.log('list', list.data)
      this.setData({
        activitys: list.data
      })
      console.log('activitys', this.data.activitys)

      this.watchActivity(this.data.activitys)

    },

    watchActivity(list) {
      let onChange = function (snapshot) {
        console.log('snapshot', snapshot)
      }

      let onError = function (err) {
        console.log('err', err)
      }

      list.forEach(function (element) {
        // console.log(element);
        watchActivityInfo(element._id, onChange, onError)
      });
    }
  },
})
