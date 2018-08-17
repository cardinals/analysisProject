/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 08:53:14
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-16 10:35:46
 */

import {login} from '@/api/api'

const state = {
  // 遮罩加载状态
  isShowLoading: false,
  token: '',
  isLogin: false
}

// getters
const getters = {}

// actions
const actions = {
  // 切换遮罩加载状态
  changeLoadingStatus ({ state, commit }, obj) {
    commit('changeLoadingStatus', obj.amount)
  },
  // 切换登录状态状态
  changeLoginStatus ({ state, commit }, obj) {
    commit('changeLoginStatus', obj.amount)
  },
  userLogin ({ commit }) {
    return new Promise((resolve, reject) => {
      const params = {username: 's1', password: '102102102'}
      login(params).then(res => {
        commit('changeLoginStatus', true)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// mutations
const mutations = {
  changeLoadingStatus (state, status) {
    state.isShowLoading = status
  },
  changeLoginStatus (state, status) {
    state.isLogin = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
