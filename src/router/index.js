import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  mode:'hash',  //hash,history，history打包静态无法展示，不知道要怎么设置才行
  routes: [
    {
      path: '',
      component: Index
    },{
      path: '/',
      component: Index
    },{
      path: '/login',
      component: Login
    }

  ]
})


