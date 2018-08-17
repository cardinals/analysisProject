/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-17 17:30:56
 */

<template>
  <div class="view">
    <div class="view-info">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
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
          <el-radio :label="'JUSTICEBUREAU'">司法局</el-radio>
          <el-radio :label="'JUSTICEOFFICE'">司法所</el-radio>
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
          <el-table :data="tableInfo.tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="机构名称"></el-table-column>
            <el-table-column prop="yewusl" label="业务数量"></el-table-column>
            <!-- <el-table-column prop="" label="调解案件数量"></el-table-column>
            <el-table-column prop="" label="调解案例上报数"></el-table-column>
            <el-table-column prop="" label=""></el-table-column>
            <el-table-column prop="" label=""></el-table-column>
            <el-table-column prop="" label=""></el-table-column>
            <el-table-column prop="" label=""></el-table-column>
            <el-table-column prop="" label=""></el-table-column>
            <el-table-column prop="" label=""></el-table-column> -->
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableInfo.currentPage"
            :page-sizes="[10, 20, 30]" :page-size="tableInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableInfo.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { organizationRankings } from '@/api/api'
import { area, coordinationType, top } from '@/utils/dictionaryMapping'
import { pickerOptions, defaultDataRage } from '@/utils/index'

export default {
  name: 'organizationRankings',
  data () {
    return {
      /* ------ selector区域 begin ------ */
      // 所属地区字段
      area: area[0]['value'],
      // 机构类型字段
      type: 'JUSTICEBUREAU',
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
        total: 0
      }
      /* ------ selector区域 end ------ */
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    },
    area: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    },
    top: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    },
    date: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad () {
      // 调用api接口，并且提供了两个参数
      organizationRankings({
        location: this.area,
        mediationtype: 'allinformation',
        obj: 'yewusl',
        reorder: 'DESC',
        pagesize: this.tableInfo.pageSize,
        currentpage: this.tableInfo.currentPage,
        download: 0,
        startdate: this.date[0],
        enddate: this.date[1],
        label: this.type,
        limit: this.top,
        keyword: ''
      }).then(res => {
        // 获取数据成功后的其他操作
        this.tableInfo.tableData = res.data.pageData
        this.tableInfo.pageSize = res.data.pageinfo.pagesize
        this.tableInfo.total = res.data.pageinfo.total
      })
    },
    handleSizeChange () {
      this.onLoad()
    },
    handleCurrentChange () {
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
  .view {
    width: 100%;
    background: #F0F2F5;
    .view-info {
      width: 100%;
    }
    .view-selector {
      width: 100%;
      margin-top: 15px;
      height: 144px;
      background: #FFFFFF;
      box-sizing: border-box;
      padding: 0px 10px;
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
        .table {
          width: 100%;
          margin: 20px 15px;
        }
        .pagination {
          width: 100%;
          margin: 20px 15px;
          text-align: center;
        }
      }
    }
  }
</style>
