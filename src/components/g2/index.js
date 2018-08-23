import g2Line from '@/components/g2/line'
import g2Point from '@/components/g2/point'
import g2Histogram from '@/components/g2/histogram'
import g2Pie from '@/components/g2/pie'
import g2MirrorInterval from '@/components/g2/mirrorInterval'

export default {
  install: function (vue) {
    vue.component('g2Line', g2Line)
    vue.component('g2Point', g2Point)
    vue.component('g2Histogram', g2Histogram)
    vue.component('g2Pie', g2Pie)
    vue.component('g2MirrorInterval', g2MirrorInterval)
  }
}
