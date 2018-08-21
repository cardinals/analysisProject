/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-21 11:13:50
 * @Last Modified by:   wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 11:13:50
 */

<template>
  <div class="footer">
    <div class="center">
      <div class="span">帮助</div>
      <div class="span">隐私</div>
      <div class="span">条款</div>
      <div class="span2">copyright©2018 银江股份</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
// 底部公司信息
.footer{
  height: 120px;
  width: 100%;
  position: relative;
  .center{
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%,-50%);
    .span{
      font-size: @fontSmall;
      color:#6E6E6E;
      display: inline-block;
      padding:0 26px;
      cursor: pointer;
      &:nth-child(2){
        border-left:1px solid #6E6E6E;
        border-right:1px solid #6E6E6E;
      }
    }
    .span2{
      font-size: @fontSmall;
      color:#6E6E6E;
      text-align: center;
      margin-top: 8px;
    }
  }
}
</style>
