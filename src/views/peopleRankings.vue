/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:06
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 11:12:26
 */

<template>
  <div class="view">
    <div class="view-info">
      <el-breadcrumb class="breadcrumb" separator=">">
        <el-breadcrumb-item>调解队伍分析</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input class="search-input" placeholder="请输入搜索内容, 回车执行搜索" suffix-icon="el-icon-search"  size="mini" v-model="search" @keyup.enter.native="handleSearch()"></el-input>
    </div>
    <div class="view-selector">
      <div>
        <span>所属地区：</span>
        <el-radio-group v-model="area">
          <el-radio v-for="(item,index) in areaList" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>机构类型：</span>
        <el-radio-group v-model="type">
          <el-radio v-for="(item,index) in typeList" :key="index" :label="item.value">{{item.label}}</el-radio>
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
      <div class="top">
        <div class="title">调解机构排名</div>
        <div class="dateSelector">
          <el-date-picker type="daterange" size="mini" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
            value-format="yyyy-MM-dd" v-model="date" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="download">
          <el-dropdown>
            <el-button type="primary" size="mini">
              下载
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>CSV</el-dropdown-item>
              <el-dropdown-item>Excel</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="view-body">
        <div class="table">
          <el-table :data="tableInfo.tableData" stripe :default-sort="{prop: tableInfo.orderBy, order: tableInfo.orderRule}" @sort-change="handleSortChange" @row-click="handleRowClick">
            <!-- id -->
            <el-table-column type="index" :index="indexMethod"  label="排名" width="60"></el-table-column>
            <el-table-column prop="name" sortable="custom" label="姓名" width="100"></el-table-column>
            <el-table-column prop="shortname" sortable="custom" label="所属单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="yewusl" sortable="custom" :formatter="numFormatMethod" label="调解案例数"></el-table-column>
            <el-table-column prop="tiaojiecgl" sortable="custom" :formatter="percentFormatMethod" label="成功率"></el-table-column>
            <el-table-column prop="chengjiaoje" sortable="custom" :formatter="numFormatMethod" label="调解金额"></el-table-column>
            <el-table-column prop="pingjuntjzq" sortable="custom" label="平均调解时长(天)"></el-table-column>
            <el-table-column prop="denglucs" sortable="custom" :formatter="numFormatMethod" label="登录人次"></el-table-column>
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
import { area, coordinationType, top } from '@/utils/dictionaryMapping'
import { pickerOptions, defaultDataRage } from '@/utils/index'

export default {
  name: 'peopleRankings',
  data () {
    return {
      /* ------ info区域 begin ------ */
      search: '',
      /* ------ info区域 end ------ */
      /* ------ selector区域 begin ------ */
      // 所属地区字段
      area: area[0]['value'],
      // 机构类型字段
      type: coordinationType[0]['value'],
      // 排名筛选字段
      top: top[0]['value'],
      // 所属地区数据
      areaList: area,
      // 机构类型数据
      typeList: coordinationType,
      // 排名筛选数据
      topList: top,
      /* ------ selector区域 end ------ */
      /* ------ content区域 begin ------ */
      date: defaultDataRage(),
      pickerOptions: pickerOptions,
      tableInfo: {
        tableData: [],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        orderBy: 'yewusl',
        orderRule: 'descending'
      }
      /* ------ selector区域 end ------ */
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      console.log(newValue, oldValue)
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    area: function (newValue, oldValue) {
      console.log(newValue, oldValue)
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    top: function (newValue, oldValue) {
      console.log(newValue, oldValue)
      this.tableInfo.currentPage = 1
      this.onLoad()
    },
    date: function (newValue, oldValue) {
      console.log(newValue, oldValue)
      this.tableInfo.currentPage = 1
      this.onLoad()
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad () {
      // 调用api接口，并且提供了两个参数
      peopleRankings({
        location: this.area,
        mediationtype: 'allinformation',
        obj: this.tableInfo.orderBy,
        reorder: this.tableInfo.orderRule === 'descending' ? 'DESC' : 'ASC',
        pagesize: this.tableInfo.pageSize,
        currentpage: this.tableInfo.currentPage,
        download: 0,
        startdate: this.date[0],
        enddate: this.date[1],
        label: this.type,
        limit: this.top,
        keyword: this.search
      }).then(res => {
        // 获取数据成功后的其他操作
        this.tableInfo.tableData = res.data.pageData
        this.tableInfo.total = res.data.pageinfo.total
      })
    },
    indexMethod (index) {
      return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
    percentFormatMethod (row, column, cellValue, index) {
      return `${cellValue * 100}%`
    },
    numFormatMethod (row, column, cellValue, index) {
      const reg = /\d{1,3}(?=(\d{3})+$)/g
      return String(cellValue).replace(reg, '$&,')
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
      this.tableInfo.orderBy = sort.prop
      this.tableInfo.orderRule = sort.order
      this.onLoad()
    },
    handleRowClick (row, event, column) {
      this.$router.push({path: `/peopleDetail/${row.id_}`})
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
      .top {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 47px;
        border-bottom: #EDEDED solid 1px;
        line-height: 46px;
        .title {
          flex-grow: 0;
          color: #000000;
          font-size: 16px;
          margin-left: 12px
        }
        .dateSelector {
          flex-grow: 1;
          margin-right: 12px;
          text-align: right;
        }
        .download {
          flex-grow: 0;
          margin-right: 12px
        }
      }
      .view-body {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        .table {
          width: 100%;
          margin-top: 15px;
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
