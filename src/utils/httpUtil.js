/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-14 09:28:41
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-17 16:54:26
 */

import axios from 'axios'
// import QS from 'qs'
import {Message} from 'element-ui'
import store from '@/store/index'

// 设置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

// 请求超时时间
axios.defaults.timeout = 10000

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 打开加载遮罩
    store.dispatch({ type: 'app/changeLoadingStatus', amount: true })
    // 在http请求的header都加上token
    // const token = store.state.app.token
    // config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 关闭加载遮罩
    store.dispatch({ type: 'app/changeLoadingStatus', amount: false })
    return Promise.resolve(response)
  },
  error => {
    // 关闭加载遮罩
    store.dispatch({ type: 'app/changeLoadingStatus', amount: false })
    if (error.status === 500) {
      Message.error('500 内部服务器错误！')
    }
    return Promise.reject(error.response)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export let get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export let post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
