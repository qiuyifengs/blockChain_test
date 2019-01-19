import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/containers/Home.vue'
import ElementUI from 'element-ui'
import Blocks from './views/containers/Blocks.vue'
import Transactions from './views/containers/Transactions.vue'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: Blocks
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]
})
