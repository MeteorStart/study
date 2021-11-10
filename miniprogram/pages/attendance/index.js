// pages/attendance/index.js
const conf = {
  data: {
    // 此处为日历自定义配置字段
    calendarConfig: {
      multi: true, // 是否开启多选,
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
    }
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail)
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e)
    this.setData({
      rst: []
    })
    const calendar = this.calendar
    const { year, month } = calendar.getCurrentYM()
    const toSet = [
      {
        year,
        month,
        day: this.generateRandomDate('date')
      },
      {
        year,
        month,
        day: this.generateRandomDate('date')
      }
    ]
    calendar.setSelectedDays(toSet)
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  takeoverTap(e) {
    console.log('takeoverTap', e.detail) // => { year: 2019, month: 12, date: 3, ...}
  },
  /**
   * 选择日期后执行的事件
   */
  onTapDay(e) {
    console.log('onTapDay', e.detail)
  },
  generateRandomDate(type) {
    let random = ~~(Math.random() * 10)
    switch (type) {
      case 'year':
        random = 201 * 10 + ~~(Math.random() * 10)
        break
      case 'month':
        random = (~~(Math.random() * 10) % 9) + 1
        break
      case 'date':
        random = (~~(Math.random() * 100) % 27) + 1
        break
      default:
        break
    }
    return random
  },
}

Page(conf, {

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
  },
})