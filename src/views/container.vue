/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-16 16:10:03
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
      <transition name="fade">
        <router-view  class="main"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import headerCom from '@/components/header'
import asideCom from '@/components/aside'
export default {
  name: 'container',
  components: {
    headerCom,
    asideCom
  }
}
</script>

<style lang="less">
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
      width: 100%;
      height: calc(100% - 60px);
      overflow: hidden;
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
        height: 100%;
        box-sizing: border-box;
        padding: 15px;
        overflow: auto;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .icon{
    display: block;
    height: 100%;
    line-height: 100%;
  }

  // 修改 el-radio 单选框样式
  .el-radio+.el-radio {
    margin-left: 0px !important;
  }
  .el-radio__inner {
    display: none !important;
  }
</style>
