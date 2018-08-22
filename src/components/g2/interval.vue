/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:56
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-22 14:32:10
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
    id: String,
    height: {
      type: Number,
      default: 300
    },
    axisName: {
      type: Object,
      default: () => {
        return { name: '类别', value: '数值' }
      }
    }
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
      }
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: this.height,
        padding: [50, 100, 80, 100]
      })
      this.chart.axis('name', {
        tickLine: null,
        title: {
          autoRotate: false,
          textStyle: {
            fill: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14',
            textBaseline: 'bottom'
          },
          position: 'end'
        }
      })
      this.chart.axis('value', {
        tickLine: null,
        title: {
          autoRotate: false,
          textStyle: {
            fill: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14',
            textBaseline: 'bottom'
          },
          position: 'end'
        }
      })
      this.chart.axis('name', {
        tickLine: null,
        label: {
          autoRotate: false
        },
        title: {
          autoRotate: false,
          textStyle: {
            fill: 'rgba(0, 0, 0, 0.7)',
            fontSize: '14',
            textBaseline: 'bottom'
          },
          position: 'end'
        }
      })
      this.chart.source(data, {
        name: {
          sync: true,
          alias: this.axisName.name
        },
        value: {
          sync: true,
          alias: this.axisName.value
        }
      })
      this.chart.interval().size(30).position('name*value')
      this.chart.render()
    }
  },
  mounted () {
    this.drawChart(this.data)
  }
}
</script>
