/**
 * Created by qiuyifeng on 19/1/18.
 */
import axios from 'axios'
import qs from 'qs'
import config from './axios-config'
import { MessageBox } from 'element-ui'

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  const data = response.data
  if (data.code === 401 || data.code === 1017) {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
    })
  } else {
    return response.data
  }
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求参数错误'
        break
      case 401:
        this.$router.push({ path: '/' })
        err.message = '未授权，请登录'
        // 登录失败将用户信息清除
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求地址出错'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})
export default {
  post: (url, data, callback) => {
    axios.post(url, data, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  },
  delete: (url, data, callback) => {
    const param = qs.stringify(data)
    axios.delete(url + '?' + param, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  },
  put: (url, data, callback) => {
    axios.put(url, data, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  },
  patch: (url, data, callback) => {
    axios.patch(url, data, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  },
  get: (url, data, callback) => {
    const param = qs.stringify(data)
    axios.get(url + '?' + param, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  },
  getSingle: (url, data, callback) => {
    axios.get(url + '/' + data.number, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.log(error)
      })
  },
  list: (url, data, callback) => {
    const param = qs.stringify(data)
    axios.get(url + '?' + param, config.serviceConfig())
      .then(callback)
      .catch((error) => {
        console.info(error)
      })
  }
}
