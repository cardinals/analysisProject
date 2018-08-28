/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-27 14:03:38
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-28 13:55:07
 */

<template>
  <div class="home" v-if="data">
    <div class="nav">
      <span class="span1">首页</span>
      <el-select v-model="area" placeholder="请选择区域" size="mini" class="areaSelector">
        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="block flexRow">
      <div class="left">
        <div class="title">基本信息
          <el-date-picker class="daterange" type="daterange" size="mini" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd" v-model="date" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="contents flexColumn">
          <div class="block-l1" id="map"></div>
          <div class="block-l2 flexRow">
            <div class="one" :class="{active: target==='MBM_CASE'}" @click="target='MBM_CASE'">
              <i class="icon renmintj"></i>
              <div class="one-content">
                <span class="one-title">人民调解</span><br>
                <span class="one-num">{{(data.businessCount.MBM_CASE||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='MMS_ALARM110INFO'}" @click="target='MMS_ALARM110INFO'">
              <i class="icon baojingld"></i>
              <div class="one-content">
                <span class="one-title">110联动</span><br>
                <span class="one-num">{{(data.businessCount.MMS_ALARM110INFO||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='WWS_CONSULT'}" @click="target='WWS_CONSULT'">
              <i class="icon jicengflfw"></i>
              <div class="one-content">
                <span class="one-title">基层法律服务</span><br>
                <span class="one-num">{{(data.businessCount.WWS_CONSULT||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='CDS_INVESTIGATIONFEEDBAC'}" @click="target='CDS_INVESTIGATIONFEEDBAC'">
              <i class="icon jiufenpc"></i>
              <div class="one-content">
                <span class="one-title">纠纷排查</span><br>
                <span class="one-num">{{(data.businessCount.CDS_INVESTIGATIONFEEDBAC||0) | numFormat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right flexColumn">
        <div class="block-r1">
          <div class="title">纠纷类型</div>
          <div class="contents ul">
            <div class="li" v-for="(item,index) in data.businessType" :key="index">
              <span class="sort">{{index+1}}</span>
              <span class="name">{{item.name}}</span>
              <span class="number">{{item.value | numFormat}}</span>
            </div>
          </div>
        </div>
        <div class="block-r2">
          <div class="title">业务处理</div>
          <g2-pie class="contents" :id="'pie1'" :height="141" :colorMap="['#1890FF', '#E9E9E9']" :data="data.businessProcess"></g2-pie>
        </div>
        <div class="block-r3">
          <div class="title">系统应用</div>
          <g2-pie class="contents" :id="'pie2'" :height="146" :colorMap="['#1890FF', '#E9E9E9']" :data="data.onlineNumber"></g2-pie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {area} from '@/utils/dictionaryMapping'
import {pickerOptions, defaultDateRage} from '@/utils/index'
import {homeData} from '@/api/api'
import {setMapbox} from '@/utils/echartsOptions'

export default {
  name: 'home',
  data () {
    return {
      areaOptions: area,
      area: area[0]['value'],
      date: defaultDateRage(),
      pickerOptions: pickerOptions,
      target: 'MBM_CASE',
      data: null,
      myChart: null
    }
  },
  watch: {
    area: function (newValue, oldValue) {
      this.fetchHomeData()
    },
    target: function (newValue, oldValue) {
      this.fetchHomeData()
    }
  },
  created () {
    this.fetchHomeData()
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.$nextTick(function () {
        this.myChart.resize()
      })
    })
  },
  methods: {
    fetchHomeData () {
      homeData({area: this.area, startDate: this.date[0], endDate: this.date[1], biaoming: this.target}).then(resList => {
        if (resList[0].data.code && resList[1].data.code && resList[2].data.code && resList[3].data.code && resList[4].data.code) {
          // 合并接口数据
          const data1 = {businessMap: resList[0].data.data}
          let data2 = {businessCount: {}}
          resList[1].data.data.map(item => {
            data2.businessCount[item.biao] = item.shuLiang
          })
          const data3 = {businessType: resList[2].data.data.map(item => {
            return { name: item.leiXing, value: item.jianShu }
          })}
          const data4 = {businessProcess: resList[3].data.data.map(item => {
            return { name: item.leiXing, value: item.shuLiang }
          }).reverse()}
          const data5 = {onlineNumber: [{name: '登录人数占比', value: resList[4].data.data.denglurszb}, {name: '未登录人数占比', value: 1 - resList[4].data.data.denglurszb}]}
          this.data = Object.assign(data1, data2, data3, data4, data5)
          this.drawMap()
        } else {
          this.data = null
          this.$message({type: 'error', message: '数据请求失败'})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    drawMap () {
      this.$nextTick(() => {
        if (!this.myChart) {
          this.myChart = window.echarts.init(document.getElementById('map'))
        }
        // 构造地图数据
        const mapData = this.data.businessMap.map(item => {
          return {
            name: item.diQu,
            value: [item.jingDu, item.weiDu, parseInt(Math.log(item.jianShu))],
            id: item.bianMa,
            typeList: item.anJian
          }
        })
        // 计算中心点
        const center = this.areaOptions.filter(item => {
          if (item.value === this.area) {
            return true
          }
        })[0]['coordinates']
        this.myChart.setOption(setMapbox(mapData, center))
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/common.less';
  .home {
    background: #EDEDED;
    box-sizing: content-box;
    height: 100%;
    .block {
      height: calc(100% - 24px);
      .left {
        flex: 847;
        background: @block;
        .title{
          .daterange{
            float: right;
          }
        }
        .contents {
          padding: 0;
          .block-l1 {
            flex: 514;
          }
          .block-l2 {
            flex: 60;
            .one {
              flex: 212;
              background: RGBA(49, 49, 49, 0.7);
              color: #FFFFFF;
              &:hover {
                cursor: pointer;
                background: RGBA(24, 144, 255, 0.7);
              }
              .icon {
                float: left;
                width: 44px;
                margin-left: 25px;
              }
              .renmintj{
                background: url(~@/assets/images/home/icon-renmintj.png) no-repeat center;
              }
              .baojingld{
                background: url(~@/assets/images/home/icon-110ld.png) no-repeat center;
              }
              .jicengflfw{
                background: url(~@/assets/images/home/icon-jicengflfw.png) no-repeat center;
              }
              .jiufenpc{
                background: url(~@/assets/images/home/icon-jiufenpc.png) no-repeat center;
              }
              .one-content{
                margin-top: 20px;
                .one-title{
                  font-size: 14px;
                }
                .one-num{
                  font-size: 24px;
                }
              }
            }
            .active {
              background: RGBA(24, 144, 255, 0.9);
            }
          }
        }
      }
      .right {
        margin-left: 16px;
        flex: 266;
        .block-r1 {
          flex: 194;
          background: @block;
          .ul {
            width: 100%;
            overflow: hidden;
            padding-top: 15px;
            &:hover {
              overflow-y: auto;
            }
            .li {
              height: 33px;
              display: block;
              &:hover {
                cursor: pointer;
              }
              .sort {
                float: left;
                width: 19px;
                height: 19px;
                font-size: @fontMiddle;
                color: #314659;
                background: #F0F2F5;
                border-radius: 50%;
                text-align: center;
                line-height: 19px;
                margin: 7px 22px 7px 0;
              }
              .name {
                float: left;
                height: 33px;
                font-size: @fontMiddle;
                color: @gray;
                line-height: 33px;
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .number {
                float: right;
                height: 33px;
                font-size: @fontMiddle;
                color: @gray;
                line-height: 33px;
                margin-right: 22px;
              }
              &:nth-child(1) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
              &:nth-child(2) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
              &:nth-child(3) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
            }
          }
        }
        .block-r2 {
          flex: 178;
          margin-top: 16px;
          background: @block;
          .contents{
            padding: 0;
          }
        }
        .block-r3 {
          flex: 184;
          margin-top: 16px;
          background: @block;
          .contents{
            padding: 0;
          }
        }
      }
    }
  }
</style>
