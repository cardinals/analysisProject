/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-09 16:35:36
 */
<template>
  <!-- 外层容器，当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。 -->
  <div class="container">
    <!-- 顶栏容器 -->
    <header-com class="header" v-if="$route.path!=='/login'"></header-com>
    <div class="content" v-if="$route.path!=='/login'">
      <!-- 侧边栏容器 -->
      <div class="left">
        <aside-com class="aside"></aside-com>
        <div class="bottom" :style="{width: !$store.state.aside.isCollapseAside?'200px':'64px'}">
          <span class="font" v-if="!$store.state.aside.isCollapseAside" @click="openPage()">前往业务系统</span>
        </div>
      </div>
      <!-- 路由区域 -->
      <div class="main" v-loading="$store.state.app.isShowLoading">
        <transition name="fade"  mode="out-in">
          <router-view class="router"></router-view>
        </transition>
      </div>
    </div>
    <router-view class="router" v-else></router-view>
  </div>
</template>

<script>
import { loginStatus } from '@/api/api'
import { dataPermission, componentsPermission } from '@/utils/permission'
export default {
  name: 'container',
  created () {
    this.loginStatus()
  },
  methods: {
    // 登录状态检测
    loginStatus () {
      let param = {}
      loginStatus(param).then((res) => {
        if (res.code === 1) {
          this.$store.dispatch({ type: 'app/setUserName', amount: res.data.username })
          this.setPermission(res.data.areacode)
        } else if (res.code === 9) {
          this.$message({ type: 'warning', message: res.message, duration: 5000 })
          this.$router.push({ path: '/login' })
        }
      })
    },
    // 设置权限
    setPermission (areacode) {
      // 数据权限
      this.$store.dispatch({ type: 'app/setArea', amount: dataPermission(areacode) })
      // 模块权限
      componentsPermission().then(data => {
        this.$store.dispatch({ type: 'aside/setAsideMenuData', amount: data })
        if (this.$route.path === '/login') {
          this.$router.push({ path: '/home' })
        }
      })
    },
    openPage () {
      window.open('http://rmtj.justice.gov.cn/')
    }
  }
}
</script>

<style lang="less">
  // 通用css
  @import '~@/assets/css/common.less';
  // 修改elementui默认样式
  @import '~@/assets/css/editElementui.less';
  // icon
  @import '~@/assets/css/icon.less';
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
      .left {
        flex-grow: 0;
        .aside {
          height: calc(100% - 40px);
        }
        .bottom {
          height: 40px;
          background: rgb(0, 21, 41);
          max-width: 200px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          box-sizing: border-box;
          padding-top: 5px;
          &:hover{
            cursor: pointer;
            color: rgba(24, 144, 255, 0.9);
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
