/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-14 09:48:02
 */

<template>
  <div>
  </div>
</template>

<script>
import { organizationRankings } from '@/api/api'
export default {
  name: 'organizationRankings',
  created () {
    this.onLoad()
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

</style>
