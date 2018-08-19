import g2Line from '@/components/g2/line'
import g2Point from '@/components/g2/point'
import g2Interval from '@/components/g2/interval'

export default {
  install: function (vue) {
    vue.component('g2Line', g2Line)
    vue.component('g2Point', g2Point)
    vue.component('g2Interval', g2Interval)
  }
}
