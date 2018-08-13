/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:53:14
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 10:22:19
 */

const state = {
  // 遮罩加载状态
  isShowLoading: false,
  // tocken
  token: ''
}

// getters
const getters = {}

// actions
const actions = {
  // 切换遮罩加载状态
  changeLoadingStatus ({ state, commit }, obj) {
    commit('changeLoadingStatus', obj.amount)
  }
}

// mutations
const mutations = {
  changeLoadingStatus (state, status) {
    state.isShowLoading = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
