/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:53:14
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 08:46:15
 */

const state = {
  // 遮罩加载状态
  isShowLoading: false,
  // 登录后的tocken
  token: ''
}

// actions
const actions = {
  // 切换遮罩加载状态
  changeLoadingStatus ({ commit }, obj) {
    commit('changeLoadingStatus', obj.amount)
  },
  // 设置token
  setToken ({ commit }, obj) {
    commit('setToken', obj.amount)
    // 将token写入本地存储
    window.localStorage.setItem('token', obj.amount)
  }
}

// mutations
const mutations = {
  changeLoadingStatus (state, status) {
    state.isShowLoading = status
  },
  setToken (state, status) {
    state.setToken = status
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
