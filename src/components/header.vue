/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 16:26:00
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-14 18:13:25
 */
<template>
  <div class="header">
    <div class="left" :style="{'width': leftWidth}"></div>
    <el-menu class="right" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="handleCollapseChange" :isActive="$store.state.aside.isCollapseAside"></hamburger>
      <el-breadcrumb class="breadcrumb-container" separator=">">
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="favicon.ico">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </el-menu>
  </div>
</template>

<script>
import hamburger from '@/components/hamburger'
export default {
  components: {
    hamburger
  },
  data () {
    return {
      leftWidth: '200px'
    }
  },
  methods: {
    handleCollapseChange () {
      if (this.$store.state.aside.isCollapseAside === true) {
        this.leftWidth = '200px'
      } else {
        this.leftWidth = '64px'
      }
      this.$store.dispatch({ type: 'aside/changeAsideCollapseStatus', amount: !this.$store.state.aside.isCollapseAside })
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    width: 100%;
    height: 100%;
    .left {
      flex-grow: 0;
      height: 100%;
      min-width: 64px;
      box-sizing: border-box;
      background: #002140;
    }
    .right {
      flex-grow: 1;
      height: 100%;
      box-sizing: border-box;
      line-height: 100%;
      border-radius: 0px !important;
      .hamburger-container {
        height: 20px;
        float: left;
        margin: 20px 10px;
      }
      .breadcrumb-container {
        line-height: 60px;
        float: left;
      }
      .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
      }
      .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
