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

    }
  },
})