/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-24 14:57:25
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-05 09:08:42
 */

<template>
  <div class="mediationDetail_container" v-if="data">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解机构排名</span>
      <span class="span2">>机构画像</span>
      <el-date-picker class="dateSelector" v-model="date" :picker-options="pickerDisabledDate"
      value-format="yyyy" type="year" placeholder="选择年" size='mini'></el-date-picker>
    </div>
    <div class="block1 flexRow">
      <div class="left">
        <div class="title">基本信息</div>
        <div class="contents">
          <div class="name_info">
            <div class="img"></div>
            <div class="name">{{data.jiBenXX.mingChen||''}}</div>
          </div>
          <div class="other_info">
            <div class="line">联系地址: {{data.jiBenXX.lianXiDZ||''}}</div>
            <div class="line">联系电话: {{data.jiBenXX.lianXiDH||''}}</div>
            <div class="line">机构类型: {{data.jiBenXX.jiGouLX||''}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">调解队伍</div>
        <div class="contents flexRow">
          <div class="atLeft">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解人员数量</div>
            </div>
            <div class="sContents flexRow">
              <div class="info">
                <div class="number">{{(data.tiaoJieDW.renYuanSL||0) | numFormat}}<span style="font-size:14px;">名</span></div>
                <div class="others">
                  <div class="line">
                    <label>专职调解员：</label>
                    <span>{{(data.tiaoJieDW.zhuanZhiTJY||0) | numFormat}}名</span>
                  </div>
                  <div class="line">
                    <label>兼职或其他：</label>
                    <span>{{(data.tiaoJieDW.jianZhiHQT||0) | numFormat}}名</span>
                  </div>
                </div>
              </div>
              <g2-pie class="chart" :id="'pie1'" :height="124" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '高中及以上', value: data.tiaoJieDW.xueLiFB },{ name: '高中以下', value: 1-data.tiaoJieDW.xueLiFB }]"></g2-pie>
            </div>
          </div>
          <div class="atRight">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">年龄分布</div>
            </div>
            <g2-histogram :id="'interval'" :height="144" :data="data.tiaoJieDW.nianLingFB.map(item => { return {name: Number(item), value: Number(item)} })"
               :axisName="{name: '年龄', value: '数量'}"></g2-histogram>
          </div>
        </div>
      </div>
    </div>
    <div class="block2">
      <div class="title">案件受理
        <!-- <div class="btn" :class="{active: target1==='tiaoJieY'}" @click="target1='tiaoJieY'">调解员</div> -->
      </div>
      <div class="contents flexRow">
        <div class="left">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件总量</div>
          </div>
          <div class="sContents">
            <div class="number">
              <span class="span1">{{(data.anJianSL.zongLiang||0) | numFormat}}<span style="font-size:14px;">件</span></span>
              <div class="border"></div>
              <span class="span2">人均</span>
              <span class="span3">{{(data.anJianSL.renJun||0) | numFormat}}件</span>
            </div>
            <div class="others flexRow">
              <div class="one" v-for="(item, index) in zhongDianSJFB" :key="index">
                <span class="typeName">{{item.name}}</span><br>
                <span class="typeNumber">{{item.value}}</span><br>
                <span class="color" :style="{background: color[index]}"></span><br>
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件数量分布</div>
          </div>
          <!-- 饼图 -->
          <g2-pie :id="'pie2'" :height="258" :data="shouLiAJLX" :guide="{name: '受理案件总数', value:data.anJianSL.zongLiang}" :legendOption="{show: true, position: 'right-center'}"></g2-pie>
        </div>
        <div class="right">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件数量排名</div>
          </div>
          <div class="sContents">
            <div class="ul" v-if="targetData1&&targetData1.length>0">
              <div class="li" v-for="(item,index) in targetData1" :key="index" @click="handleChangeRouter(item.id,target1)">
                <span class="sort">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="number">{{item.value | numFormat}}</span>
              </div>
            </div>
            <el-button class="nodata-button" icon="el-icon-info" v-if="targetData1.length===0">暂无数据</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="block4 flexRow">
      <div class="left">
        <div class="title">调解成功率</div>
        <div class="contents">
          <div class="blocks1">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">综合调解成功率</div>
              <div class="btn_container">
                <span class="btn" :class="{active: target2==='leiXing'}" @click="target2='leiXing'">类型</span>
                <span class="btn" :class="{active: target2==='tiaoJieY'}" @click="target2='tiaoJieY'">调解员</span>
              </div>
            </div>
            <div class="sContents">
              <div class="infos">
                <span class="span1">{{(data.tiaoJieCGL.zongHeTJCGL||0) | percentFormat}}</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解终止率排名</div>
            </div>
            <div class="sContents">
              <div class="li" v-if="targetData2.length>0" v-for="(item,index) in targetData2" :key="index" @click="handleChangeRouter(item.id,target2)">
                <span class="sort">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="number">{{(item.value||0) | percentFormat}}</span>
              </div>
              <el-button class="nodata-button" icon="el-icon-info" v-if="targetData2.length===0">暂无数据</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="title">理赔金额比</div>
        <div class="contents">
          <div class="blocks1">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">累计理赔金额</div>
              <div class="btn_container">
                <span class="btn" :class="{active: target3==='anJian'}" @click="target3='anJian'">案件</span>
                <span class="btn" :class="{active: target3==='tiaoJieY'}" @click="target3='tiaoJieY'">调解员</span>
              </div>
            </div>
            <div class="sContents">
              <div class="infos">
                <span class="span1">{{(data.leiJiXYJE/10000||0) | numFormat}}</span>
                <span class="span2">万元</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">理赔金额排名(万元)</div>
            </div>
            <div class="sContents">
              <div class="li" v-if="targetData3.length>0" v-for="(item,index) in targetData3" :key="index" @click="handleChangeRouter(item.id,target3)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target3!=='tiaoJieY'" :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value/10000||0) | numFormat}}</span>
              </div>
              <el-button class="nodata-button" icon="el-icon-info" v-if="targetData3.length===0">暂无数据</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">调解时长</div>
        <div class="contents">
          <div class="blocks1">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">平均调解时长</div>
              <div class="btn_container">
                <span class="btn" :class="{active: target4==='anJian'}" @click="target4='anJian'">案件</span>
                <span class="btn" :class="{active: target4==='tiaoJieY'}" @click="target4='tiaoJieY'">调解员</span>
              </div>
            </div>
            <div class="sContents">
              <div class="infos">
                <span class="span1">{{(data.pingJunTJSC||0) | numFormat}}</span>
                <span class="span2">天</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解时长排名(天)</div>
            </div>
            <div class="sContents">
              <div class="li" v-if="targetData4.length>0" v-for="(item,index) in targetData4" :key="index" @click="handleChangeRouter(item.id,target4)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target4!=='tiaoJieY'" :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value||0) | numFormat}}</span>
              </div>
              <el-button class="nodata-button" icon="el-icon-info" v-if="targetData4.length===0">暂无数据</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import { mediationDetails } from '@/api/api'
