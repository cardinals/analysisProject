/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:36
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-10 17:28:23
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 遮罩加载状态
    isShowLoading: false,
    // 侧边栏收起状态
    isCollapseAside: false,
    asideMenuData: [
      {
        index: '1',
        label: '导航一',
        status: true,
        children: {
          index: '1-1',
          label: '选项1-1',
          status: true,
          children: {}
        }
      },
      {
        index: '2',
        label: '导航二',
        status: true
      }
    ]
  },
  mutations: {
    // 切换遮罩加载状态
    isShowLoading (state, payplay) {
      state.isShowLoading = payplay.amount
    },
    // 切换侧边栏收起状态
    isCollapseAside (state, payplay) {
      state.isCollapseAside = payplay.amount
    }
  },
  actions: {

  }
})
