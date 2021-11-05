Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#D81920",
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath":"/images/icon_action_unchoose.png",
      "selectedIconPath": "/images/icon_action_choose.png",
      "text": "活动"
    },
    {
      "pagePath": "/pages/my/index",
      "iconPath":"/images/icon_my_unchoose.png",
      "selectedIconPath": "/images/icon_my_choose.png",
      "text": "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})