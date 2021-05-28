const request = require('../utils/request')

/**
 * 首页数据api
 * @returns {Promise<unknown>}
 */
export const index = () => {
    return request.get('/api/index')
}
