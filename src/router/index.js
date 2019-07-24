import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录页',
      hidden: true,
      component: login
    }
  ]
})
