/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-27 14:03:38
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-30 11:58:12
 */

<template>
  <div class="home" v-if="data">
    <div class="nav">
      <span class="span1">业务监控</span>
      <el-select v-model="area" placeholder="请选择区域" size="mini" class="areaSelector">
        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="block flexRow">
      <div class="left">
        <div class="title">业务数量
          <div class="buttons">
            <el-button size="mini" :type="date==='today'?'primary':'text'" @click="date='today'">今日</el-button>
            <el-button size="mini" :type="date==='month'?'primary':'text'" @click="date='month'">本月</el-button>
            <el-button size="mini" :type="date==='year'?'primary':'text'" @click="date='year'">本年</el-button>
          </div>
        </div>
        <div class="contents flexColumn">
          <div class="block-l1" id="map"></div>
          <div class="block-l2 flexRow">
            <div class="one" :class="{active: target==='MBM_CASE'}" @click="target='MBM_CASE'">
              <i class="icon renmintj"></i>
              <div class="one-content">
                <span class="one-title">人民调解</span>
                <br>
                <span class="one-num">{{(data.businessCount.MBM_CASE||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='MMS_ALARM110INFO'}" @click="target='MMS_ALARM110INFO'">
              <i class="icon baojingld"></i>
              <div class="one-content">
                <span class="one-title">110联动</span>
                <br>
                <span class="one-num">{{(data.businessCount.MMS_ALARM110INFO||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='WWS_CONSULT'}" @click="target='WWS_CONSULT'">
              <i class="icon jicengflfw"></i>
              <div class="one-content">
                <span class="one-title">基层法律服务</span>
                <br>
                <span class="one-num">{{(data.businessCount.WWS_CONSULT||0) | numFormat}}</span>
              </div>
            </div>
            <div class="one" :class="{active: target==='CDS_INVESTIGATIONFEEDBAC'}" @click="target='CDS_INVESTIGATIONFEEDBAC'">
              <i class="icon jiufenpc"></i>
              <div class="one-content">
                <span class="one-title">纠纷排查</span>
                <br>
                <span class="one-num">{{(data.businessCount.CDS_INVESTIGATIONFEEDBAC||0) | numFormat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right flexColumn">
        <div class="block-r1">
          <div class="title">纠纷类型排名</div>
          <div class="contents ul">
            <div class="li" v-for="(item,index) in data.businessType" :key="index">
              <span class="sort">{{index+1}}</span>
              <!-- <el-tooltip :content="item.name" placement="top" effect="light"> -->
              <span class="name">{{item.name}}</span>
              <!-- </el-tooltip> -->
              <span class="number">{{item.value | numFormat}}</span>
            </div>
          </div>
        </div>
        <div class="block-r2">
          <div class="title">案件处理结果</div>
          <div class="contents flexRow">
            <div class="r2Left">
              <span class="span1">{{anJIanCLJGSLBT}}</span><br>
              <span class="span2">{{data.businessProcess.shuLiang | numFormat}}</span>
            </div>
            <div class="r2right">
              <g2-pie :id="'pie1'" :height="120" :colorMap="['#1890FF', '#E9E9E9']" :data="data.businessProcess.zhanBi" :guide="{name: anJIanCLJGZBBT, value: data.businessProcess.zhanBi[0].value}" :showLegend="false"></g2-pie>
            </div>
          </div>
        </div>
        <div class="block-r3">
          <div class="title">系统使用概况</div>
          <div class="contents flexRow">
            <div class="r3Left">
              <span  class="span1">登录人数</span><br>
              <span  class="span2">{{data.onlineNumber.denglurs | numFormat}}</span>
            </div>
            <div class="r3right">
              <g2-pie :id="'pie2'" :height="120" :colorMap="['#1890FF', '#E9E9E9']" :data="data.onlineNumber.denglurszb" :guide="{name: '登录人数占比', value: data.onlineNumber.denglurszb[0].value}" :showLegend="false"></g2-pie>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {area} from '@/utils/dictionaryMapping'
import {pickerOptions} from '@/utils/index'
import {homeData} from '@/api/api'
import {setMapbox} from '@/utils/echartsOptions'

export default {
  name: 'home',
  data () {
    return {
      areaOptions: area,
      area: area[0]['value'],
      date: 'year',
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
    date: function (newValue, oldValue) {
      this.fetchHomeData()
    },
    target: function (newValue, oldValue) {
      this.fetchHomeData()
    }
  },
  computed: {
    // 案件处理结果数量标题
    anJIanCLJGZBBT: {
      get: function () {
        const list = { 'MBM_CASE': '成功率', 'MMS_ALARM110INFO': '申请率', 'WWS_CONSULT': '转化率', 'CDS_INVESTIGATIONFEEDBAC': '转化率' }
        return list[this.target]
      },
      set: function (newValue) {}
    },
    // 案件处理结果占比标题
    anJIanCLJGSLBT: {
      get: function () {
        const list = { 'MBM_CASE': '调解成功', 'MMS_ALARM110INFO': '申请调解', 'WWS_CONSULT': '转为调解', 'CDS_INVESTIGATIONFEEDBAC': '转为调解' }
        return list[this.target]
      },
      set: function (newValue) {}
    }
  },
  created () {
    this.fetchHomeData()
  },
  mounted () {
    // 分辨率变化地图模块重置大小
    window.addEventListener('resize', () => {
      this.$nextTick(function () {
        this.myChart.resize()
      })
    })
  },
  methods: {
    fetchHomeData () {
      homeData({area: this.area, date: this.date, biaoming: this.target}).then(resList => {
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
          const data4 = {
            businessProcess: {
              zhanBi: resList[3].data.data.map(item => {
                return { name: item.leiXing, value: item.zhanBi / 100 }
              }),
              shuLiang: resList[3].data.data[0].shuLiang
            }
          }
          const data5 = {onlineNumber: {denglurszb: [{name: '登录人数占比', value: resList[4].data.data.denglurszb}, {name: '未登录人数占比', value: 1 - resList[4].data.data.denglurszb}], denglurs: resList[4].data.data.denglurs}}
          this.data = Object.assign(data1, data2, data3, data4, data5)
          this.drawMap()
        } else {
          this.data = null
          this.$message({type: 'error', message: '数据请求失败'})
          this.$router.push({path: '/error/500'})
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
            value: [item.jingDu, item.weiDu, parseInt(item.jianShu)],
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
        this.myChart.on('click', (params) => {
          // params.data.name 调委会/司法所名称
          // params.data.value[2] 调委会/司法所案件数量
          // params.data.id 调委会/司法所ID
          if (this.target === 'MMS_ALARM110INFO') {
            this.$router.push({path: `/organizationDetail/${params.data.id}`})
          } else {
            this.$router.push({path: `/mediationDetail/${params.data.id}`})
          }
        })
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
      padding-bottom: 15px;
      height: calc(100% - 39px);
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
              padding-left: 35px;
              &:hover {
                cursor: pointer;
                background: RGBA(24, 144, 255, 0.7);
              }
              .icon {
                float: left;
                width: 44px;
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
                float: left;
                margin-top: 10px;
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
                margin: 7px 10px 7px 0;
              }
              .name {
                float: left;
                height: 33px;
                font-size: @fontMiddle;
                color: @gray;
                line-height: 33px;
                width: 135px;
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
            .r2Left{
              flex: 1;
              flex: 1;
              padding-top: 60px;
              text-align: center;
              line-height: 22px;
              .span1{
                color: rgba(0,0,0,0.65);
                font-size: 14px;
              }
              .span2{
                color: rgba(0,0,0,0.85);
                font-size: 18px;
              }
            }
            .r2right{
              flex: 1;
              padding-top: 20px;
            }
          }
        }
        .block-r3 {
          flex: 184;
          margin-top: 16px;
          background: @block;
          .contents{
            padding: 0;
            .r3Left{
              flex: 1;
              text-align: center;
              padding-top: 60px;
              line-height: 22px;
              .span1{
                color: rgba(0,0,0,0.65);
                font-size: 14px;
              }
              .span2{
                color: rgba(0,0,0,0.85);
                font-size: 18px;
              }
            }
            .r3right{
              flex: 1;
              padding-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
