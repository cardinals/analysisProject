/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 16:26:00
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 09:59:28
 */
<template>
  <div class="header">
    <el-button @click='handleCollapseChange'>切换折叠状态</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleCollapseChange () {
      this.$store.dispatch({ type: 'aside/changeAsideCollapseStatus', amount: !this.$store.state.aside.isCollapseAside })
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 100%;
  }
</style>
