// components/action/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      title: {
        type: String,
        value: '标题',
      },
      srcUrl: {
        type: String,
        value: 'https://img.yzcdn.cn/vant/cat.jpeg',
      },
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
      goDetail: function (e) {
        var myEventDetail = this.data; // detail对象 自定义事件所携带的数据，提供给事件监听函数
        console.log(this.properties)
        this.triggerEvent('events', myEventDetail);
      }
    },
  
    attached: function () {},
  
  })