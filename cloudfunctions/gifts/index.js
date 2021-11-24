const getUserRecords = require('./getUserRecords/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.type){
    case 'getUserRecords':
      return await getUserRecords.main(event,context)
  }
}