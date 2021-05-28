const app = getApp()
const baseUrl = app.globalData.baseUrl


const request = (url, method = 'GET', options = {}) => {
    return new Promise((resolve, reject) => {
        if (method == 'PATCH') {
            method = 'POST'
            options = {
                ...options,
                data: {
                    ...options.data,
                    _method: 'PATCH'
                }
              }
        }
        wx.showLoading()
        wx.request({
            url: baseUrl + url,
            method: method,
            data: options.data,
            header: {
                ...options.header,
                Authorization: 'Bearer ' + wx.getStorageInfoSync('token') || ''
            },
            timeout: 10000,
            success (res) {
                if (res.statusCode < 400){
                    resolve(res.data)
                } else {
                    let msg = '请求出错'

                    if (res.statusCode === 400) {
                        msg = res.data.message
                    } else if (res.statusCode === 401) {
                        msg = '请登录'
                        // TODO 跳转到登录
                    } else if (res.statusCode === 404) {
                        msg = '请求地址出错,找不到页面'
                    } else if (res.statusCode === 422) {
                        mas = res.data.errors[Object.keys(res.data.errors)[0]][0]
                    }
                    wx.showToast({
                        title: msg,
                        icon: 'error',
                        duration: 2000
                    })
                }
            },
            fail (res) {
                reject(res)
                wx.showToast({
                    title: '网络错误',
                    icon: 'error',
                    duration: 2000
                })
            },
            complete () {
                wx.hideLoading()
            }
        })
    })
}

const e = {
    request,
    get(url, options = {}) {
        return request(url, 'GET', options)
    },
    post(url, options = {}) {
        return request(url, 'POST', options)
    },
    put(url, options = {}) {
        return request(url, 'PUT', options)
    },
    delete(url, options = {}) {
        return request(url, 'DELETE', options)
    },
    patch(url, options = {}) {
        return request(url, 'PATCH', options)
    }
}

module.exports = e