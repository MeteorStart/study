import {
  getActivitys,
  getActivityInfo
} from '../../api/activitys.js'

import {
  register,
  getUsre,
  changeUserGift
} from '../../api/users.js'

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
    isFirst: true
  },

  methods: {
    close() {
      this.setData({
        isFirst: false
      })
    },

    goChoose() {
      wx.navigateTo({
        url: '../gift/index',
      })
    },
    goDetail: function (e) { //事件监听函数
      console.log("子组件传过来的数据：" + e.detail.title + e.detail.srcUrl)
      wx.navigateTo({
        url: '../actionDetail/index',
      })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    async onLoad(options) {
      const list = await getActivitys()
      console.log('list', list)
      const info = await getActivityInfo("859059a56191f9b705ee65401e14cca5")
      console.log('info', info)

      this.registerUser()
    },

    async registerUser() {
      let userInfo = {
        nickName: 'ym',
        avatarUrl: 'xx'
      }
      const res = await wx.cloud.callFunction({
        name: 'users',
        data: {
          type: 'getOpenId'
        }
      })
      console.log('openid', res.result.openid)
      const user = await getUsre(res.result.openid)
      console.log('user', user)
      if (user.data.length == 0) {
        const registerRes = await register(userInfo)
        console.log('注册成功', registerRes)
      } else {
        console.log('已经注册', user.data[0])
      }
      const changeRes = await changeUserGift(user.data[0]._id, 'fa24ce1a6191f56d06a3b0af7ac793d8')
      console.log('changeRes', changeRes)
    }
  },
})