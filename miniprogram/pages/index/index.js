Page({
  data: {
    isFirst:true
  },

  close(){
    this.setData({
      isFirst:false
    })
  },
  
  goChoose(){

  },
})

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})