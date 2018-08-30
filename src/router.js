/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:33
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-30 13:38:58
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
      name: '调解机构排名',
      // 机构排名模块
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      /* webpackChunkName: "organizationRankings" */
      component: () => import('./views/organizationRankings.vue')
    },
    {
      path: '/organizationDetail/:id',
      name: '机构详情',
      // 机构详情模块
      component: () => import('./views/organizationDetail.vue')
    },
    {
      path: '/mediationDetail/:id',
      name: '调委会详情',
      // 调委会详情模块
      component: () => import('./views/mediationDetail.vue')
    },
    {
      path: '/peopleRankings',
      name: '调解人员排名',
      // 人员排名模块
      component: () => import('./views/peopleRankings.vue')
    },
    {
      path: '/peopleDetail/:id',
      name: '人员详情',
      // 人员详情模块
      component: () => import('./views/peopleDetail.vue')
    },
    {
      path: '/g2Demo',
      name: '测试模块',
      // 登录模块
      component: () => import('./views/g2Demo.vue')
    },
    {
      path: '/home',
      name: '首页',
      // 登录模块
      component: () => import('./views/home.vue')
    },
    {
      path: '/loginAnalysis',
      name: '登录人次',
      // 登录人次分析
      component: () => import('./views/loginAnalysis.vue')
    },
    {
      path: '/error/:code',
      name: '错误页',
      // 错误页
      component: () => import('./views/error.vue')
    },
    {
      path: '*',
      redirect: '/error/404'
    }
  ]
})
