import Vue from 'vue'
import Router from 'vue-router'


import Dashboard from '../components/Dashboard.vue'




// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path:'/dashboard',
      name: '首页',
      component: Dashboard
    }

  ]
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-token')
    next()
  } else if (to.path.startsWith('/dashboard')) {
    next()
  } else {
    let user = window.localStorage.getItem('access-token');
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router

