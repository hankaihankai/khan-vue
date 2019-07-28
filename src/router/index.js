import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import main from '@/views/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录页',
      hidden: true,
      component: login
    },
    {
      path: '/main/',
      name: '主页',
      hidden: true,
      component: main
    }
  ]
})
