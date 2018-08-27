/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:33:54
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-27 11:33:53
 */

<template>
  <div class="organizationDetail_container" v-if="data">
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
            <div class="line" v-if="data.jiBenXX.jiGouLX!==''">街道/乡镇: {{data.jiBenXX.jiGouLX}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">调解队伍</div>
        <div class="contents flexRow">
          <div class="atLeft">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解机构数量</div>
            </div>
            <div class="sContents flexRow">
              <div class="info">
                <div class="number">{{(data.tiaoJieDW.tiaoJieJGSL.jiGouSL||0) | numFormat}}</div>
                <div class="others">
                  <div class="line">
                    <label>调解委员会：</label>
                    <span>{{(data.tiaoJieDW.tiaoJieJGSL.tiaoJieWYH||0) | numFormat}}家</span>
                  </div>
                  <div class="line">
                    <label>调解工作室：</label>
                    <span>{{(data.tiaoJieDW.tiaoJieJGSL.tiaoJieGZS||0) | numFormat}}家</span>
                  </div>
                </div>
              </div>
              <!-- <div class="chart"></div> -->
              <g2-pie class="chart" :id="'pie1'" :height="124" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '专业调解', value: data.tiaoJieDW.tiaoJieJGSL.jiGouHZB },{ name: '传统调解', value: 1-data.tiaoJieDW.tiaoJieJGSL.jiGouHZB }]"></g2-pie>
            </div>
          </div>
          <div class="atRight">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解员数量</div>
            </div>
            <div class="sContents flexRow">
              <div class="info">
                <div class="number">{{(data.tiaoJieDW.tiaoJieYSL.renYuanSL||0) | numFormat}}</div>
                <div class="others">
                  <div class="line">
                    <label>专职调解员：</label>
                    <span>{{(data.tiaoJieDW.tiaoJieYSL.zhuanZhiTJY||0) | numFormat}}名</span>
                  </div>
                  <div class="line">
                    <label>兼职或其他：</label>
                    <span>{{(data.tiaoJieDW.tiaoJieYSL.jianZhiHQT||0) | numFormat}}名</span>
                  </div>
                </div>
              </div>
              <!-- <div class="chart"></div> -->
              <g2-pie class="chart" :id="'pie2'" :height="124" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '专业调解', value: data.tiaoJieDW.tiaoJieYSL.tiaoJieYHZB },{ name: '传统调解', value: 1-data.tiaoJieDW.tiaoJieYSL.tiaoJieYHZB }]"></g2-pie>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block2">
      <div class="title">调解案件数量
        <div class="btn" :class="{active: target1==='tiaoJieY'}" @click="target1='tiaoJieY'">调解员</div>
        <div class="btn" :class="{active: target1==='tiaoWeiH'}" @click="target1='tiaoWeiH'">调委会</div>
      </div>
      <div class="contents flexRow">
        <div class="left">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件总量</div>
          </div>
          <div class="sContents">
            <div class="number">
              <span class="span1">{{(data.tiaoJieAJSL.zongLiang||0) | numFormat}}</span>
              <!-- 机构类型为司法所时不显示万人比 -->
              <span class="span2" v-if="data.jiBenXX.jiGouLX===''">万人比<el-tooltip content="万人比示意" placement="top-end"><i>?</i></el-tooltip></span>
              <span class="span3" v-if="data.jiBenXX.jiGouLX===''">{{(data.tiaoJieAJSL.wanRenB||0) | numFormat}}件/万人</span>
            </div>
            <div class="others">
              <div class="once_block" v-for="(item,index) in zhongDianSJFB" :key="index">
                <label>{{item.name}}</label>
                <span>{{item.value | numFormat}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件数量分布</div>
          </div>
          <g2-histogram :id="'interval'" :height="280" :data="targetData1_1" :axisName="histogramAxisName"></g2-histogram>
        </div>
        <div class="right">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件数量排名</div>
          </div>
          <div class="sContents">
            <div class="ul">
              <div class="li" v-for="(item,index) in targetData1_2" :key="index" @click="handleChangeRouter(item.id,target1)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target1!=='tiaoJieY'" :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{item.value | numFormat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block3 flexRow">
      <div class="left">
        <div class="title">调解专业化程度</div>
        <div class="contents">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">专业调解占比</div>
          </div>
          <div class="sContents">
            <div class="infos">
              <span class="span1">{{(data.tiaoJieZYHCD.zhuanYeTJZB||0) | percentFormat}}</span>
              <span class="span2">{{data.jiBenXX.jiGouLX!==''?'全区':'全市'}}</span>
              <span class="span3">{{(data.tiaoJieZYHCD.quanShiHZBL||0) | percentFormat}}</span>
            </div>
            <!-- <div class="chart"></div> -->
            <g2-point class="chart" :id="'point1'" :height="280" :axisName="{type:'类型', size:'人均案件量', x:'案件数量', y:'人员数量'}"
            :data='data.tiaoJieZYHCD.qiPaoT.map(item=>{return {type: item.name, size: item.value3, x: item.value1, y: item.value2}})'></g2-point>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">调解资源占比</div>
        <!-- <div class="contents"></div> -->
        <g2-mirrorInterval class="contents" :id="'mirrorInterval'" v-if="mirrorInterval.length>0" :height="376" :data='mirrorInterval'></g2-mirrorInterval>
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
            </div>
            <div class="sContents">
              <div class="infos">
                <span class="span1">{{(data.tiaoJieCGL.zongHeTJCGL||0) | percentFormat}}</span>
                <span class="span2">{{data.jiBenXX.jiGouLX!==''?'全区':'全市'}}</span>
                <span class="span3">{{(data.tiaoJieCGL.quanShiCGL||0) | percentFormat}}</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">案件成功率分布</div>
            </div>
            <!-- <div class="sContents"></div> -->
            <g2-point class="sContents" :id="'point2'" :height="240" :axisName="{type:'类型', x:'调解成功率', y:'案件数量'}" :type='"散点图"'
            :data='data.tiaoJieCGL.anJianCGLFB.map(item=>{return {type: item.name, size: 1, x: item.value, y: item.labelValue}})'></g2-point>
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
                <span class="btn" :class="{active: target2==='anJian'}" @click="target2='anJian'">案件</span>
                <span class="btn" :class="{active: target2==='tiaoWeiH'}" @click="target2='tiaoWeiH'">调委会</span>
                <span class="btn" :class="{active: target2==='tiaoJieY'}" @click="target2='tiaoJieY'">调解员</span>
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
              <div class="li" v-for="(item,index) in targetData2" :key="index" @click="handleChangeRouter(item.id,target2)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target2!=='tiaoJieY'" :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value/10000||0) | numFormat}}</span>
              </div>
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
                <span class="btn" :class="{active: target3==='anJian'}" @click="target3='anJian'">案件</span>
                <span class="btn" :class="{active: target3==='tiaoWeiH'}" @click="target3='tiaoWeiH'">调委会</span>
                <span class="btn" :class="{active: target3==='tiaoJieY'}" @click="target3='tiaoJieY'">调解员</span>
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
              <div class="li" v-for="(item,index) in targetData3" :key="index" @click="handleChangeRouter(item.id,target3)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target3!=='tiaoJieY'" :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value||0) | numFormat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import { organizationDetails } from '@/api/api'
