import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 引入全局的 CSS */
import 'normalize.css/normalize.css' // 优美的css
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'// Progress 进度条 样式
import '@assets/styles/element-ui.scss'
import '@assets/styles/index.scss'
import '@assets/styles/function.scss'

/* PWA */
import './registerServiceWorker'

/* i18n */
import i18n from './i18n/i18n'

import './icons' // icon
import * as filters from './utils/filters.js'
import NProgress from 'nprogress' // Progress 进度条

/* 完整引入 ElementUI，默认中文，默认尺寸 */
import locale from 'element-ui/lib/locale/lang/zh-CN'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'normal', locale })

/* 配置及信息注入 */
// default
Vue.config.productionTip = false
// console.log(process.env.VUE_APP_URL)

NProgress.configure({ showSpinner: false })// NProgress Configuration

// 注册全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑         永无 bug