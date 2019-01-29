/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:06
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-11-12 18:27:32
 */

<template>
  <div class="view">
    <div class="view-info">
      <el-breadcrumb class="breadcrumb" separator=">">
        <el-breadcrumb-item>调解队伍分析</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input class="search-input" placeholder="请输入人员姓名, 回车执行搜索" suffix-icon="el-icon-search"  size="mini" v-model="search" @keyup.enter.native="handleSearch()"></el-input>
    </div>
    <div class="view-selector">
      <div>
        <span>所属地区：</span>
        <el-radio-group v-model="area">
          <el-radio v-for="(item,index) in areaOptions" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>机构类型：</span>
        <el-radio-group v-model="type">
          <el-radio v-for="(item,index) in typeList" :key="index" :label="item.value" v-if="index>=2">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>排名筛选：</span>
        <el-radio-group v-model="top">
          <el-radio v-for="(item,index) in topList" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="view-content">
      <div class="title">调解人员排名
        <div class="download">
          <el-dropdown @command="handleCommand">
            <el-button type="primary" size="mini">
              下载
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="csv">CSV</el-dropdown-item>
              <el-dropdown-item  command="excl">EXCEL</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="dateSelector">
          <el-date-picker type="daterange" size="mini" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd" v-model="date" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <div class="view-body">
        <div class="total" :style="{'height': showTotal?'130px':'60px'}">
          <div class="firstLine">
            <span class="titleName">总计</span>
            <span class="totalNumber">{{`(共${numFormat(total.total)}人)`}}</span>
            <i class="optionButton" :class="{'el-icon-caret-bottom': !showTotal,'el-icon-caret-top': showTotal}" @click="showTotal= !showTotal">{{showTotal?'收起':'展开'}}</i>
          </div>
          <div class="secondLine" v-if="showTotal">
            <div class="contentArea">
              <span class="totalNumber">{{numFormat(total.yewusl)}}</span><br/>
              <span class="titleName">受理案件数(件)</span>
            </div>
            <div class="contentArea">
              <span class="totalNumber">{{numFormat(total.chengjiaoje)}}</span><br/>
              <span class="titleName">调解金额(元)</span>
            </div>
            <div class="contentArea">
              <span class="totalNumber">{{numFormat(total.denglucs)}}</span><br/>
              <span class="titleName">登录人次(次)</span>
            </div>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableInfo.tableData" stripe :default-sort="{prop: tableInfo.orderBy, order: tableInfo.orderRule}" @sort-change="handleSortChange" @row-click="handleRowClick">
            <el-table-column type="index" :index="indexMethod"  label="排名" width="60"></el-table-column>
            <el-table-column prop="name" sortable="custom" label="姓名" width="100"></el-table-column>
            <el-table-column prop="shortname" sortable="custom" label="所属单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="yewusl" sortable="custom" :formatter="numFormatMethod" label="受理案件数"></el-table-column>
            <el-table-column prop="tiaojiecgl" sortable="custom" :formatter="percentFormatMethod" label="成功率"></el-table-column>
            <el-table-column prop="chengjiaoje" sortable="custom" :formatter="numFormatMethod" label="调解金额"></el-table-column>
            <el-table-column prop="pingjuntjzq" sortable="custom" :formatter="numFormatMethod" label="平均调解时长(天)"></el-table-column>
            <el-table-column prop="denglucs" sortable="custom" :formatter="numFormatMethod" label="登录次数"></el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableInfo.currentPage"
            :page-sizes="[10, 20, 30]" :page-size="tableInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import { peopleRankings } from '@/api/api'
import { coordinationType, top } from '@/utils/dictionaryMapping'
import { pickerOptions, defaultDateRage, percentFormat, numFormat, findAreaNameByValue, findCoordinationTypeByValue, findTopLabelByValue } from '@/utils/index'
import { dataPermission } from '@/utils/permission'

