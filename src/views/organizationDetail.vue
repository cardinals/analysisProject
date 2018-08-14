/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:33:54
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-14 09:47:31
 */

<template>
  <div></div>
</template>

<script>
import { organizationDetails } from '@/api/api'
export default {
  name: 'organizationDetails',
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      organizationDetails({
        id: this.$route.params.id,
        time: 'benYue',
        categoryType: 'tiaoWeiH'
      }).then(res => {
        console.log('load organizationDetails success')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
