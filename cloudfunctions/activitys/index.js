const getActivitysDetail = require('./getActivitysDetail/index')

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getActivitysDetail':
            return await getActivitysDetail.main(event, context)
    }
}