export default {
  name: 'peopleRankings',
  data () {
    return {
      /* ------ info区域 begin ------ */
      search: '',
      /* ------ info区域 end ------ */
      /* ------ selector区域 begin ------ */
      area: localStorage.getItem('area'),
      areaOptions: dataPermission(localStorage.getItem('area')),
      // 机构类型字段
      type: coordinationType[2]['value'],
      // 排名筛选字段
      top: top[0]['value'],
      // 机构类型数据
      typeList: coordinationType,
      // 排名筛选数据
      topList: top,
      /* ------ selector区域 end ------ */
      /* ------ content区域 begin ------ */
      date: defaultDateRage(),
      pickerOptions: pickerOptions,
      tableInfo: {
        tableData: [],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        orderBy: 'yewusl',
        orderRule: 'DESC'
      },
      total: {
        chengjiaoje: 0,
        denglucs: 0,
        total: 0,
        yewusl: 0
      },
      showTotal: true
      /* ------ selector区域 end ------ */
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    area: function (newValue, oldValue) {
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    top: function (newValue, oldValue) {
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    date: function (newValue, oldValue) {
      this.tableInfo.currentPage = 1
      this.onLoad()
    }
  },
  methods: {
    // 获取数据
    onLoad (type) {
      // 调用api接口，并且提供了两个参数
      const _this = this
      peopleRankings({
        location: this.area,
        mediationtype: this.type,
        obj: this.tableInfo.orderBy,
        reorder: this.tableInfo.orderRule,
        pagesize: this.tableInfo.pageSize,
        currentpage: this.tableInfo.currentPage,
        download: type || 0,
        startdate: this.date[0],
        enddate: this.date[1],
        limit: this.top,
        keyword: this.search
      }, type ? 'arraybuffer' : 'json').then(res => {
        if (type) {
          // 下载
          let blob = new Blob([res]) // 创建一个blob对象
          let a = document.createElement('a') // 创建一个<a></a>标签
          a.href = URL.createObjectURL(blob) // response is a blob
          // 文件名称
          if (type === 'csv') {
            a.download = `${_this.fileRename()}.csv`
          } else if (type === 'excl') {
            a.download = `${_this.fileRename()}.xls`
          }
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          a.remove()
        } else {
          // 表格数据
          if (res.code) {
            this.tableInfo.tableData = res.data.pageData
            this.tableInfo.total = res.data.pageinfo.total
            this.total = res.data.zongji
          } else {
            this.$message({ type: 'error', message: '系统内部错误' })
            this.$router.push({ path: '/error/500' })
          }
        }
      })
    },
    fileRename () {
      return `${this.date[0]}至${this.date[1]} ${findAreaNameByValue(this.area)}${findCoordinationTypeByValue(this.type)}${findTopLabelByValue(this.top)}统计数据`
    },
    indexMethod (index) {
      return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
    percentFormatMethod (row, column, cellValue, index) {
      return percentFormat(cellValue)
    },
    numFormatMethod (row, column, cellValue, index) {
      return numFormat(cellValue)
    },
    numFormat (data) {
      return numFormat(data)
    },
    handleSearch () {
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    handleSizeChange (pageSize) {
      this.tableInfo.pageSize = pageSize
      this.onLoad()
    },
    handleCurrentChange (currentPage) {
      this.tableInfo.currentPage = currentPage
      this.onLoad()
    },
    handleSortChange (sort) {
      this.tableInfo.orderBy = sort.prop === null ? 'yewusl' : sort.prop
      this.tableInfo.orderRule = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.onLoad()
    },
    handleRowClick (row, event, column) {
      this.$router.push({ path: `/peopleDetail/${row.id_}` })
    },
    handleCommand (command) {
      this.onLoad(command)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/common.less';
  .view {
    width: 100%;
    background: #F0F2F5;
    .view-info {
      width: 100%;
      height: 28px;
      .breadcrumb{
        float: left;
        width: 300px !important;
        line-height: 28px;
      }
      .search-input{
        float: right;
        width: 220px;
      }
    }
    .view-selector {
      width: 100%;
      margin-top: 15px;
      height: 144px;
      background: #FFFFFF;
      box-sizing: border-box;
      padding: 0px 7px;
      line-height: 48px;
      font-size: 14px;
    }
    .view-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-top: 15px;
      background: #FFFFFF;
      .view-content-top {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 47px;
        border-bottom: #EDEDED solid 1px;
        line-height: 46px;
      }
      .view-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        .total{
          width: 100%;
          min-height: 60px;
          max-height: 130px;
          background: rgba(198,228,255,0.2);
          box-sizing: border-box;
          padding: 15px;
          .firstLine{
            font-size: @fontBig;
            .titleName{
              color: @black;
            }
            .totalNumber{
              color: rgba(24,144,255,0.85);
            }
            .optionButton{
              float: right;
              cursor: pointer;
              color: #616161;
              user-select: none;
              font-size: @fontSmall;
            }
          }
          .secondLine{
            margin-top: 10px;
            .contentArea{
              float: left;
              width: 165px;
              text-align: center;
              border-left: solid #e5ebf1 1px;
              &:first-of-type{
                border-left: 0;
              }
              .totalNumber{
                font-size: 20px;
                color: rgba(24,144,255,0.85);
                line-height: 42px;
              }
              .titleName{
                font-size: 14px;
                color: @gray;
              }
            }
          }
        }
        .table {
          width: calc(100%-30px);
          margin: 0 15px;
        }
        .pagination {
          width: 100%;
          margin: 15px 0;
          text-align: center;
        }
      }
    }
  }
</style>
