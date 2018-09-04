/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:56
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-04 17:56:13
 * @Description: 基础饼图
 */
<template>
  <div :id="id"></div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import {percentFormat, numFormat} from '@/utils/index'

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
    },
    legendOption: {
      type: Object,
      default: () => {
        return {
          show: true,
          position: 'bottom-center'
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    // 监控data，当发生变化时，重新绘制图表
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
      const ds = new DataSet()
      const dv = ds.createView()
        .source(data)
        .transform({
          type: 'percent',
          field: 'value',
          dimension: 'name',
          as: 'percent'
        })
      this.chart.source(dv, {
        name: {
          alias: '类型'
        },
        value: {
          alias: '数值'
        },
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(1) + '%'
            return val
          }
        }
      })
      if (this.guide.name) {
        this.chart.guide().html({
          position: ['50%', '50%'],
          html: `<div style="text-align: center;width: 10em;"><span style="color:rgba(0,0,0,0.65);font-size:12px">${this.guide.name}</span><br><span style="color:#000000;font-size:16px">${this.guide.value <= 1 ? percentFormat(this.guide.value) : numFormat(this.guide.value)}</span></div>`,
          alignX: 'middle',
          alignY: 'middle'
        })
      } else {
        this.chart.guide().html({
          position: ['50%', '50%'],
          html: `<div style="text-align: center;width: 10em;"><span style="color:#1890FF;font-size:16px">${data[0]['value'] <= 1 ? percentFormat(data[0]['value']) : numFormat(data[0]['value'])}</span></div>`,
          alignX: 'middle',
          alignY: 'middle'
        })
      }
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      })
      this.chart.coord('theta', {
        radius: 0.9,
        innerRadius: 0.75
      })
      this.chart.intervalStack().position('value').color('name', this.colorMap).style({
        lineWidth: 3,
        stroke: '#fff'
      }).tooltip('name*value', function (name, value) {
        return {
          name: name,
          value: value <= 1 ? percentFormat(value) : numFormat(value)
        }
      })
      if (this.legendOption.show && this.legendOption.position === 'right-center') {
        this.chart.legend('name', {
          position: this.legendOption.position,
          useHtml: true,
          containerTpl: `<div class="g2-legend"><table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;width:220px;"></table></div>`,
          itemTpl: (value, color, checked, index) => {
            const obj = dv.rows[index]
            checked = checked ? 'checked' : 'unChecked'
            return `<tr class="g2-legend-list-item item-${index}  ${checked}" data-value="${value}" data-color="${color}" style="cursor: pointer;font-size: 14px;">
                      <td width=150 style="border: none;padding:0;">
                        <i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:${color};"></i>
                         <span class="g2-legend-text">${value}</span>
                      </td>
                      <td style="text-align: right;border: none;padding:0;">${percentFormat(obj.percent)}</td>
                    </tr>`
          },
          'g2-legend': {
            marginLeft: '-175px'
          },
          'g2-legend-list': {
            border: 'none'
          }
        })
      } else if (this.legendOption.show && this.legendOption.position !== 'right-center') {
        this.chart.legend('name', {
          position: this.legendOption.position
        })
      } else {
        this.chart.legend(false)
      }
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
