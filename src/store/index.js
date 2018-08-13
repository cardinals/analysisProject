/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:36
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 09:22:19
 */

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import aside from './modules/aside'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    aside
  },
  strict: process.env.NODE_ENV !== 'production'
})
