/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 16:25:55
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-10-09 16:36:25
 */
<template>
  <el-menu :default-active="$store.state.aside.activeItem" class="asideMenu" @select="handleSelect" :collapse="isCollapse"
    background-color="#001529" text-color="rgba(255,255,255,0.6)" active-text-color="rgba(255,255,255,1)" :style="{'min-width':isCollapse?'60px':'200px'}">
    <!-- 构建侧边栏菜单内容 -->
    <div v-for="item in menuData" :key="item.index">
      <el-submenu v-if="item.children&&item.children.length>0" :disabled="item.disable" :index="item.index">
        <template slot="title">
          <i class="icon" :class="`icon-${item.index}`"></i>
          <span v-if="!isCollapse">{{item.label}}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :disabled="subItem.disable" :index="subItem.index" :key="subItem.index">
          <span>{{subItem.label}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :disabled="item.disable" :index="item.index">
        <i class="icon" :class="`icon-${item.index}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.aside.isCollapseAside
    },
    menuData: function () {
      return this.$store.state.aside.asideMenuData
    }
  },
  watch: {
    '$route' (to, from) {
      // 路由变化时，动态修改侧边栏选中项
      this.$store.dispatch({ type: 'aside/setCurrentModule', amount: String(to.path).split('/')[1] })
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      this.$router.push({ path: `/${index}` })
    }
  }
}
</script>

<style lang="less">
  .asideMenu {
    height: 100%;

    i {
      margin-right: 8px;
    }

    .is-opened .el-menu-item {
      background: #000C17 !important;
    }

    .is-opened .is-active,
    .is-active {
      color: #ffffff !important;
      background: #1890FF !important;
    }

    .el-menu-item:hover {
      color: #ffffff !important;

      .icon-home {
        background: url(~@/assets/images/asideIcon/icon-home-hover.png) center center;
      }

      .icon-teamAnalysis {
        background: url(~@/assets/images/asideIcon/icon-people-hover.png) center center;
      }

      .icon-workAnalysis {
        background: url(~@/assets/images/asideIcon/icon-work-quality-hover.png) center center;
      }
    }
  }
</style>
