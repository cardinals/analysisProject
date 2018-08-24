/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:56
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-24 14:25:55
 * @Description: 基础饼图
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
        { name: '类别1', value: 2 },
        { name: '类别2', value: 1 }
      ]
    },
    id: String,
    height: {
      type: Number,
      default: 300
    },
    colorMap: {
      type: Array,
      default: () => {
        return G2.Global.colors
      }
    },
    guide: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    // 监听data，当发生变化时，重新绘制图表
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
        padding: 'auto'
      })
      this.chart.source(data, {
        name: {
          alias: '类型'
        },
        value: {
          alias: '数值'
        }
      })
      if (this.guide === {}) {
        this.chart.guide().html({
          position: ['50%', '50%'],
          html: `<div style="text-align: center;width: 10em;"><span style="color:#1890FF;font-size:16px">${data[0]['value'] < 1 ? String((data[0]['value'] * 100).toFixed(2)) + '%' : data[0]['value']}</span></div>`,
          alignX: 'middle',
          alignY: 'middle'
        })
      } else {
        this.chart.guide().html({
          position: ['50%', '50%'],
          html: `<div style="text-align: center;width: 10em;"><span style="color:rgba(0,0,0,0.65);font-size:12px">${this.guide.name}</span><br><span style="color:#000000;font-size:34px">${this.guide.value}</span></div>`,
          alignX: 'middle',
          alignY: 'middle'
        })
      }
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      })
      this.chart.coord('theta', {
        radius: 1,
        innerRadius: 0.7
      })
      this.chart.legend('name', {
        position: 'bottom-center'
      })
      this.chart.intervalStack().position('value').color('name', this.colorMap).style({
        lineWidth: 3,
        stroke: '#fff'
      }).tooltip('name*value', function (name, value) {
        return {
          name: name,
          value: value
        }
      })
      this.chart.render()
      let vue = this
      this.chart.on('interval:click', ev => {
        const data = ev.data._origin
        vue.$emit('itemClick', data)
      })
    }
  },
  mounted () {
    this.drawChart(this.data)
  }
}
</script>
