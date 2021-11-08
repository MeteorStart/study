Component({
    /**
     * 组件的属性列表
     */
    properties: {
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
      isChoose:{
        type:Boolean,
        value:false
      }
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      choose:"已选择",
      noChoose:"选择",
      chooseClass:"gift-choose",
      noChooseClass:"gift-nochoose"
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