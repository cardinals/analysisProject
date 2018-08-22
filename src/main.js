/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:28
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-22 16:47:57
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

// 全局过滤器
// 处理百分比
Vue.filter('percentFormat', function (value) {
  if (!value) return '0%'
  return `${(value * 100).toFixed(2)}%`
})
// 处理千位分隔
Vue.filter('numFormat', function (value) {
  if (!value) return 0
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return String(value.toFixed(1)).replace(reg, '$&,')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
