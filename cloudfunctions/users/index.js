const getOpenId = require('./getOpenId/index')
const cashGift = require('./cashGift/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.type){
    case 'getOpenId':
      return await getOpenId.main(event,context)
    case 'cashGift':
      return await cashGift.main(event,context)

  }
}