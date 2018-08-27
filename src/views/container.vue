/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-27 11:23:16
 */
<template>
  <!-- 外层容器，当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 -->
  <div class="container">
    <!-- 顶栏容器 -->
    <header-com class="header"></header-com>
    <div class="content">
      <!-- 侧边栏容器 -->
      <aside-com class="aside"></aside-com>
      <!-- 路由区域 -->
      <div class="main">
        <transition name="fade"  mode="out-in">
          <router-view class="router"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'container',
  created () {
    // 保存url search 中的token
    const search = window.location.search
    if (search) {
      const token = search.split('?token=')[1]
      if (token) {
        this.$store.dispatch({ type: 'app/setToken', amount: token.split('/')[0] })
      }
    }
  }
}
</script>

<style lang="less">
  // 通用css
  @import '~@/assets/css/common.less';
  // 修改elementui默认样式
  @import '~@/assets/css/editElementui.less';
  .container {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 60px;
      background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
      transition: background-color 0.3s ease-in-out;
    }
    .content {
      display: flex;
      height: calc(100% - 60px);
      width: 100%;
      .aside {
        flex-grow: 0;
        height: 100%;
        .is-opened .el-menu-item {
          background: #000C17 !important;
        }
        .is-opened .is-active,
        .is-active {
          color: #FFFFFF !important;
          background: #1890FF !important;
        }
        .el-menu-item:hover {
          color: #1890FF !important;
          background: #001529 !important;
          i {
            color: #1890FF !important;
          }
        }
      }
      .main {
        flex-grow: 1;
        overflow: auto;
        .router{
          box-sizing: border-box;
          padding: 15px;
          min-width: 1165px;
        }
      }
    }
  }
</style>
