// components/action/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankClass: {
      type: String,
      value: 'integral-rank-1',
    },
    rank: {
      type: String,
      value: '1',
    },
    srcUrl: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    nickName: {
      type: String,
      value: '用户名',
    },
    integral: {
      type: String,
      value: '100积分',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached: function () {
   // 组件生命周期函数，在组件实例进入页面节点树时执行。可以使用setData来初始化数据，但无法操作节点
    let rank = this.data.rank
      switch(rank){
        case '1' :{
          this.setData({
            rankClass:"integral-rank-1"
          })
          break;
        }
        case '2' :{
          this.setData({
            rankClass:"integral-rank-2"
          })
          break;
        }
        case '3' :{
          this.setData({
            rankClass:"integral-rank-3"
          })
          break;
        }
        default:{
          this.setData({
            rankClass:"integral-rank-4"
          })
        }
      }
  },
})