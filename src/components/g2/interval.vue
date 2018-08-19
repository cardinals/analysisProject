/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:56
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-19 22:21:27
 * @Description: 基础柱状图
 */
<template>
  <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  props: {
    data: {
      type: Array,
      default: () => [
        { name: '暂无数据', value: 0 }
      ]
    },
    id: String
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    // 监  data，当发生变化时，重新绘制图表
    data: function (val, oldVal) {
      this.drawChart(val)
    }
  },
  methods: {
    drawChart: function (data) {
      // 如果图形存在则销毁后再创建
      if (this.chart) {
        this.chart.destroy()
      } else {
        this.chart = new G2.Chart({
          container: this.id,
          forceFit: true,
          height: 300
        })
      }
      this.chart.source(data)
      this.chart.interval().position('name*value')
      this.chart.render()
    }
  }
}
</script>
