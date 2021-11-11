Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  methods:{
    goDaka: function (e) { //事件监听函数
      wx.navigateTo({
        url: '../attendance/index',
      })
    },
    goGift: function (e) { //事件监听函数
      wx.navigateTo({
        url: '../gift/index',
      })
    },
  }
})