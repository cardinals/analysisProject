/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:52:29
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-16 10:33:38
 */

const state = {
  // 侧边栏收起状态
  isCollapseAside: false,
  activeItem: 'organizationRankings',
  // 侧边栏菜单数据
  asideMenuData: [
    // {
    //   index: 'home',
    //   label: '首页',
    //   disable: false
    // },
    // {
    //   index: 'businessNum',
    //   label: '业务数量',
    //   disable: false
    // },
    {
      index: 'none',
      label: '调解队伍分析',
      disable: false,
      children: [{
        index: 'organizationRankings',
        label: '调解机构排名',
        disable: false
      }, {
        index: 'peopleRankings',
        label: '调解人员排名',
        disable: false
      }]
    }
    // {
    //   index: 'workquality',
    //   label: '工作质量分析',
    //   disable: false
    // }
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
    state.asideMenuData = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
