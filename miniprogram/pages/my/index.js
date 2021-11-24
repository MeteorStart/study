Component({
  data: {
    isLoad: true,
    userAvatar:'../../images/icon-dfu-user.png',
    userName:'未登录'
  },
  
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
    goConversion: function (e) { //事件监听函数
      wx.navigateTo({
        url: '../conversion/index',
      })
    },
  }
})