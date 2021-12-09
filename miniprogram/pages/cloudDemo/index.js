// pages/cloudDemo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onMsg:function(){
    wx.requestSubscribeMessage({
      tmplIds: ['SH5eYsuzKv1_n0t4CyOQH2Djd9KmVDMAs1iQRIdHUIU'],
      success(res) {
        console.log(res)
        if(res.SH5eYsuzKv1_n0t4CyOQH2Djd9KmVDMAs1iQRIdHUIU=='accept'){
          // 发送消息给到用户
          wx.cloud.callFunction({
            name: 'sendMessage'
          }).then(res => {
            console.log(res)
          })
        }
      }
    })
  },

  getPhoneNumber (e) {
    console.log(e)
    //由于未认证  无法获取授权
    if (e.detail.cloudID) {
      wx.cloud.callFunction({
        name: 'getPhoneNumber',
        data: {
          phoneNumber: wx.cloud.CloudID(e.detail.cloudID), // 这个 CloudID 值到云函数端会被替换
        }
      }).then(res=>{
        console.log('getPhoneNumber',res)
      })
    } else {
      console.log('用户拒绝授权')
    }
  }
})