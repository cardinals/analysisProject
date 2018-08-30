<template>
  <div class="logonPerson_container" v-if="data">
    <div class="nav">
      <span class="span1">工作质量分析</span>
      <span class="span2">>登录人次分析</span>
    </div>
    <div class="top flexRow">
      <div class="left">
        <div class="title">登录统计信息
          <el-date-picker class="dateSelector" v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期"  :pickerOptions="pickerOptions" size="mini">
          </el-date-picker>
        </div>
        <div class="contents">
          <div class="cTop flexRow">
            <div class="cLeft">
              <div class="label">累计登录人次</div>
              <div class="con clearfix">
                <div class="number">{{data.LoginCountInfo.denglurc | numFormat}}</div>
                <div class="unit">次</div>
              </div>
            </div>
            <div class="cRight">
              <div class="label">零登录人数</div>
              <div class="con clearfix">
                <div class="number">{{data.LoginCountInfo.weidenglurs | numFormat}}</div>
                <div class="unit">人</div>
              </div>
            </div>
          </div>
          <div class="cBottom flexRow">
            <div class="cLeft">
              <div class="label">累计登录人数</div>
              <div class="con clearfix">
                <div class="number">{{data.LoginCountInfo.denglurs | numFormat}}</div>
                <div class="unit">人</div>
              </div>
            </div>
            <div class="cRight">
              <div class="line line1">
                <div class="quan"></div>
                <div class="dec">专职调解员</div>
                <div class="num">{{data.LoginCountInfo.zhuanzhi | numFormat}}</div>
              </div>
              <div class="line line2">
                <div class="quan"></div>
                <div class="dec">兼职或其他</div>
                <div class="num">{{data.LoginCountInfo.jianzhi | numFormat}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">今日登录人员
          <span class="titleRight">共:{{data.TodayLogin.length | numFormat}}人</span>
        </div>
        <div class="contents">
          <el-table :data="currentTableData" stripe class="table" @row-click="handleRowClick">
              <el-table-column prop="name" :width="100" label="姓名"></el-table-column>
              <el-table-column prop="shortname" label="所属单位" show-overflow-tooltip></el-table-column>
              <el-table-column prop="denglusj" label="今日首次登录时间" :formatter="timeFormat"></el-table-column>
              <el-table-column prop="denglucs" label="登录次数"></el-table-column>
            </el-table>
          <div class="pageCon">
            <el-pagination layout="prev, pager, next, jumper" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize" :total="data.TodayLogin.length">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        各区登录人次分析
        <el-date-picker class="dateSelector" v-model="date2" type="week" format="yyyy 第 WW 周" placeholder="选择周" :pickerOptions="pickerDisabledDate" size="mini">
        </el-date-picker>
      </div>
      <g2-groupedColumn :id="'groupedColumn'" :data="groupedColumnData" :height="593"></g2-groupedColumn>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import {loginAnalysis} from '@/api/api'
import {pickerOptions, pickerDisabledDate, defaultDateRage, defaultWeek, dateFormat, findWeekRangeByToday, numFormat} from '@/utils/index'
export default {
  data () {
    return {
      date: defaultDateRage(),
      date2: findWeekRangeByToday(defaultWeek(), 1),
      pickerOptions: pickerOptions,
      pickerDisabledDate: pickerDisabledDate,
      data: null,
      currentPage: 1,
      pageSize: 4
    }
  },
  computed: {
    groupedColumnData: {
      get: function () {
        let list = []
        if (this.data) {
          this.data.peopleHotCount.map(item => {
            list.push({name: item.shortname, value: item.login, type: '登录人次'})
            list.push({name: item.shortname, value: item.hot, type: '登录热度'})
          })
        }
        return list
      },
      set: function () {}
    },
    currentTableData: {
      get: function () {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return this.data.TodayLogin.slice(start, end)
      },
      set: function () {}
    }
  },
  watch: {
    date: function (newValue, oldValue) {
      this.currentPage = 1
      this.onLoad()
    },
    date2: function (newValue, oldValue) {
      this.onLoad()
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      loginAnalysis([{
        startdate: dateFormat(findWeekRangeByToday(this.date2, 1)),
        enddate: dateFormat(findWeekRangeByToday(this.date2, 7))
      }, {
        startdate: this.date[0],
        enddate: this.date[1]
      }]).then(resList => {
        if (resList[0].data.code && resList[1].data.code) {
          this.data = Object.assign(resList[0].data.data, resList[1].data.data)
        } else {
          this.data = null
          this.$message({type: 'error', message: '系统内部错误'})
          this.$router.push({path: '/error/500'})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    numFormat (value) {
      return numFormat(parseInt(value))
    },
    timeFormat (row, column, cellValue, index) {
      return cellValue.split(' ')[1]
    },
    handleRowClick (row, event, column) {
      this.$router.push({path: `/peopleDetail/${row.id}`})
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.logonPerson_container{
  background: #EDEDED;
  .top{
    margin-bottom: 16px;
    height: 363px;
    .left{
      flex:1;
      margin-right: 16px;
      background: @block;
      .title{
        position: relative;
      }
      .dateSelector{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
      .cTop{
        height: 134px;
      }
      .cBottom{
        height: 150px;
      }
      .cLeft{
        flex: 3;
        margin-right: 80px;
      }
      .cRight{
        flex: 2.5;
        position: relative;
        .line{
          width: 100%;
          height: 20px;
          line-height: 20px;
          position: absolute;
          top: 50%;
          .quan{
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #1890FF;
            margin:6px 0;
            float: left;
          }
          .dec{
            font-size:@fontMiddle;
            line-height: 20px;
            height: 20px;
            float: left;
            margin-left: 12px;
            color:@black;
          }
          .num{
            font-size:@fontMiddle;
            line-height: 20px;
            height: 20px;
            float: right;
            color:@black;
          }
        }
        .line1{
           transform: translateY(-50%)
        }
        .line2{
          transform: translateY(70%);
          .quan{
            background: #4ECB72;
          }
        }
      }
      .con{
        position: relative;
      }
      .label{
        font-size: @fontMiddle;
        color:@black;
        display: block;
        padding: 27px 0;
      }
      .number{
        font-size: 49px;
        color:#000000;
        float: left;
        height: 50px;
        line-height: 50px;
      }
      .unit{
        position: absolute;
        font-size: @fontMiddle;
        color:#000000;
        right: 0px;
        bottom: 8px;
      }
    }
    .right{
      flex: 1;
      background: @block;
      .title{
        .titleRight{
          font-size: @fontBig;
          float: right;
        }
      }
      .table{
        height: 240px;
        margin-bottom: 16px;
        .tr{
          height: 37px;
          color: @gray;
          font-size: @fontMiddle;
          &:nth-of-type(2n){
            background:#F2F2F2;
          }
          .td{
            float: left;
            height: 37px;
            line-height: 37px;
            text-align: center;
            box-sizing: border-box;
          }
          .td1{
            width: 17%;
            text-align: left;
            padding-left: 12px;
          }
          .td2{
            width: 43%;
            text-align: left;
          }
          .td3{
            width: 25%;
            text-align: left;
          }
          .td4{
            width: 15%;
            text-align: right;
            padding-right: 12px;
          }
        }
      }
      .pageCon{
        height: 51px;
        text-align: center;
      }
    }
  }
  .bottom{
    height: 642px;
    background: @block;
    .title{
      position: relative;
      .dateSelector{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

}
</style>
