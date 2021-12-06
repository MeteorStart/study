import {
  getActivitys,
  watchActivityInfo,
  getActsTotal
} from '../../api/activitys.js'

import {
  register,
  getUser,
} from '../../api/users.js'

var app = getApp()

Component({
  pageLifetimes: {
    show() {
      let isFirst = wx.getStorageSync('isFirst')
      if (isFirst == "111") {
        console.log(isFirst)
        this.setData({
          isFirst: false
        })
        this.getUser()
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
    activitys: [],
    nowSize: 0,
    pageSize: 5
  },

  methods: {

    async onLoad(options) {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }

      this.getActivitys(this.data.nowSize, this.data.pageSize)

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

      app.globalData.openid = res.result.openid

      const user = await getUser(res.result.openid)
      app.globalData.user = user.data[0]
      return user
    },

    // 获取所有活动
    async getActivitys(skip, limit) {
      const list = await getActivitys(skip, limit)
      console.log('list', list.data)
      if (skip != 0) {
        this.setData({
          activitys: this.data.activitys.concat(list.data)
        })
      }else{
        this.setData({
          activitys: list.data
        })
      }
      console.log('activitys', this.data.activitys)
      this.watchActivity(list.data)
    },

    async onReachBottom() {
      let nowSize = this.data.activitys.length
      // 获取列表总数
      let {
        total
      } = await getActsTotal()
      // 判断是否还有数据
      if (nowSize < total) {
        wx.showLoading({
          title: '加载中',
        })
        this.getActivitys(nowSize, this.data.pageSize)
        wx.hideLoading()
      } else {
        wx.showToast({
          title: '已经到底了',
          icon: 'none'
        })
      }
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