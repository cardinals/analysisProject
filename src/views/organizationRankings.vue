/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-16 16:07:37
 */

<template>
  <div class="view">
    <div class="info">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="selector">
      <el-radio-group v-model="area">
        <el-radio v-for="(item,index) in areaList" :key="index" :label="item">{{item}}</el-radio>
      </el-radio-group>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
import { organizationRankings } from '@/api/api'
export default {
  name: 'organizationRankings',
  data () {
    return {
      area: '上海',
      type: '',
      number: '',
      areaList: ['北京', '上海']
    }
  },
  created () {
    // this.onLoad()
  },
  methods: {
    // 获取数据
    onLoad () {
      // 调用api接口，并且提供了两个参数
      organizationRankings({
        obj: 'yewusl',
        reorder: 'DESC',
        pagesize: 10,
        currentpage: 1,
        excl: false,
        startdate: '2018-01-10',
        enddate: '2018-05-10',
        lable: 'JUSTICEOFFICE'
      }).then(res => {
        // 获取数据成功后的其他操作
      })
    }
  }
}
</script>

<style lang="less" scoped>
 .view {
   width: 100%;
   background: #F0F2F5;
   .info {
    width: 100%;
   }
   .selector {
     width: 100%;
     margin-top: 15px;
     height: 100px;
     background: #FFFFFF;
   }
   .content {
     width: 100%;
     margin-top: 15px;
     height: 100px;
     background: #FFFFFF;
   }
 }
</style>
