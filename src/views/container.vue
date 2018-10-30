/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-26 14:34:29
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
        <div class="bottom" @click="openPage()" v-if="!$store.state.aside.isCollapseAside">
          <span>前往业务系统</span>
          <i class="icon icon-arrow-right" style="margin-left:5px;"></i>
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
import { dataPermission } from '@/utils/permission'
import { getQueryString } from '@/utils/index'

export default {
  name: 'container',
  created () {
    this.loginStatus()
  },
  methods: {
    // 登录状态检测
    loginStatus () {
      const tokenList = {
        'h9vKvopXLDgeP1jOAp79MjKmxVfvIGsWQzk=': { userName: 'xhsf', areaCode: 'SHJCK01005' }
      }
      const token = getQueryString('token')
      if (tokenList[token]) {
        this.$store.dispatch({ type: 'app/setUserName', amount: tokenList[token].userName })
        this.setPermission(tokenList[token].areaCode)
      } else {
        this.$message({ type: 'warning', message: '未找到有效的token信息，暂无系统访问权限', duration: 5000 })
        this.$store.dispatch({ type: 'aside/setAsideMenuData', amount: [] })
        this.$router.push({ path: '/error/403' })
      }
    },
    // 设置权限
    setPermission (areacode) {
      // 数据权限
      this.$store.dispatch({ type: 'app/setArea', amount: dataPermission(areacode) })
      // 将数据权限本地存储
      localStorage.setItem('area', areacode)
      // 模块权限
      this.$store.dispatch({ type: 'aside/setAsideMenuData', amount: [{ 'index': 'home', 'label': '业务监控', 'moduleid': 'A1', 'parentid': null, 'disable': false }, { 'index': 'teamAnalysis', 'label': '调解队伍分析', 'moduleid': 'A3', 'parentid': null, 'children': [{ 'index': 'organizationRankings', 'label': '调解机构排名', 'moduleid': 'B31', 'parentid': 'A3', 'disable': false }, { 'index': 'peopleRankings', 'label': '调解人员排名', 'moduleid': 'B32', 'parentid': 'A3', 'disable': false }], 'disable': false }, { 'index': 'workAnalysis', 'label': '工作质量分析', 'moduleid': 'A4', 'parentid': null, 'children': [{ 'index': 'loginAnalysis', 'label': '登录人次分析', 'moduleid': 'B41', 'parentid': 'A4', 'disable': false }], 'disable': false }] })
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
          height: 100%;
        }
        .bottom {
          position: absolute;
          left: 0;
          bottom: 25px;
          height: 40px;
          width: 140px;
          box-sizing: border-box;
          padding: 8px 0;
          margin: 0 30px;
          border-radius: 15px;
          background: #042544;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          &:hover{
            cursor: pointer;
            color: rgba(255, 255, 255, 1);
            background: #208df1;
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
