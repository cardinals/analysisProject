/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:33:54
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-04 13:46:07
 */

<template>
  <div class="organizationDetail_container" v-if="data">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解机构排名</span>
      <span class="span2">>机构画像</span>
      <el-date-picker class="dateSelector" v-model="date" :picker-options="pickerDisabledDate" value-format="yyyy" type="year"
        placeholder="选择年" size='mini'></el-date-picker>
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
            <div class="line" v-if="data.jiBenXX.jiGouLX!==''">街道/乡镇: {{data.jiBenXX.jiGouLX}}</div>
            <div class="line">联系地址: {{data.jiBenXX.lianXiDZ||'未知'}}</div>
            <div class="line">联系电话: {{data.jiBenXX.lianXiDH||'未知'}}</div>
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
                <div class="number">{{(data.tiaoJieDW.tiaoJieJGSL.jiGouSL||0) | numFormat}}<span class='unit'>家</span></div>
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
              <g2-pie class="chart" :id="'pie1'" :height="163" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '专业调解', value: data.tiaoJieDW.tiaoJieJGSL.jiGouHZB },{ name: '传统调解', value: 1-data.tiaoJieDW.tiaoJieJGSL.jiGouHZB }]"></g2-pie>
            </div>
          </div>
          <div class="atRight">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解员数量</div>
            </div>
            <div class="sContents flexRow">
              <div class="info">
                <div class="number">{{(data.tiaoJieDW.tiaoJieYSL.renYuanSL||0) | numFormat}}<span class='unit'>名</span></div>
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
              <g2-pie class="chart" :id="'pie2'" :height="163" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '专业调解', value: data.tiaoJieDW.tiaoJieYSL.tiaoJieYHZB },{ name: '传统调解', value: 1-data.tiaoJieDW.tiaoJieYSL.tiaoJieYHZB }]"></g2-pie>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block2 flexRow">
      <div class="left">
        <div class="title">调解案件数量</div>
        <div class="contents">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件总量</div>
          </div>
          <div class="sContents">
            <div class="number">
              <span class="span1">{{(data.tiaoJieAJSL.zongLiang||0) | numFormat}}<span class='unit'>件</span></span>
              <!-- 机构类型为司法所时不显示万人比 -->
              <span class="span2" v-if="data.jiBenXX.jiGouLX===''">万人比
                <el-tooltip content="万人比示意" placement="top-end">
                  <i>?</i>
                </el-tooltip>
              </span>
              <span class="span3" v-if="data.jiBenXX.jiGouLX===''">{{(data.tiaoJieAJSL.wanRenB||0) | numFormat}}件/万人</span>
            </div>
            <div class="others flexRow">
              <div class="one" v-for="(item, index) in zhongDianSJFB" :key="index">
                <span class="typeName">{{item.name}}</span>
                <br>
                <span class="typeNumber">{{item.value}}</span>
                <br>
                <span class="color" :style="{background: color[index]}"></span>
                <br>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title clearfix">
          案件受理情况
          <div class="btn_container">
            <span class="btn" :class="{active: target1==='tiaoJieY'}" @click="target1='tiaoJieY'">调解员</span>
            <span class="btn" :class="{active: target1==='tiaoWeiH'}" @click="target1='tiaoWeiH'">调委会</span>
          </div>
        </div>
        <div class="contents flexRow">
          <div class="atLeft">
            <div class="contents">
              <div class="sTitle">
                <div class="border"></div>
                <div class="dis" v-text="target1==='tiaoJieY'?'零受理案件人员数':'零受理案件调委会数'"></div>
              </div>
              <div class="sContents flexRow">
                <div class="info">
                  <div class="number">{{(targetData1_1.number1||0) | numFormat}}<span class='unit'>{{target1==='tiaoJieY'?'名':'家'}}</span></div>
                  <div class="others">
                    <div class="line">
                      <label v-text="target1==='tiaoJieY'?'专职调解员：':'调解委员会：'"></label>
                      <span>{{(targetData1_1.number2||0) | numFormat}}{{target1==='tiaoJieY'?'名':'家'}}</span>
                    </div>
                    <div class="line">
                      <label v-text="target1==='tiaoJieY'?'兼职或其他：':'调解工作室：'"></label>
                      <span>{{(targetData1_1.number3||0) | numFormat}}{{target1==='tiaoJieY'?'名':'家'}}</span>
                    </div>
                  </div>
                </div>
                <g2-pie class="chart" :id="'pie3'" :height="163" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '零案件受理占比', value: targetData1_1.number4 },{ name: '其他', value: 1-targetData1_1.number4 }]"></g2-pie>
              </div>
            </div>
          </div>
          <div class="atRight">
            <div class="contents">
              <div class="sTitle">
                <div class="border"></div>
                <div class="dis">受理案件数量排名</div>
              </div>
              <div class="sContents">
                <div class="ul" v-if="targetData1_2&&targetData1_2.length>0">
                  <div class="li" v-for="(item,index) in targetData1_2" :key="index" @click="handleChangeRouter(item.id,target1)">
                    <span class="sort">{{index+1}}</span>
                    <el-tooltip v-if="target1!=='tiaoJieY'" :content="item.name" placement="top" effect="light">
                      <span class="name">{{item.name}}</span>
                    </el-tooltip>
                    <span v-else class="name">{{item.name}}</span>
                    <span class="number">{{item.value | numFormat}}</span>
                  </div>
                </div>
                <el-button class="nodata-button" icon="el-icon-info" v-if="targetData1_2.length===0">暂无数据</el-button>
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
              <span class="span2" v-if="this.$route.params.id!=='1919f623b5d140598b4eb80660715055'">{{data.jiBenXX.jiGouLX!==''?'全区':'全市'}}</span>
              <span class="span3" v-if="this.$route.params.id!=='1919f623b5d140598b4eb80660715055'">{{(data.tiaoJieZYHCD.quanShiHZBL||0) | percentFormat}}</span>
            </div>
            <div class="chart" v-if="data.tiaoJieZYHCD.qiPaoT.length===0">
              <el-button class="nodata-button" icon="el-icon-info">暂无数据</el-button>
            </div>
            <g2-point class="chart" v-if="data.tiaoJieZYHCD.qiPaoT.length>0" :id="'point1'" :height="280" :axisName="{type:'类型', size:'人均案件量', x:'案件数量', y:'人员数量'}" :data='data.tiaoJieZYHCD.qiPaoT.map(item=>{return {type: item.name, size: item.value3, x: item.value1, y: item.value2}})'></g2-point>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">调解资源占比</div>
        <div class="contents" v-if="mirrorInterval.length===0">
          <el-button class="nodata-button" style="margin: calc(50% - 165px) calc(50% - 60px);" icon="el-icon-info">暂无数据</el-button>
        </div>
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
                <span class="span2" v-if="this.$route.params.id!=='1919f623b5d140598b4eb80660715055'">{{data.jiBenXX.jiGouLX!==''?'全区':'全市'}}</span>
                <span class="span3" v-if="this.$route.params.id!=='1919f623b5d140598b4eb80660715055'">{{(data.tiaoJieCGL.quanShiCGL||0) | percentFormat}}</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">案件成功率分布</div>
            </div>
            <div class="sContents" v-if="data.tiaoJieCGL.anJianCGLFB.length===0">
              <el-button class="nodata-button" icon="el-icon-info">暂无数据</el-button>
            </div>
            <g2-point class="sContents" v-if="data.tiaoJieCGL.anJianCGLFB.length>0" :id="'point2'" :height="240" :axisName="{type:'类型', x:'调解成功率', y:'案件数量'}" :type='"散点图"' :data='data.tiaoJieCGL.anJianCGLFB.map(item=>{return {type: item.name, size: 1, x: item.value, y: item.labelValue}})'></g2-point>
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
                <span class="unit">万元</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">理赔金额排名(万元)</div>
            </div>
            <div class="sContents">
              <div class="li" v-if="targetData2&&targetData2.length>0" v-for="(item,index) in targetData2" :key="index" @click="handleChangeRouter(item.id,target2)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target2!=='tiaoJieY'" :content="item.name" placement="top" effect="light">
                  <span class="name">{{item.name}}</span>
                </el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value/10000||0) | numFormat}}</span>
              </div>
              <el-button class="nodata-button" icon="el-icon-info" v-if="targetData2.length===0">暂无数据</el-button>
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
                <span class="unit">天</span>
              </div>
            </div>
          </div>
          <div class="blocks2">
            <div class="sTitle">
              <div class="border"></div>
              <div class="dis">调解时长排名(天)</div>
            </div>
            <div class="sContents">
              <div class="li" v-if="targetData3&&targetData3.length>0" v-for="(item,index) in targetData3" :key="index" @click="handleChangeRouter(item.id,target3)">
                <span class="sort">{{index+1}}</span>
                <el-tooltip v-if="target3!=='tiaoJieY'" :content="item.name" placement="top" effect="light">
                  <span class="name">{{item.name}}</span>
                </el-tooltip>
                <span v-else class="name">{{item.name}}</span>
                <span class="number">{{(item.value||0) | numFormat}}</span>
              </div>
              <el-button class="nodata-button" icon="el-icon-info" v-if="targetData3.length===0">暂无数据</el-button>
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
import { defaultYear, pickerDisabledDate, color } from '@/utils/index'
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
      target3: 'anJian',
      // 颜色组
      color: color
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
      if (temp.length > 24) {
        temp = temp.slice(0, 24)
      }
      return temp.reverse()
    },
    // 零受理案件数量--数据
    targetData1_1: {
      get: function () {
        const temp = this.data.tiaoJieAJSL[`${this.target1}LSLAJQK`]
        if (this.target1 === 'tiaoJieY') {
          return {number1: temp.lingShouLAJRYS, number2: temp.zhuanZhiTJY, number3: temp.jianZhiHQT, number4: temp.lingAnJSLZB}
        } else if (this.target1 === 'tiaoWeiH') {
          return {number1: temp.lingShouLAJTWHS, number2: temp.tiaoJieWYH, number3: temp.tiaoJieGZS, number4: temp.lingAnJSLZB}
        }
      },
      set: function (newValue) {}
    },
    // 受理案件数量排名数据
    targetData1_2: {
      get: function () {
        return this.data.tiaoJieAJSL[`${this.target1}SLAJSLPM`]
      },
      set: function (newValue) {}
    },
    // 理赔金额排名数据
    targetData2: {
      get: function () {
        return this.data.liPeiJEPM[`${this.target2}LPJEPM`].slice(0, 7)
      },
      set: function (newValue) {}
    },
    // 调解时长排名数据
    targetData3: {
      get: function () {
        return this.data.tiaoJieSCPM[`${this.target3}TJSCPM`].slice(0, 7)
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
  .organizationDetail_container {
    background: #EDEDED;
    .block1 {
      height: 279px;
      .left {
        flex: 371;
        background: @block;
        .name_info {
          height: 45px;
          display: block;
          margin-top: 10px;
          .img {
            width: 45px;
            height: 45px;
            float: left;
            background-image: url('../assets/images/jigou.png');
            background-position: center center;
            background-repeat: no-repeat;
          }
          .name {
            height: 45px;
            font-size: 32px;
            line-height: 45px;
            padding-left: 14px;
            color: #000000;
          }
        }
        .other_info {
          box-sizing: border-box;
          position: absolute;
          bottom: 38px;
          width: 100%;
          .line {
            color: @gray;
            font-size: @fontMiddle;
            &:nth-child(2) {
              margin-top: 8px;
            }
            &:nth-child(3) {
              margin-top: 8px;
            }
          }
        }
      }
      .right {
        flex: 754;
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
            margin-top: 15px;
            .number {
              height: 78px;
              font-size: 49px;
              color: #000000;
              line-height: 78px;
            }
            .others{
              margin-top: 20px;
              .line {
                color: @gray;
                font-size: @fontMiddle;
                &:nth-child(1) {
                  margin-bottom: 8px;
                }
                span {
                  display: inline-block;
                  text-align: right;
                  width: 6em;
                }
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
      height: 311px;
      margin-top: 16px;
      .left {
        flex: 371;
        background: @block;
        .contents {
          padding-top: 12px;
          .sContents {
            height: calc(100% - 72px);
            padding-right: 15px;
            .number {
              height: 88px;
              display: block;
              position: relative;
              margin-top: 15px;
              .span1 {
                display: inline-block;
                height: 88px;
                line-height: 88px;
                font-size: 49px;
                color: #000000;
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
                right: 0;
                top: 50%;
                font-size: @fontMiddle;
                color: @black;
              }
            }
            .others {
              .one {
                flex: 1;
                text-align: center;
                padding-top: 15px;
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
        }
      }
      .right {
        flex: 754;
        background: @block;
        margin-left: 14px;
        .contents {
          .atLeft {
            flex: 1;
            .contents {
              padding-top: 12px;
              .sContents {
                padding-bottom: 26px;
                .info {
                  flex: 1.3;
                  margin-top: 15px;
                  .number {
                    height: 78px;
                    font-size: 49px;
                    color: #000000;
                    line-height: 78px;
                  }
                  .others{
                    margin-top: 20px;
                    .line {
                      color: @gray;
                      font-size: @fontMiddle;
                      &:nth-child(1) {
                        margin-bottom: 8px;
                      }
                      span {
                        display: inline-block;
                        text-align: right;
                        width: 6em;
                      }
                    }
                  }
                }
                .chart {
                  flex: 1;
                }
              }
            }
          }
          .atRight {
            flex: 1;
            .contents {
              padding-top: 12px;
              .ul {
                width: 100%;
                overflow: hidden;
                padding-top: 20px;
                height: 170px;
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
        }
      }
    }
    .block3 {
      height: 474px;
      margin-top: 16px;
      .left {
        background: @block;
        flex: 371;
        .contents {
          padding-top: 20px;
          padding-bottom: 26px;
        }
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
        .chart {
          height: 280px;
          display: block;
        }
      }
      .right {
        background: @block;
        flex: 750;
        margin-left: 14px;
        .contents {
          padding: 0;
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
