/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:33:54
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-22 17:54:17
 */

<template>
  <div class="organizationDetail_container">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解机构排名</span>
      <span class="span2">>机构画像</span>
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
              <g2-pie class="chart" :id="'pie1'" :height="124"></g2-pie>
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
              <g2-pie class="chart" :id="'pie2'" :height="124" @itemClick="handlePieClick"></g2-pie>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block2">
      <div class="title">调解案件数量
        <div class="btn active">调解员</div>
        <div class="btn">调委会</div>
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
              <span class="span2">万人比<i>?</i></span>
              <span class="span3">{{(data.tiaoJieAJSL.wanRenB||0) | numFormat}}件/万人</span>
            </div>
            <div class="others">
              <div class="once_block" v-if="data.tiaoJieAJSL.zhongDianSJFB&&(index<=3)" v-for="(item,index) in data.tiaoJieAJSL.zhongDianSJFB" :key="index">
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
          <g2-interval :id="'interval'" :height="300" :data="data.tiaoJieAJSL.tiaoJieYSLAJSLFB" :axisName="{name:'案件数量', value:'调解员人数'}"></g2-interval>
        </div>
        <div class="right">
          <div class="sTitle">
            <div class="border"></div>
            <div class="dis">受理案件数量排名</div>
          </div>
          <div class="sContents">
            <div class="ul">
              <div class="li" v-if="data.tiaoJieAJSL.tiaoJieYSLAJSLPM" v-for="(item,index) in data.tiaoJieAJSL.tiaoJieYSLAJSLPM" :key="index">
                <span class="sort">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
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
              <span class="span2">全市</span>
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
                <span class="span2">全市</span>
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
                <span class="btn active">案件</span>
                <span class="btn">调委会</span>
                <span class="btn">调解员</span>
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
              <div class="li" v-for="(item,index) in data.liPeiJEPM.anJianLPJEPM" :key="index">
                <span class="sort">{{index+1}}</span>
                <el-tooltip :content="item.name" placement="top" effect="light"><span class="name">{{item.name}}</span></el-tooltip>
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
                <span class="btn active">案件</span>
                <span class="btn">调委会</span>
                <span class="btn">调解员</span>
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
              <div class="li" v-for="(item,index) in data.tiaoJieSCPM.anJianTJSCPM" :key="index">
                <span class="sort">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
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
export default {
  name: 'organizationDetails',
  data () {
    return {
      // 所有数据
      data: null,
      // 调解资源占比数据
      mirrorInterval: []
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      organizationDetails({
        id: this.$route.params.id,
        time: 2018,
        organizationType: 'JUSTICEBUREAU'
      }).then(resList => {
        this.$nextTick(() => {
          // 合并三个接口的数据
          this.data = Object.assign(resList[0].data.data, resList[1].data.data, resList[2].data.data)
          // 处理调解资源占比数据
          this.data.tiaoJieZYPB.map(item => {
            this.mirrorInterval.push({name: item.name, value: item.value1, type: '案件数量'})
            this.mirrorInterval.push({name: item.name, value: item.value2, type: '调解员数量'})
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handlePieClick (data) {
      console.log(data)
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
        padding:40px 0 31px 0;
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
          width: calc(50% - 35px);
          height: 66px;
          float: left;
          box-sizing: border-box;
          background: #D1E9FF;
          border:1px solid #98CEFF;
          border-radius: 4px;
          padding:8px 12px;
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
            margin-left: 70px;
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
            width: 65%;
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
            width: 80%;
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
            width: 80%;
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
