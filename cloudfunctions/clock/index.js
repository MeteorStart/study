const userClock = require('./userClock/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
      case 'userClock':
          return await userClock.main(event, context)
  }
}