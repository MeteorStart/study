const getActivitys = require('./getActivitysCount/index')

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getActivitysCount':
            return await getActivitys.main(event, context)
    }
}