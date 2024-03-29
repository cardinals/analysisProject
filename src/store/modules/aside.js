/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:52:29
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-19 15:11:00
 */

const state = {
  // 侧边栏收起状态
  isCollapseAside: false,
  // 侧边栏当前选中项
  activeItem: '',
  // 侧边栏菜单数据
  asideMenuData: [
    // {
    //   index: 'home',
    //   label: '业务监控',
    //   disable: false
    // },
    // {
    //   index: 'teamAnalysis',
    //   label: '调解队伍分析',
    //   disable: false,
    //   children: [{
    //     index: 'organizationRankings',
    //     label: '调解机构排名',
    //     disable: false
    //   }, {
    //     index: 'peopleRankings',
    //     label: '调解人员排名',
    //     disable: false
    //   }]
    // },
    // {
    //   index: 'workAnalysis',
    //   label: '工作质量分析',
    //   disable: false,
    //   children: [{
    //     index: 'loginAnalysis',
    //     label: '登录人次分析',
    //     disable: false
    //   }]
    // }
  ]
}

// actions
const actions = {
  // 切换侧边栏状态
  changeAsideCollapseStatus ({ commit }, obj) {
    commit('changeAsideCollapseStatus', obj.amount)
  },
  // 设置侧边栏数据
  setAsideMenuData ({ commit }, obj) {
    commit('setAsideMenuData', obj.amount)
  },
  // 设置侧边栏当前选中项
  setCurrentModule ({ commit }, obj) {
    commit('setCurrentModule', obj.amount)
  }
}

// mutations
const mutations = {
  changeAsideCollapseStatus (state, status) {
    state.isCollapseAside = status
  },
  setAsideMenuData (state, data) {
    state.asideMenuData = data
  },
  setCurrentModule (state, data) {
    state.activeItem = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