import { defaultYear, pickerDisabledDate } from '@/utils/index'
export default {
  name: 'organizationDetails',
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
      // 理赔金额排名的选中类别
      target2: 'anJian',
      // 调解时长排名的选中类别
      target3: 'anJian'
    }
  },
  computed: {
    // 重点事件分布数据
    zhongDianSJFB: function () {
      return this.data.tiaoJieAJSL.zhongDianSJFB.slice(0, 4)
    },
    // 调解资源占比数据
    mirrorInterval: function () {
      let temp = []
      this.data.tiaoJieZYPB.map(item => {
        temp.push({name: item.name, value: item.value1, type: '案件数量'})
        temp.push({name: item.name, value: item.value2, type: '调解员数量'})
      })
      return temp.reverse()
    },
    // 受理案件数量分布--坐标轴名称
    histogramAxisName: {
      get: function () {
        let temp = {}
        if (this.target1 === 'tiaoJieY') {
          temp = {name: '案件数量', value: '调解员人数'}
        } else {
          temp = {name: '案件数量', value: '调委会数量'}
        }
        return temp
      },
      set: function (newValue) {}
    },
    // 受理案件数量分布--数据
    targetData1_1: {
      get: function () {
        let temp = this.data.tiaoJieAJSL[`${this.target1}SLAJSLFB`]
        return temp.map(item => { return {name: Number(item), value: Number(item)} })
      },
      set: function (newValue) {}
    },
    // 受理案件数量排名数据
    targetData1_2: {
      get: function () {
        let temp = this.data.tiaoJieAJSL[`${this.target1}SLAJSLPM`]
        return temp.sort((item1, item2) => {
          if (item1.value > item2.value) {
            return -1
          } else {
            return 1
          }
        })
      },
      set: function (newValue) {}
    },
    // 理赔金额排名数据
    targetData2: {
      get: function () {
        return this.data.liPeiJEPM[`${this.target2}LPJEPM`]
      },
      set: function (newValue) {}
    },
    // 调解时长排名数据
    targetData3: {
      get: function () {
        return this.data.tiaoJieSCPM[`${this.target3}TJSCPM`]
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
      organizationDetails({
        id: this.$route.params.id,
        time: this.date
      }).then(resList => {
        if (resList[0].data.code && resList[1].data.code && resList[2].data.code) {
          // 合并接口的数据
          this.data = Object.assign(resList[0].data.data, resList[1].data.data, resList[2].data.data)
        } else {
          this.data = null
          this.$message({type: 'error', message: '数据请求失败'})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleChangeRouter (id, type) {
      console.log(id, type)
      if (type === 'tiaoJieY') {
        this.$router.push({path: `/peopleDetail/${id}`})
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.organizationDetail_container{
  background: #EDEDED;
  .block1{
    height:240px;
    .left{
      flex:371;
      background: @block;
      .name_info{
        height: 45px;
        display: block;
        padding:40px 0 16px 0;
        .img{
          width: 45px;
          height: 45px;
          float: left;
          background-image: url('../assets/images/jigou.png');
          background-position:center center;
          background-repeat: no-repeat;
        }
        .name{
          height: 45px;
          float: left;
          font-size:32px;
          line-height: 45px;
          padding-left: 14px;
          color: #000000;
        }
      }
      .other_info{
        box-sizing: border-box;
        height: 72px;
        padding-bottom: 26px;
        .line{
          color:@gray;
          font-size: @fontMiddle;
          &:nth-child(1){
            margin-bottom: 8px;
          }
          &:nth-child(2){
            margin-bottom: 8px;
          }
        }
      }
    }
    .right{
      flex: 745;
      margin-left: 14px;
      background: @block;
      .atLeft{
        padding-top: 16px;
        flex: 1;
        margin-right: 15px;
      }
      .atRight{
        padding-top: 16px;
        flex: 1;
        margin-left: 15px;
      }
      .sContents{
          padding-bottom:26px;
          .info{
            flex: 1.3;
            .number{
              height: 78px;
              font-size:49px;
              color:#000000;
              line-height: 78px;
            }
            .line{
              color:@gray;
              font-size: @fontMiddle;
              &:nth-child(1){
                margin-bottom: 8px;
              }
              span{
                display: inline-block;
                text-align: right;
                width: 4em;
              }
            }
          }
          .chart{
            flex: 1;
          }
        }
    }
  }
  .block2{
    height: 378px;
    background: @block;
    margin-top: 16px;
    .title{
      .btn{
        float: right;
        font-size: @fontMiddle;
        color:@gray;
        padding:3px 7px;
        border-radius: 2px;
        margin-left: 16px;
        cursor: pointer;
      }
      .active{
        color:#ffffff;
        background: #1890FF;
      }
    }
    .left{
      flex:1;
      padding:20px 0 26px 0;
      .number{
        height:88px;
        display: block;
        position: relative;
        .span1{
          display: inline-block;
          height: 88px;
          line-height: 88px;
          font-size:49px;
          color:#000000;
        }
        .span2{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-120%);
          font-size: @fontMiddle;
          color:@graymore;
          i{
            display: inline-block;
            width: 12px;
            height: 12px;
            font-size: @fontSmall;
            color:@graymore;
            border-radius: 50%;
            border:1px solid @graymore;
            text-align: center;
            line-height: 12px;
            margin-left: 4px;
            cursor: pointer;
          }
        }
        .span3{
          position: absolute;
          right: 0px;
          top: 50%;
          font-size: @fontMiddle;
          color:@black;
        }
      }
      .others{
        height: 170px;
        .once_block{
          width: calc(50% - 28px);
          height: 66px;
          float: left;
          box-sizing: border-box;
          background: #D1E9FF;
          border:1px solid #98CEFF;
          border-radius: 4px;
          padding:8px 10px;
          label{
            font-size: @fontMiddle;
            color:@gray;
            display: block;
          }
          span{
            font-size: 31px;
            color:#000000;
            display: block;
          }
          &:nth-child(2n){
            margin-left: 56px;
          }
          &:nth-child(1){
            margin-bottom: 38px;
          }
          &:nth-child(2){
            margin-bottom: 38px;
          }
        }
      }
    }
    .middle{
      flex: 1.3;
      margin:0 45px;
      padding:20px 0 26px 0;
    }
    .right{
      flex: 0.8;
      padding:20px 0 26px 0;
      .ul{
        width: 100%;
        overflow: hidden;
        padding-top: 20px;
        height: 238px;
        &:hover{
          overflow-y: auto;
        }
        .li{
          height: 33px;
          display: block;
          &:hover{
            cursor: pointer;
          }
          .sort{
            float: left;
            width: 19px;
            height: 19px;
            font-size: @fontMiddle;
            color:#314659;
            background: #F0F2F5;
            border-radius: 50%;
            text-align: center;
            line-height: 19px;
            margin:7px 22px 7px 0;
          }
          .name{
            float: left;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
            width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .number{
            float: right;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
            margin-right: 22px;
          }
          &:nth-child(1){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(2){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(3){
            .sort{
              background: #314659;
              color:white;
            }
          }
        }
      }
    }
  }
  .block3{
    height: 474px;
    margin-top: 16px;
    .left{
      background:@block;
      flex: 371;
      .contents{
        padding-top:20px;
        padding-bottom: 26px;
      }
      .infos{
        height: 74px;
        display: block;
        position: relative;
        .span1{
          display: inline-block;
          height: 74px;
          font-size:49px;
          line-height: 74px;
          color:#000000;
        }
        .span2{
          font-size: @fontMiddle;
          color:@black;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-120%);
          width: 66px;
          text-align: center;
        }
        .span3{
          font-size: 20px;
          width: 66px;
          text-align: center;
          color:@black;
          position: absolute;
          right: 0;
          top: 50%;
        }
      }
      .chart{
        height: 280px;
        display: block;
      }
    }
    .right{
      background:@block;
      flex: 750;
      margin-left: 14px;
      .contents{
        padding: 0;
      }
    }
  }
  .block4{
    height: 474px;
    margin-top: 16px;
    .left{
      background:@block;
      flex: 1;
      .contents{
        padding-top:20px;
        padding-bottom: 26px;
      }
      .blocks1{
        height: 96px;
        .infos{
          height: 74px;
          display: block;
          position: relative;
          .span1{
            display: inline-block;
            height: 74px;
            font-size:49px;
            line-height: 74px;
            color:#000000;
          }
          .span2{
            font-size: @fontMiddle;
            color:@black;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-120%);
            width: 66px;
            text-align: center;
          }
          .span3{
            font-size: 20px;
            width: 66px;
            text-align: center;
            color:@black;
            position: absolute;
            right: 0;
            top: 50%;
          }
        }
      }
      .blocks2{
        height: 280px;
        box-sizing: border-box;
        padding-top: 18px;
      }
    }
    .middle{
      background:@block;
      flex: 1;
      margin:0 14px;
      .sTitle{
        position: relative;
        .btn_container{
          position: absolute;
          right: 0;
          .btn{
            padding:8px 10px;
            border:1px solid #D9D9D9;
            border-left: 0;
            font-size: @fontMiddle;
            cursor: pointer;
            &:nth-child(1){
              border-left: 1px solid #D9D9D9;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            &:nth-child(3){
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
          .active{
            border:1px solid #389EFB!important;
            color:#389EFB;
          }
        }
      }
      .contents{
        padding-top:20px;
        padding-bottom: 26px;
      }
      .blocks1{
        height: 96px;
        .infos{
          height: 74px;
          display: block;
          position: relative;
          .span1{
            display: inline-block;
            height: 74px;
            font-size:49px;
            line-height: 74px;
            color:#000000;
          }
          .span2{
            display: inline-block;
            font-size: @fontMiddle;
            color:@black;
            padding-left: 22px;
          }
        }
      }
      .blocks2{
        height: 280px;
        box-sizing: border-box;
        padding-top: 18px;
        .sContents{
          padding-top: 9px;
        }
        .li{
          height: 33px;
          display: block;
          &:hover{
            cursor: pointer;
          }
          .sort{
            float: left;
            width: 19px;
            height: 19px;
            font-size: @fontMiddle;
            color:#314659;
            background: #F0F2F5;
            border-radius: 50%;
            text-align: center;
            line-height: 19px;
            margin:7px 22px 7px 0;
          }
          .name{
            float: left;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .number{
            float: right;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
          }
          &:nth-child(1){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(2){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(3){
            .sort{
              background: #314659;
              color:white;
            }
          }
        }
      }
    }
    .right{
      background:@block;
      flex: 1;
      .sTitle{
        position: relative;
        .btn_container{
          position: absolute;
          right: 0;
          .btn{
            padding:8px 10px;
            border:1px solid #D9D9D9;
            border-left: 0;
            font-size: @fontMiddle;
            cursor: pointer;
            &:nth-child(1){
              border-left: 1px solid #D9D9D9;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
            }
            &:nth-child(3){
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          }
          .active{
            border:1px solid #389EFB!important;
            color:#389EFB;
          }
        }
      }
      .contents{
        padding-top:20px;
        padding-bottom: 26px;
      }
      .blocks1{
        height: 96px;
        .infos{
          height: 74px;
          display: block;
          position: relative;
          .span1{
            display: inline-block;
            height: 74px;
            font-size:49px;
            line-height: 74px;
            color:#000000;
          }
          .span2{
            display: inline-block;
            font-size: @fontMiddle;
            color:@black;
            padding-left: 22px;
          }
        }
      }
      .blocks2{
        height: 280px;
        box-sizing: border-box;
        padding-top: 18px;
        .sContents{
          padding-top: 9px;
        }
        .li{
          height: 33px;
          display: block;
          &:hover{
            cursor: pointer;
          }
          .sort{
            float: left;
            width: 19px;
            height: 19px;
            font-size: @fontMiddle;
            color:#314659;
            background: #F0F2F5;
            border-radius: 50%;
            text-align: center;
            line-height: 19px;
            margin:7px 22px 7px 0;
          }
          .name{
            float: left;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .number{
            float: right;
            height: 33px;
            font-size: @fontMiddle;
            color:@gray;
            line-height: 33px;
          }
          &:nth-child(1){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(2){
            .sort{
              background: #314659;
              color:white;
            }
          }
          &:nth-child(3){
            .sort{
              background: #314659;
              color:white;
            }
          }
        }
      }
    }
  }
}
</style>
