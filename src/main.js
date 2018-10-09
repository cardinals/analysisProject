/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:28
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-09 16:40:10
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-g2'
import common from './components/common/index'
import echarts from 'echarts/lib/echarts'
import 'echarts-gl/dist/echarts-gl.min'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(common)

// 全局过滤器
// 处理百分比
Vue.filter('percentFormat', function (value) {
  if (!value) return '0%'
  value = value * 100
  return String(value).indexOf('.') > 0 ? `${value.toFixed(1)}%` : `${parseInt(value)}%`
})
// 处理千位分隔
Vue.filter('numFormat', function (value) {
  if (!value) return 0
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return String(String(value).indexOf('.') > 0 ? value.toFixed(1) : parseInt(value)).replace(reg, '$&,')
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    window.echarts = echarts
    window.mapboxgl = mapboxgl
  }
}).$mount('#app')
