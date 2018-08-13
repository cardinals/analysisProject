import axios from 'axios'
import QS from 'qs'
import {Message} from 'element-ui'
import store from '@/store/index'
import router from '@/router'

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
    if (response.status === 200) {
      // 未登录/登陆失效, 重定向到登陆模块
      if (response.data.code === 10) {
        Message.warning('未登录/登陆已失效, 请重新登录!')
        router.replace({
          path: '/login'
        })
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
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
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
