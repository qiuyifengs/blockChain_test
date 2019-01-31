import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/containers/Home.vue'
import ElementUI from 'element-ui'
import Blocks from './views/containers/Blocks.vue'
import BlocksDetail from './views/containers/Blocks-detail.vue'
import Transactions from './views/containers/Transactions.vue'
import TransactionsDetail from './views/containers/Transactions-detail.vue'
import Representatives from './views/containers/representatives.vue'

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
      path: '/blocks-detail/:id',
      name: 'blocks-detail',
      props: true,
      component: BlocksDetail
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    },
    {
      path: '/transactions-detail/:id',
      name: 'transactions-detail',
      props: true,
      component: TransactionsDetail
    },
    {
      path: '/representatives',
      name: 'representatives',
      component: Representatives
    }
  ]
})
