/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 16:25:55
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-10 17:31:06
 */
<template>
  <el-menu default-active="2" class="asideMenu" @open="handleOpen" @close="handleClose"  :collapse="isCollapse"
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :style="{'min-width':isCollapse?'60px':'200px'}">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.isCollapseAside
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
  .asideMenu {
    height: 100%;
  }
</style>
