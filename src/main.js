/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:28
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 11:04:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import g2components from './components/g2/index'
import common from './components/common/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(g2components)
Vue.use(common)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
