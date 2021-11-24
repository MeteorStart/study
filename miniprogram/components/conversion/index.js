// components/action/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    state: {
      type: Boolean,
      value: false,
    },
    srcUrl: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    giftName: {
      type: String,
      value: '礼物标题',
    },
    needIntegral: {
      type: String,
      value: '100',
    },
    CDKEY: {
      type: String,
      value: '1102010021',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    changed: '已兑换',
    noChange: '未兑换'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached: function () {},

})