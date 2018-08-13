/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:52:29
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 10:41:14
 */

const state = {
  // 侧边栏收起状态
  isCollapseAside: false,
  asideMenuData: [
    {
      index: '1',
      label: '机构排名',
      status: true,
      children: {
        index: '1-1',
        label: '选项1-1',
        status: false,
        children: {}
      }
    },
    {
      index: '2',
      label: '人员排名',
      status: true
    }
  ]
}

// getters
const getters = {
  asideMenuData: (state, getters) => {
    return state.asideMenuData
  }
}

// actions
const actions = {
  // 切换侧边栏状态
  changeAsideCollapseStatus ({ state, commit }, obj) {
    commit('changeAsideCollapseStatus', obj.amount)
  },
  // 异步获取侧边栏数据
  getAsideMenuData ({ state, commit }) {
    let data = []
    commit('setAsideMenuData', data)
  }
}

// mutations
const mutations = {
  changeAsideCollapseStatus (state, status) {
    state.isCollapseAside = status
  },
  setAsideMenuData (state, data) {
    state.isCollapseAside = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
