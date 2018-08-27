/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-27 14:03:38
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-27 15:13:06
 */

<template>
  <div class="home">
    <div class="nav">
      <span class="span1">首页</span>
      <el-select v-model="area" placeholder="请选择区域" size="mini" class="areaSelector">
        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="block flexRow">
      <div class="left">
        <div class="title">基本信息</div>
        <div class="contents"></div>
      </div>
      <div class="right flexColumn">
        <div class="block-r1">
          <div class="title">纠纷类型</div>
          <div class="contents ul">
            <div class="li" v-for="(item,index) in [{ name: '调解成功', value: 0.8 },{ name: '调解失败', value: 1 - 0.8 }]" :key="index">
              <span class="sort">{{index+1}}</span>
              <span class="name">{{item.name}}</span>
              <span class="number">{{item.value | numFormat}}</span>
            </div>
          </div>
        </div>
        <div class="block-r2">
          <div class="title">业务处理</div>
          <g2-pie class="contents" :id="'pie1'" :height="210" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '调解成功', value: 0.8 },{ name: '调解失败', value: 1 - 0.8 }]"></g2-pie>
        </div>
        <div class="block-r3">
          <div class="title">系统应用</div>
          <g2-pie class="contents" :id="'pie2'" :height="228" :colorMap="['#1890FF', '#E9E9E9']" :data="[{ name: '登录占比', value: 0.8 },{ name: '未登录占比', value: 1 - 0.8 }]"></g2-pie>
          <!-- <g2-liquidfill class="contents" :id="'liquidfill'" :height="228"></g2-liquidfill> -->
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import {area} from '@/utils/dictionaryMapping'
export default {
  name: 'home',
  data () {
    return {
      areaOptions: area,
      area: 'SHJCK01000'
    }
  },
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/common.less';
  .home {
    background: #EDEDED;
    .block {
      height: 880px;
      .left {
        flex: 847;
        background: @block;
      }
      .right {
        margin-left: 16px;
        flex: 266;
        .block-r1 {
          flex: 248;
          background: @block;
          .ul {
            width: 100%;
            overflow: hidden;
            padding-top: 20px;
            height: 238px;
            &:hover {
              overflow-y: auto;
            }
            .li {
              height: 33px;
              display: block;
              &:hover {
                cursor: pointer;
              }
              .sort {
                float: left;
                width: 19px;
                height: 19px;
                font-size: @fontMiddle;
                color: #314659;
                background: #F0F2F5;
                border-radius: 50%;
                text-align: center;
                line-height: 19px;
                margin: 7px 22px 7px 0;
              }
              .name {
                float: left;
                height: 33px;
                font-size: @fontMiddle;
                color: @gray;
                line-height: 33px;
                width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .number {
                float: right;
                height: 33px;
                font-size: @fontMiddle;
                color: @gray;
                line-height: 33px;
                margin-right: 22px;
              }
              &:nth-child(1) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
              &:nth-child(2) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
              &:nth-child(3) {
                .sort {
                  background: #314659;
                  color: white;
                }
              }
            }
          }
        }
        .block-r2 {
          flex: 262;
          margin-top: 16px;
          background: @block;
        }
        .block-r3 {
          flex: 265;
          margin-top: 16px;
          background: @block;
        }
      }
    }
  }
</style>
