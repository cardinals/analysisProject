/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-10 11:54:18
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-11-08 16:59:21
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
        'jNvmu89KKigQewSRToOlY3GyxWnlZXwVVDtz3rDac6noIvDVZKrAd5jSrUXiUusyd2s=': { name: '陈春兰', userName: 'sh_chenchunlan00', areaCode: 'SHJCK01000' },
        'jNvmq89OKiwCZgWTSJz8MjKmnQarfnEkRDtn3rvBdfa2dLOPKLfPJsaE9xemDPE+bWaEq2SzU8E2nw==': { name: '商忠强', userName: 'sh_shangzhongqiang00', areaCode: 'SHJCK01000' },
        'jNvmtMZGPCIZYBmYQd2lfi+p8lrnZGESVj111bKLLajqIO+VIbjGcZ7UrAn5Eu01': { name: '赖咸森', userName: 'sh_laixiansen00', areaCode: 'SHJCK01000' },
        'jNvmu89KKi8XYA3NH8DmOwOixVPoaXYVUGM2ge6IMOqwcqyBIbjBO4TYsU4': { name: '陈东', userName: 'sh_chendong00', areaCode: 'SHJCK01000' },
        'jNvmu89KKjkXYA2QRoOlY3GyxWnlZXwVRTxo17HSc6noIvDVZKrAd5jSrUXiUusyd2s=': { name: '陈荣敏', userName: 'sh_chenrongmin00', areaCode: 'SHJCK01000' },
        'jNvmos9aIz4ZYA2EToKlY3GyxWn8ZWwcQjJo16XacqnoIvDVZKrAd5jSrUXiUusyd2s=': { name: '朱光耀', userName: 'sh_zhuguangyao00', areaCode: 'SHJCK01000' },
        'jNvmsNJOKiwPawSFRoOlY3GyxWnueHgVUCRj3qTSc6noIvDVZKrAd5jSrUXiUusyd2s=': { name: '黄文新', userName: 'sh_huangwenxin00', areaCode: 'SHJCK01000' },
        'jNvmqMJBIzgdYFrNAp79DCykw1H1aHdLB2I0gHIdfi2dKqHIPTae4Lf': { name: '彭森', userName: 'sh_pengsen00', areaCode: 'SHJCK01000' },
        'jNvmv9JNLSVIPkeOR7LyJj6owwa2PCtIGiBu0bLcdfixPrCLPbM=': { name: '顾斌', userName: 'sh_gubin00', areaCode: 'SHJCK01000' },
        'jNvmrMZBIycRdwPNH8DmOwO1zFjhYXACXmM2ge6IMOqwcqyBIbjBO4TYsU4=': { name: '汤立伊', userName: 'sh_tangliyi00', areaCode: 'SHJCK01000' },
        'jNvmtM5XLSoXdwuTSN2lfi+p8lrvdXAaWCpn3ruLLajqIO+VIbjGcZ7UrAn5Eu01': { name: '李笑阳', userName: 'sh_lixiaoyang00', areaCode: 'SHJCK01000' },
        'jNvmr8ZBLj4WdAPNH8DmOwO2zFjseHcBXmM2ge6IMOqwcqyBIbjBO4TYsU4=': { name: '万峻子', userName: 'sh_wanjunzi00', areaCode: 'SHJCK01000' },
        'j9fmtNJWJSUIZwSaH924IziewUPbHcLXj1hgOyKL6r1YKqHJ77Ad5+Yt0nFQ==': { name: '陆燕萍', userName: 'pd_luyanping00', areaCode: 'SHJCK01014030' },
        'h9vmos9OKykRYA3NH8DtOwO7xVfpb3AVUGM2ge6IMOqwcqyBIbjBO4TYsU4=': { name: '赵兵', userName: 'xh_zhaobing00', areaCode: 'SHJCK01005' },
        'h9vmos9OKiwAew+QSoSlYnG5xWn8ZXgVUCtz1bHedKnpIvDVZKrAd5jSrUXiUusyd2s=': { name: '张雪梅', userName: 'xh_zhangxuemei01', areaCode: 'SHJCK01005' },
        'nN3mu9JGKCIAZwvNH8D2PQOi2FqZGESVmM2ge6IMOqwcqyBIbjBO4TYsU4=': { name: '崔莉霞', userName: 'cn_cuilixia ', areaCode: 'SHJCK01008' },
        'j8fmr8ZBIyYRYFrNAp3hDCugw1HrZHdLB2I0gHIdfi2dKqHIPTae4Lf': { name: '王敏', userName: 'pt_wangmin00', areaCode: 'SHJCK01006' },
        'j8fmu89KKicRYgPNH8DlJwOixVPoYXAXXmM2ge6IMOqwcqyBIbjBO4TYsU4=': { name: '陈莉丽', userName: 'pt_chenlili00', areaCode: 'SHJCK01006' },
        'l9jmos9AMToRe1rNAoX+DCapwkP3ZGxLB2I0gHIdfi2dKqHIPTae4Lf': { name: '周球', userName: 'hk_zhouqiu00', areaCode: 'SHJCK01001' },
        'hsPmtM5CLSVIPEeEX7L5OjGowwa0PCtIGiBu0bLcdfixPrCLPbM=': { name: '李旻', userName: 'yp_limin02', areaCode: 'SHJCK01003' },
        'l8Pmr8ZBIzwdZxOUH924Oyye2lfoam4eXipvgOyKL6r1YKqHJ77Ad5+Yt0nFQ==': { name: '王伟毅', userName: 'hp_wangweiyi00', areaCode: 'SHJCK01002' },
        'ldLmr9JeMSVIPkeXTrLiJi20wwa2PCtIGiBu0bLcdfixPrCLPbM=': { name: '吴群  ', userName: 'ja_wuqun00', areaCode: 'SHJCK01009' },
        'ldLmq89GPCIZYROcH924OT2e3l7vdXAaWCpngOyKL6r1YKqHJ77Ad5+Yt0nFQ==': { name: '史小娅', userName: 'ja_shixiaoya00', areaCode: 'SHJCK01009' },
        'ktvmoNJFLSoWZh+cH9+4PjSe1UPsZHgVXyZngO6KL6r1YKqHJ77Ad5+Yt0nFQ==': { name: '徐建华', userName: 'mh_xujianhua02 ', areaCode: 'SHJCK01012' },
        'ncDmtM5XLSoXfgOTSN2lfj6y8lrvdXAaWCNv3ruLLbSre6OILrHJf9vHqFDh': { name: '李晓平', userName: 'bs_lixiaoping', areaCode: 'SHJCK01011' },
        'ldfmqc5aLiIZYAaUToPyY2zsx1LZfHAOXTpn3rDSfPeILXe+qFZZ7Uq0PjHvBycWyYoA==': { name: '仇建良', userName: 'jd_qiujianliang00', areaCode: 'SHJCK01013' },
        'lcDmqMJGPCIXYA2MRoPyY2zsx0XZfXwSTzpp3rvKdPeILXe+qFZZ7Uq0PjHvBycWyYoA==': { name: '裴雄卿', userName: 'js_peixiongqing00 ', areaCode: 'SHJCK01010' },
        'jNnmtNJMLCoXdwuTSN2lfi+r8lrzbnEaWCpn3ruLLajqIO+VIbjGcZ7UrAn5Eu01': { name: '陆朝阳', userName: 'sj_luchaoyang00', areaCode: 'SHJCK01018' },
        'jsPmochaLiIZYAKITt2lfi2x8kpeHMSVj1uxb2LLajqIO+VIbjGcZ7UrAn5Eu01': { name: '尤建华', userName: 'qp_youjianhua00', areaCode: 'SHJCK01017' },
        'jsPmu89KKiUZYFrNApzlDD+pyFjobHdLB2I0gHIdfi2dKqHIPTae4Lf': { name: '陈楠', userName: 'qp_chennan00', areaCode: 'SHJCK01017' },
        'mcvmos9aLiIZYAeUQYqlY3Gn1Wn8ZWwRXjJo3bXVeqnoIvDVZKrAd5jSrUXiUusyd2s=': { name: '朱建明', userName: 'fx_zhujianming00', areaCode: 'SHJCK01015' },
        'nN7mtM5aLiIWaQiSH9y4MDGewVzZ3AVUDFpgO2KL6r1YKqHJ77Ad5+Yt0nFQ==': { name: '刘静波', userName: 'cm_liujingbo01', areaCode: 'SHJCK01019' }
      }
      const token = getQueryString('token')
      if (tokenList[token]) {
        this.$store.dispatch({ type: 'app/setUserName', amount: tokenList[token].name })
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
      window.open(`http://rmtj.justice.gov.cn/loginYJ.jsp?token=${getQueryString('token')}`)
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
