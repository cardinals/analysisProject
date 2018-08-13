/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:33
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 19:52:52
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 重定向根路径对应的模块
      redirect: '/organizationRankings'
    },
    {
      path: '/organizationRankings',
      name: 'organizationRankings',
      // 机构排名模块
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "organizationRankings" */ './views/organizationRankings.vue')
    },
    {
      path: '/organizationDetail/:id',
      name: 'organizationDetail',
      // 机构详情模块
      component: () => import('./views/organizationDetail.vue')
    },
    {
      path: '/peopleRankings',
      name: 'peopleRankings',
      // 人员排名模块
      component: () => import('./views/peopleRankings.vue')
    },
    {
      path: '/peopleDetail/:id',
      name: 'peopleDetail',
      // 人员详情模块
      component: () => import('./views/peopleDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      // 登录模块
      component: () => import('./views/login.vue')
    }
  ]
})
