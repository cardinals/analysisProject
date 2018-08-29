<template>
  <div class="logonPerson_container">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解人员排名</span>
      <span class="span2">>人员画像</span>
    </div>
    <div class="top flexRow">
      <div class="left">
        <div class="title">登录统计信息
          <el-date-picker
            class="dateSelector"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini">
          </el-date-picker>
        </div>
        <div class="contents">
          <div class="cTop flexRow">
            <div class="cLeft">
              <div class="label">累计登录人次</div>
              <div class="con clearfix">
                <div class="number">12345678</div>
                <div class="unit">次</div>
              </div>
            </div>
            <div class="cRight">
              <div class="label">登录人数</div>
              <div class="con clearfix">
                <div class="number">12345</div>
                <div class="unit">人</div>
              </div>
            </div>
          </div>
          <div class="cBottom flexRow">
            <div class="cLeft">
              <div class="label">累计登录人数</div>
              <div class="con clearfix">
                <div class="number">4321</div>
                <div class="unit">人</div>
              </div>
            </div>
            <div class="cRight">
              <div class="line line1">
                <div class="quan"></div>
                <div class="dec">专职调解员</div>
                <div class="num">1234</div>
              </div>
              <div class="line line2">
                <div class="quan"></div>
                <div class="dec">兼职或其他</div>
                <div class="num">1234</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">今日登录人员
          <span class="titleRight">共:255人</span>
        </div>
        <div class="contents">
          <div class="table">
            <div class="tr">
              <div class="td td1">姓名</div>
              <div class="td td2">所属单位</div>
              <div class="td td3">今日首次登录时间</div>
              <div class="td td4">登录次数</div>
            </div>
            <div class="tr">
              <div class="td td1">小青龙</div>
              <div class="td td2">哈哈哈哈哈</div>
              <div class="td td3">8：30</div>
              <div class="td td4">3</div>
            </div>
            <div class="tr">
              <div class="td td1">小青</div>
              <div class="td td2">哈哈哈哈哈哈哈哈哈哈</div>
              <div class="td td3">8：30</div>
              <div class="td td4">3</div>
            </div>
            <div class="tr">
              <div class="td td1">小青龙</div>
              <div class="td td2">哈哈哈哈哈哈哈</div>
              <div class="td td3">8：30</div>
              <div class="td td4">3</div>
            </div>
            <div class="tr">
              <div class="td td1">小青龙</div>
              <div class="td td2">哈哈哈哈哈哈哈哈</div>
              <div class="td td3">8：30</div>
              <div class="td td4">3</div>
            </div>
            <div class="tr">
              <div class="td td1">小青龙</div>
              <div class="td td2">哈哈哈哈哈哈哈哈</div>
              <div class="td td3">8：30</div>
              <div class="td td4">3</div>
            </div>
          </div>
          <div class="pageCon">
            <el-pagination :current-page="1"
              :page-sizes="[10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        各区登录人次分析
        <el-date-picker
          class="dateSelector"
          v-model="date2"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini">
        </el-date-picker>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      date2: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.logonPerson_container{
  background: #EDEDED;
  .top{
    margin-bottom: 16px;
    height: 363px;
    .left{
      flex:545;
      margin-right: 16px;
      background: @block;
      .title{
        position: relative;
      }
      .dateSelector{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
      .cTop{
        height: 134px;
      }
      .cBottom{
        height: 150px;
      }
      .cLeft{
        flex: 3;
        margin-right: 80px;
      }
      .cRight{
        flex: 2.5;
        position: relative;
        .line{
          width: 100%;
          height: 20px;
          line-height: 20px;
          position: absolute;
          top: 50%;
          .quan{
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #1890FF;
            margin:6px 0;
            float: left;
          }
          .dec{
            font-size:@fontMiddle;
            line-height: 20px;
            height: 20px;
            float: left;
            margin-left: 12px;
            color:@black;
          }
          .num{
            font-size:@fontMiddle;
            line-height: 20px;
            height: 20px;
            float: right;
            color:@black;
          }
        }
        .line1{
           transform: translateY(-50%)
        }
        .line2{
          transform: translateY(70%);
          .quan{
            background: #4ECB72;
          }
        }
      }
      .con{
        position: relative;
      }
      .label{
        font-size: @fontMiddle;
        color:@black;
        display: block;
        padding: 27px 0;
      }
      .number{
        font-size: 49px;
        color:#000000;
        float: left;
        height: 50px;
        line-height: 50px;
      }
      .unit{
        position: absolute;
        font-size: @fontMiddle;
        color:#000000;
        right: 0px;
        bottom: 8px;
      }
    }
    .right{
      flex: 568;
      background: @block;
      .title{
        .titleRight{
          font-size: @fontBig;
          float: right;
        }
      }
      .table{
        height: 222px;
        padding-top: 16px;
        padding-bottom: 22px;
        .tr{
          height: 37px;
          color: @gray;
          font-size: @fontMiddle;
          &:nth-of-type(2n){
            background:#F2F2F2;
          }
          .td{
            float: left;
            height: 37px;
            line-height: 37px;
            text-align: center;
            box-sizing: border-box;
          }
          .td1{
            width: 17%;
            text-align: left;
            padding-left: 12px;
          }
          .td2{
            width: 43%;
            text-align: left;
          }
          .td3{
            width: 25%;
            text-align: left;
          }
          .td4{
            width: 15%;
            text-align: right;
            padding-right: 12px;
          }
        }
      }
      .pageCon{
        height: 51px;
      }
    }
  }
  .bottom{
    height: 642px;
    background: @block;
    .title{
      position: relative;
      .dateSelector{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

}
</style>
