/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 16:26:00
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 11:35:36
 */
<template>
  <div class="header">
    <div class="left" :style="{'width': $store.state.aside.isCollapseAside?'62px':'200px'}">
      <i class="icon" :class="{ 'narrowlogo': $store.state.aside.isCollapseAside, 'widelogo': !$store.state.aside.isCollapseAside }"></i>
    </div>
    <div class="right">
      <i class="icon hamburger" :class="{ 'collapselogo': !$store.state.aside.isCollapseAside, 'spreadlogo': $store.state.aside.isCollapseAside }" @click="handleCollapseChange()"></i>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <i class="icon user-logo"></i>
          <span class="user-name">用户名</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
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
    display: flex;
    width: 100%;
    .left {
      flex-grow: 0;
      height: 100%;
      min-width: 62px;
      box-sizing: border-box;
      background: #002140;
      .widelogo {
        background: url(~@/assets/images/icon-system-logo-wide.png) no-repeat center;
      }
      .narrowlogo {
        background: url(~@/assets/images/icon-system-logo-narrow.png) no-repeat center;
      }
    }
    .right {
      flex-grow: 1;
      height: 100%;
      box-sizing: border-box;
      line-height: 100%;
      border-radius: 0px !important;
      .hamburger{
        float: left;
        display: block;
        width: 22px;
        height: 18.5px;
        background: url(~@/assets/images/icon-hamburger.png);
        margin: 20px 15px;
      }
      .collapselogo{
        background-position: 0 0;
      }
      .collapselogo:hover{
        cursor: pointer;
        background-position: 22px 0;
      }
      .spreadlogo{
        background-position: 0 18.5px;
      }
      .spreadlogo:hover{
        cursor: pointer;
        background-position: 22px 18.5px;
      }
      .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          .user-logo {
            float: left;
            margin-top: 10px;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: url(~@/assets/images/icon-user.png) no-repeat center;
          }
          .user-name {
            float: left;
            display: block;
            line-height: 61px;
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