import { defaultYear, pickerDisabledDate, color, percentFormat } from '@/utils/index'
export default {
  name: 'mediationDetails',
  data () {
    return {
      // 时间选择器的选中年份
      date: defaultYear(),
      // 时间选择器禁用日期
      pickerDisabledDate: pickerDisabledDate,
      // 所有数据
      data: null,
      // 受理案件数量的选中类别
      target1: 'tiaoJieY',
      // 调解成功率分布的选中类别
      target2: 'leiXing',
      // 理赔金额排名的选中类别
      target3: 'anJian',
      // 调解时长排名的选中类别
      target4: 'anJian',
      // 颜色组
      color: color
    }
  },
  computed: {
    // 重点事件分布数据
    zhongDianSJFB: function () {
      return this.data.anJianSL.zhongDianSJFB.slice(0, 4)
    },
    // 受理案件数量分布
    shouLiAJLX: function () {
      const total = this.data.anJianSL.shouLiAJLX.reduce((previous, current, index, array) => {
        return {name: '总和', value: previous.value + current.value}
      })
      const temp = this.data.anJianSL.shouLiAJLX.map(item => {
        return {name: `${item.name} ${percentFormat(item.value / total.value)}`, value: item.value}
      })
      return temp.sort((item1, item2) => {
        if (item1.value > item2.value) {
          return -1
        } else {
          return 1
        }
      })
    },
    // 受理案件数量排名数据
    targetData1: {
      get: function () {
        let temp = this.data.anJianSL[`${this.target1}SLAJSLPM`]
        return temp
      },
      set: function (newValue) {}
    },
    // 调解终止率排名数据
    targetData2: {
      get: function () {
        let temp = this.data.tiaoJieCGL[`${this.target2}TJZZLPM`]
        if (temp.length > 7) {
          return temp.slice(0, 7)
        } else {
          return temp
        }
      },
      set: function (newValue) {}
    },
    // 理赔金额排名数据
    targetData3: {
      get: function () {
        let temp = this.data.liPeiJEPM[`${this.target3}LPJEPM`]
        if (temp.length > 7) {
          return temp.slice(0, 7)
        } else {
          return temp
        }
      },
      set: function (newValue) {}
    },
    // 调解时长排名数据
    targetData4: {
      get: function () {
        let temp = this.data.tiaoJieSCPM[`${this.target4}TJSCPM`]
        if (temp.length > 7) {
          return temp.slice(0, 7)
        } else {
          return temp
        }
      },
      set: function (newValue) {}
    }
  },
  watch: {
    date (newValue, oldValue) {
      this.onLoad()
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      mediationDetails({
        id: this.$route.params.id,
        time: this.date
      }).then(res => {
        if (res.code) {
          this.data = res.data
        } else {
          this.data = null
          this.$message({type: 'error', message: '系统内部错误'})
          this.$router.push({path: '/error/500'})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleChangeRouter (id, type) {
      if (type === 'tiaoJieY') {
        this.$router.push({path: `/peopleDetail/${id}`})
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/common.less';
  .mediationDetail_container {
    background: #EDEDED;
    .block1 {
      height: 240px;
      .left {
        flex: 371;
        background: @block;
        .name_info {
          height: 70px;
          display: block;
          padding: 10px 0 8px 0;
          .img {
            width: 45px;
            height: 45px;
            float: left;
            background-image: url('../assets/images/jigou.png');
            background-position: center center;
            background-repeat: no-repeat;
          }
          .name {
            width: calc(100% - 60px);
            float: left;
            font-size: 25px;
            line-height: 32px;
            padding-left: 10px;
            color: #000000;
          }
        }
        .other_info {
          clear: both;
          box-sizing: border-box;
          height: 72px;
          padding-bottom: 26px;
          .line {
            color: @gray;
            font-size: @fontMiddle;
            &:nth-child(1) {
              margin-bottom: 8px;
            }
            &:nth-child(2) {
              margin-bottom: 8px;
            }
          }
        }
      }
      .right {
        flex: 745;
        margin-left: 14px;
        background: @block;
        .atLeft {
          padding-top: 16px;
          flex: 1;
          margin-right: 15px;
        }
        .atRight {
          padding-top: 16px;
          flex: 1;
          margin-left: 15px;
        }
        .sContents {
          padding-bottom: 26px;
          .info {
            flex: 1.3;
            .number {
              height: 78px;
              font-size: 49px;
              color: #000000;
              line-height: 78px;
            }
            .line {
              color: @gray;
              font-size: @fontMiddle;
              &:nth-child(1) {
                margin-bottom: 8px;
              }
              span {
                display: inline-block;
                text-align: right;
                width: 4em;
              }
            }
          }
          .chart {
            flex: 1;
          }
        }
      }
    }
    .block2 {
      height: 378px;
      background: @block;
      margin-top: 16px;
      .title {
        .btn {
          float: right;
          font-size: @fontMiddle;
          color: @gray;
          padding: 3px 7px;
          border-radius: 2px;
          margin-left: 16px;
          cursor: pointer;
        }
        .active {
          color: #ffffff;
          background: #1890FF;
        }
      }
      .left {
        flex: 1;
        padding: 20px 0 26px 0;
        .number {
          height: 88px;
          display: block;
          position: relative;
          margin-top: 35px;
          .span1 {
            display: inline-block;
            height: 88px;
            line-height: 88px;
            font-size: 49px;
            color: #000000;
          }
          .border {
            position: absolute;
            top: calc(50% - 19px);
            right: 50%;
            height: 38px;
            border-left: RGBA(209, 210, 212, 1) solid 1px;
          }
          .span2 {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-120%);
            font-size: @fontMiddle;
            color: @graymore;
            i {
              display: inline-block;
              width: 12px;
              height: 12px;
              font-size: @fontSmall;
              color: @graymore;
              border-radius: 50%;
              border: 1px solid @graymore;
              text-align: center;
              line-height: 12px;
              margin-left: 4px;
              cursor: pointer;
            }
          }
          .span3 {
            position: absolute;
            right: 0px;
            top: 50%;
            font-size: @fontMiddle;
            color: @black;
          }
        }
        .others {
          height: 170px;
          .one {
            flex: 1;
            text-align: center;
            padding-top: 10px;
            .typeName {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.65);
              line-height: 22px;
            }
            .typeNumber {
              font-size: 20px;
              color: rgba(0, 0, 0, 1);
              line-height: 30px;
            }
            .color {
              display: inline-block;
              border-radius: 50%;
              background: #1890ff;
              height: 8px;
              width: 8px;
            }
          }
        }
      }
      .middle {
        flex: 1.3;
        margin: 0 45px;
        padding: 20px 0 26px 0;
      }
      .right {
        flex: 0.8;
        padding: 20px 0 26px 0;
        .ul {
          width: 100%;
          overflow: hidden;
          padding-top: 20px;
          height: 238px;
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
    }
    .block4 {
      height: 474px;
      margin-top: 16px;
      .left {
        background: @block;
        flex: 1;
        .contents {
          padding-top: 20px;
          padding-bottom: 26px;
        }
        .blocks1 {
          height: 96px;
          .infos {
            height: 74px;
            display: block;
            position: relative;
            .span1 {
              display: inline-block;
              height: 74px;
              font-size: 49px;
              line-height: 74px;
              color: #000000;
            }
            .span2 {
              font-size: @fontMiddle;
              color: @black;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-120%);
              width: 66px;
              text-align: center;
            }
            .span3 {
              font-size: 20px;
              width: 66px;
              text-align: center;
              color: @black;
              position: absolute;
              right: 0;
              top: 50%;
            }
          }
        }
        .blocks2 {
          height: 280px;
          box-sizing: border-box;
          padding-top: 18px;
          .sContents {
            padding-top: 9px;
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
              width: 250px;
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
      .middle {
        background: @block;
        flex: 1;
        margin: 0 14px;
        .contents {
          padding-top: 20px;
          padding-bottom: 26px;
        }
        .blocks1 {
          height: 96px;
          .infos {
            height: 74px;
            display: block;
            position: relative;
            .span1 {
              display: inline-block;
              height: 74px;
              font-size: 49px;
              line-height: 74px;
              color: #000000;
            }
            .span2 {
              display: inline-block;
              font-size: @fontMiddle;
              color: @black;
              padding-left: 22px;
            }
          }
        }
        .blocks2 {
          height: 280px;
          box-sizing: border-box;
          padding-top: 18px;
          .sContents {
            padding-top: 9px;
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
              width: 250px;
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
      .right {
        background: @block;
        flex: 1;
        .contents {
          padding-top: 20px;
          padding-bottom: 26px;
        }
        .blocks1 {
          height: 96px;
          .infos {
            height: 74px;
            display: block;
            position: relative;
            .span1 {
              display: inline-block;
              height: 74px;
              font-size: 49px;
              line-height: 74px;
              color: #000000;
            }
            .span2 {
              display: inline-block;
              font-size: @fontMiddle;
              color: @black;
              padding-left: 22px;
            }
          }
        }
        .blocks2 {
          height: 280px;
          box-sizing: border-box;
          padding-top: 18px;
          .sContents {
            padding-top: 9px;
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
              width: 250px;
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
    }
  }
</style>
