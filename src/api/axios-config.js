/**
 * axios请求配置
 * Created by qiuyifeng on 19/1/18.
 */
export default {
  serviceConfig: function() {
    return {
      // 基础url前缀
      // baseURL: process.env.VUE_APP_BASE_URL,
      baseURL: '',
      transformResponse: [function(response) {
        // 这里提前处理返回的数据
        return response
      }],
      // 是否跨域请求
      withCredentials: false,
      // 设置超时时间
      timeout: 600000,
      // 返回数据类型
      responseType: 'json'
    }
  }
}