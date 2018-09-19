/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:53:14
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-19 15:49:07
 */

const state = {
  // 遮罩加载状态
  isShowLoading: false,
  // 当前登录用户
  userName: '用户名',
  // 地区数组, 用来控制数据权限
  area: []
}

// actions
const actions = {
  // 切换遮罩加载状态
  changeLoadingStatus ({ commit }, obj) {
    commit('changeLoadingStatus', obj.amount)
  },
  // 设置用户名
  setUserName ({ commit }, obj) {
    commit('setUserName', obj.amount)
  },
  // 设置地区数组
  setArea ({ commit }, obj) {
    commit('setArea', obj.amount)
  }
}

// mutations
const mutations = {
  changeLoadingStatus (state, status) {
    state.isShowLoading = status
  },
  setArea (state, data) {
    state.area = data
  },
  setUserName (state, data) {
    state.userName = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
