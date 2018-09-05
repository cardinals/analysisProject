/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:01
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-09-05 09:16:36
 */

<template>
  <div class="peopleDetail_container" v-if="data">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解人员排名</span>
      <span class="span2">>人员画像</span>
      <el-date-picker class="dateSelector" v-model="date" :picker-options="pickerDisabledDate" value-format="yyyy" type="year"
        placeholder="选择年" size='mini'></el-date-picker>
    </div>
    <div class="top">
      <div class="left">
        <div class="title">基本信息</div>
        <div class="contents">
          <div class="atTop clearfix">
            <div class="headImg"></div>
            <span class="name">{{data.base.name}}</span>
            <span class="year" v-if="data.base.gongzuonx">{{data.base.gongzuonx}}年</span>
            <span class="type">{{data.base.tiaoweihuisx}}</span>
          </div>
          <div class="atBottom">
            <div class="once">工作职务：{{data.base.zhiwu}}</div>
            <div class="once">所属单位：{{data.base.shortname}}</div>
            <div class="once">联系电话：{{data.base.phone}}</div>
            <div class="once">任职方式：{{data.base.renzhifs}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">能力画像</div>
        <div class="contents flexRow">
          <div class="info">
            <div class="sTitle">
              <div class="border"></div>
              <span class="dis">综合能力指数</span>
            </div>
            <div class="number">{{(data.zonghenl||0) | numFormat}}</div>
            <div class="others">
              <div class="once">
                <span class="span1">业务受理</span>
                <span class="span2">{{(data.yewusl||0) | numFormat}}</span>
              </div>
              <div class="border"></div>
              <div class="once">
                <span class="span1">工作质量</span>
                <span class="span2">{{(data.gongzuozl||0) | numFormat}}</span>
              </div>
              <div class="border"></div>
              <div class="once">
                <span class="span1">重大纠纷化解</span>
                <span class="span2">{{(data.zhongdajfhj||0) | numFormat}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="chart"></div> -->
          <g2-radar class="chart" :id="'radar'" :height="219" :data="radarData" :axisName="{a: '个人',b: '全市平均',c: '全区平均'}" :max="1"></g2-radar>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="title">业务专长</div>
      <div class="contents flexRow">
        <!-- <div class="chart_round"></div> -->
        <g2-pie class="chart_round" :id="'pie'" :height="240" :data="business" :guide="{name: '受理案件总数', value:data.number[0].yewusl}" :legendOption="{show: true, position: 'bottom-center'}" @itemClick="handlePieClick"></g2-pie>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">案件受理数量({{clickBusinessType}})</div>
          </div>
          <div class="atMiddle">
            <span class="number">{{(businessTypeData.yewusl||0) | numFormat}}<span style="font-size:14px;">件</span></span>
            <!-- <span class="danwei">件</span> -->
          </div>
          <div class="chart"></div>
          <div class="atBottom">案件受理量优于{{(businessTypeData.yewuslzb||0) | percentFormat}}的调解员</div>
        </div>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">调解成功率({{clickBusinessType}})</div>
          </div>
          <div class="atMiddle">
            <span class="number">{{(businessTypeData.tiaojiecgl||0) | percentFormat}}</span>
          </div>
          <div class="chart"></div>
          <div class="atBottom">调解成功率优于{{(businessTypeData.cglzb||0) | percentFormat}}的调解员</div>
        </div>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">平均调解时长({{clickBusinessType}})</div>
          </div>
          <div class="atMiddle">
            <span class="number">{{(businessTypeData.pingjuntjzq||0) | numFormat}}<span style="font-size:14px;">天</span></span>
            <!-- <span class="danwei">天</span> -->
          </div>
          <div class="chart"></div>
          <div class="atBottom">平均调解时长优于{{(businessTypeData.tjzqzb||0) | percentFormat}}的调解员</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">案件受理清单</div>
      <div class="contents">
        <div class="sTitle">
          <div class="border"></div>
          <span class="dis">案件清单</span>
        </div>
        <div class="table_container">
          <div class="atLeft">
            <el-table :data="currentTableData" stripe class="table" @filter-change="handleFilterChange" @row-click="handleRowClick">
              <el-table-column prop="name" label="案件名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="caselabel" label="案件类型" show-overflow-tooltip column-key="caselabel" :filters="caseType" :filter-multiple="false" :filtered-value="filteredCaselabel">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.caselabel === '类型1' ? 'success' : 'primary'" disable-transitions>{{scope.row.caselabel}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="chulizt" label="处理状态" column-key="chulizt" :filters="caseStatus" :filter-multiple="false" :filtered-value="filteredChulizt"></el-table-column>
              <el-table-column prop="dateaccepted" label="受理时间"></el-table-column>
              <el-table-column prop="datefinished" label="结案时间"></el-table-column>
            </el-table>
            <div class="page">
              <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
                :page-sizes="[4]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
              </el-pagination>
            </div>
          </div>
          <div class="atRight flexColumn">
            <div class="once">
              <span class="span1">调解成功（{{clickCaseType}}）</span>
              <span class="span2">{{(caseTypeData.tiaojiecg||0) | numFormat}}<span style="font-size:14px;">件</span></span>
              <!-- <span class="span3">件</span> -->
            </div>
            <div class="once">
              <span class="span1">调解终止（{{clickCaseType}}）</span>
              <span class="span2">{{(caseTypeData.tiaojiezz||0) | numFormat}}<span style="font-size:14px;">件</span></span>
              <!-- <span class="span3">件</span> -->
            </div>
            <div class="once">
              <span class="span1">未结案（{{clickCaseType}}）</span>
              <span class="span2">{{(caseTypeData.weijiean||0) | numFormat}}<span style="font-size:14px;">件</span></span>
              <!-- <span class="span3">件</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import { peopleDetails } from '@/api/api'
import { defaultYear, pickerDisabledDate, percentFormat } from '@/utils/index'
import { caseStatus } from '@/utils/dictionaryMapping'

export default {
  name: 'peopleDetails',
  data () {
    return {
      // 时间选择器的选中年份
      date: defaultYear(),
      // 时间选择器禁用日期
      pickerDisabledDate: pickerDisabledDate,
      // 所有数据
      data: null,
      // 分页信息
      pageInfo: {
        pageSize: 4,
        currentPage: 1,
        total: 0
      },
      // 当前点击选中的业务专长（饼图）
      clickBusinessType: '全部',
      // 当前点击选中的案件类型（表格）
      clickCaseType: '全部',
      // 筛选项--案件状态（备选）
      caseStatus: caseStatus.map(item => { return {text: item, value: item} }),
      // 筛选项--案件类型（已选中）
      filteredCaselabel: [],
      // 筛选项--案件状态（已选中）
      filteredChulizt: []
    }
  },
  computed: {
    business: function () {
      const total = this.data.business.reduce((previous, current, index, array) => {
        return {name: '总和', value: previous.value + current.value}
      })
      const temp = this.data.business.map(item => {
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
    radarData: function () {
      const temp = this.data.indicator.map((item, index) => {
        return { item: item.name, a: this.data.geren[index], b: this.data.quanshi[index], c: this.data.quanqu[index], max: item.max }
      })
      return temp
    },
    // 生成表格筛选项--案件类型（备选）
    caseType: function () {
      return this.data.business.map(item => { return {text: item.name, value: item.name} })
    },
    // 计算当前筛选条件下的表格数据
    filteredtableData: function () {
      if (this.data) {
        let temp = this.data.case
        if (this.filteredCaselabel.length > 0) {
          temp = temp.filter(item => { if (item.caselabel === this.filteredCaselabel[0]) { return true } })
        }
        if (this.filteredChulizt.length > 0) {
          temp = temp.filter(item => { if (item.chulizt === this.filteredChulizt[0]) { return true } })
        }
        return temp
      }
    },
    // 计算当前分页的表格数据
    currentTableData: function () {
      const start = (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize
      const end = this.pageInfo.currentPage * this.pageInfo.pageSize
      return this.filteredtableData.slice(start, end)
    },
    // 计算表格右侧统计数据
    caseTypeData: function () {
      let temp = {}
      this.data.caselabel.map(item => { if (this.clickCaseType === item.caselabel) { temp = item } })
      return temp
    },
    // 计算表格右侧统计数据
    businessTypeData: function () {
      let temp = {}
      this.data.number.map(item => { if (this.clickBusinessType === item.name) { temp = item } })
      return temp
    }
  },
  watch: {
    // 监听时间选择器数据变化
    date (newValue, oldValue) {
      this.onLoad()
    },
    // 监听当前筛选条件下的表格数据变化
    filteredtableData (newValue, oldValue) {
      this.pageInfo.total = newValue.length
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      peopleDetails({
        id: this.$route.params.id,
        year: this.date
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
    // 处理表格筛选条件变化
    handleFilterChange (obj) {
      this.pageInfo.currentPage = 1
      if (obj.chulizt) {
        this.filteredChulizt = obj.chulizt
      } else if (obj.caselabel) {
        this.filteredCaselabel = obj.caselabel
        // 改变右侧统计数据的类型
        obj.caselabel[0] ? this.clickCaseType = obj.caselabel[0] : this.clickCaseType = '全部'
      }
    },
    // 处理表格行点击
    handleRowClick (row, event, column) {
      if (column.columnKey === 'caselabel') {
        this.clickCaseType = row.caselabel
      }
    },
    // 处理当前页变化
    handleCurrentChange (currentPage) {
      this.pageInfo.currentPage = currentPage
    },
    // 处理饼图点击
    handlePieClick (data) {
      this.clickBusinessType = data.name
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.peopleDetail_container{
  background: #EDEDED;
  .top{
    height: 271px;
    display: flex;
    .left{
      flex: 0.34;
      margin-right: 14px;
      background: @block;
      .atTop{
        display: block;
        height:55px;
        padding:15px 0 30px 0;
        width: 100%;
        .headImg{
          width: 45px;
          height: 55px;
          float: left;
          background-image: url('../assets/images/nan.png');
          background-position: top 0 center;
          background-repeat: no-repeat;
        }
        .name{
          font-size:32px;
          line-height: 55px;
          color:#000000;
          float: left;
          padding-left: 17px;
        }
        .year{
          font-size: @fontMiddle;
          float: left;
          margin: 14px 0 14px 33px;
          padding:4px 5px;
          background:rgba(255,167,96,0.2);
          border-radius: 4px;
          color:#FE7300;
        }
        .type{
          font-size: @fontMiddle;
          float: left;
          margin: 14px 0 14px 33px;
          padding:4px 5px;
          background:rgba(29,255,210,0.2);
          border-radius: 4px;
          color:#03DCC0;
        }
      }
      .atBottom{
        width: 100%;
        .once{
          width: 420px;
          height: 28px;
          line-height: 28px;
          font-size: @fontMiddle;
          color:@gray;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right{
      flex: 0.66;
      background: @block;
      .info{
        flex: 1;
        .sTitle{
          padding:23px 0;
        }
        .number{
          display: block;
          font-size:49px;
          color:black;
          font-weight: bold;
          padding-left: 13px;
        }
        .others{
          display: flex;
          height: 95px;
          .once{
            flex: 1;
            .span1{
              display: block;
              height: 50%;
              text-align: center;
              line-height: 65px;
              color:@gray;
              font-size:@fontMiddle;
            }
            .span2{
              display: block;
              height: 50%;
              text-align: center;
              line-height: 20px;
              color:@gray;
              font-size:@fontMiddle;
            }
          }
          .border{
            flex: 0;
            min-width:1px;
            height:25px;
            margin:35px 0;
            background:rgba(240,242,245,1);
            border-radius: 1px;
          }
        }
      }
      .chart{
        flex: 1.2;
      }
    }
  }
  .middle{
    height: 378px;
    background: @block;
    margin:14px 0;
    .chart_round{
      flex:1.3;
      margin:20px;
    }
    .chart_other{
      flex: 1;
      margin:48px 32px;
      .dis{
        color:@gray;
        padding-left: 0;
      }
      .atMiddle{
        height: 68px;
        position: relative;
        .number{
          font-size:34px;
          color:#000000;
          position: absolute;
          left: 0;
          bottom: 4px;
        }
        .danwei{
          font-size: @fontMiddle;
          color:@black;
          position: absolute;
          right: 0;
          bottom: 4px;
        }
      }
      .chart{
        height: 90px;
        box-sizing: border-box;
        border-bottom: 1px solid #EDEDED;
      }
      .atBottom{
        height: 50px;
        color:@gray;
        font-size: @fontMiddle;
        line-height: 40px;
      }
    }
  }
  .bottom{
    height:480px;
    background: @block;
    .sTitle{
      padding:19px 0;
    }
    .table_container{
      display: flex;
      height: 368px;
      .atLeft{
        flex: 8.5;
        margin-right: 50px;
        .table{
          height: 315px;
          width: 100%;
          .line{
            height: 45px;
            width: 100%;
            &:nth-child(2n){
              background: #F2F2F2;
            }
            .td{
              display: inline-block;
              line-height: 45px;
              font-size:@fontMiddle;
              text-align: center;
            }
            .td1{
              box-sizing: border-box;
              width: 40%;
              padding:0 4px;
              text-align: left;
            }
            .td2{
              width: 15%;
            }
            .td3{
              width: 15%;
            }
            .td4{
              width: 15%;
            }
            .td5{
              width: 15%;
            }
          }
          .head{
            .td{
              color:@black;
            }
          }
          .body{
            .td{
              color:@gray;
            }
            .td2{
              span{
                padding:4px 5px;
                border-radius: 2px;
              }
              .bg1{
                color:#4CCA72;
                background: rgba(77,203,115,0.2);
              }
              .bg2{
                color:#0787E8;
                background: rgba(24,144,255,0.2);
              }
              .bg3{
                color:#FAD02D;
                background: rgba(250,208,45,0.2);
              }
            }
          }
        }
        .page{
          height: 53px;
        }
      }
      .atRight{
        flex:1.5;
        padding-bottom: 53px;
        padding-right: 80px;
        .once{
          flex: 1;
          position: relative;
          .span1{
            font-size:@fontMiddle;
            color:@gray;
            padding:12px 4px;
            display: block;
          }
          .span2{
            position: absolute;
            font-size:34px;
            color:@black;
            left:4px;
            bottom: 10px;
          }
          .span3{
            position: absolute;
            font-size:@fontMiddle;
            color:@gray;
            right:4px;
            bottom: 13px;
          }
        }
      }
    }
  }
}
</style>
