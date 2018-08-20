/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-13 11:34:01
 * @Last Modified by:   wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-13 11:34:01
 */

<template>
  <div class="peopleDetail_container">
    <div class="nav">
      <span class="span1">调解队伍分析</span>
      <span class="span1">>调解人员排名</span>
      <span class="span2">>人员画像</span>
    </div>
    <div class="top">
      <div class="left">
        <div class="title">基本信息</div>
        <div class="contents">
          <div class="atTop clearfix">
            <div class="headImg"></div>
            <span class="name">石国清</span>
            <span class="year">10年</span>
            <span class="type">专业调节</span>
          </div>
          <div class="atBottom">
            <div class="once">工作职务：主任</div>
            <el-tooltip content="普陀区长风新村街道长风二村第一居民第一居民民第一居民第一居第一居民" placement="top">
              <div class="once">所属单位：普陀区长风新村街道长风二村第一居民第一居民民第一居民第一居第一居民</div>
            </el-tooltip>
            <div class="once">联系电话：133-1111-2222</div>
            <div class="once">任职方式：兼职</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">能力画像</div>
        <div class="contents flexRow">
          <div class="info">
            <div class="sTitle">
              <div class="border"></div>
              <span class="dis">综合能力指数</span>
              <i class="icon"></i>
            </div>
            <div class="number">6.4</div>
            <div class="others">
              <div class="once">
                <span class="span1">业务受理</span>
                <span class="span2">8.1</span>
              </div>
              <div class="border"></div>
              <div class="once">
                <span class="span1">工作质量</span>
                <span class="span2">8.1</span>
              </div>
              <div class="border"></div>
              <div class="once">
                <span class="span1">重大纠纷化解</span>
                <span class="span2">8.1</span>
              </div>
            </div>
          </div>
          <div class="chart"></div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="title">业务专长</div>
      <div class="contents flexRow">
        <div class="chart_round"></div>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">案件受理数量(其他)</div>
          </div>
          <div class="atMiddle">
            <span class="number">165</span>
            <span class="danwei">件</span>
          </div>
          <div class="chart"></div>
          <div class="atBottom">案件受理量优于99%的调解员</div>
        </div>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">调解成功率(其他)</div>
          </div>
          <div class="atMiddle">
            <span class="number">98.5%</span>
          </div>
          <div class="chart"></div>
          <div class="atBottom">调解成功率优于99%的调解员</div>
        </div>
        <div class="chart_other">
          <div class="sTitle">
            <div class="dis">平均调解时长(其他)</div>
          </div>
          <div class="atMiddle">
            <span class="number">1121</span>
            <span class="danwei">小时</span>
          </div>
          <div class="chart"></div>
          <div class="atBottom">平均调解时长优于99%的调解员</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">案件受理清单</div>
      <div class="contents">
        <div class="sTitle">
          <div class="border"></div>
          <span class="dis">案件清单</span>
        </div>
        <div class="table_container">
          <div class="atLeft">
            <div class="table">
              <div class="line head">
                <div class="td td1">案件名称</div>
                <div class="td td2">案件类型</div>
                <div class="td td3">处理状态</div>
                <div class="td td4">受理时间</div>
                <div class="td td5">结案时间</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg1">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg2">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg3">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg1">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg1">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
              <div class="line body">
                <div class="td td1">重桂英、刘金鹏之间的婚姻家庭争议纠纷重桂</div>
                <div class="td td2"><span class="bg1">婚姻家庭</span></div>
                <div class="td td3">调解成功</div>
                <div class="td td4">2018/7/28</div>
                <div class="td td5">2018/7/28</div>
              </div>
            </div>
            <div class="page"></div>
          </div>
          <div class="atRight flexColumn">
            <div class="once">
              <span class="span1">调解成功（交通事故）</span>
              <span class="span2">1716</span>
              <span class="span3">件</span>
            </div>
             <div class="once">
              <span class="span1">调解成功（交通事故）</span>
              <span class="span2">1716</span>
              <span class="span3">件</span>
            </div>
             <div class="once">
              <span class="span1">调解成功（交通事故）</span>
              <span class="span2">1716</span>
              <span class="span3">件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="center">
        <div class="span">帮助</div>
        <div class="span">隐私</div>
        <div class="span">条款</div>
        <div class="span2">copyright©2018 银江股份</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'peopleDetail'
}
</script>

<style lang="less" scoped>
@black:rgba(0,0,0,0.85);
@gray:rgba(0,0,0,0.65);
@graymore:rgba(0,0,0,0.45);
@block:#ffffff;
@titleHeight:52px;
@fontSmall:12px;
@fontMiddle:14px;
@fontBig:16px;
.peopleDetail_container{
  background: #EDEDED;
  .nav{
    position: relative;
    padding-bottom: 15px;
    span{
      font-size:@fontSmall;
    }
    .span1{
      color:@black;
    }
    .span2{
      color:@gray;
    }
  }
  .top{
    height: 271px;
    display: flex;
    .left{
      flex: 0.34;
      margin-right: 14px;
      background: @block;
      .atTop{
        display: block;
        height:55px;
        padding:15px 0 30px 0;
        width: 100%;
        .headImg{
          width: 45px;
          height: 55px;
          float: left;
          background-image: url('../assets/images/nan.png');
          background-position: top 0 center;
          background-repeat: no-repeat;
        }
        .name{
          font-size:32px;
          line-height: 55px;
          color:#000000;
          float: left;
          padding-left: 17px;
        }
        .year{
          font-size: @fontMiddle;
          float: left;
          margin: 14px 33px;
          padding:4px 5px;
          background:rgba(255,167,96,0.2);
          border-radius: 4px;
          color:#FE7300;
        }
        .type{
          font-size: @fontMiddle;
          float: left;
          margin: 14px 0px;
          padding:4px 5px;
          background:rgba(29,255,210,0.2);
          border-radius: 4px;
          color:#03DCC0;
        }
      }
      .atBottom{
        width: 100%;
        .once{
          width: 420px;
          height: 28px;
          line-height: 28px;
          font-size: @fontMiddle;
          color:@gray;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right{
      flex: 0.66;
      background: @block;
      .info{
        flex: 1;
        .sTitle{
          padding:23px 0;
        }
        .number{
          display: block;
          font-size:49px;
          color:black;
          font-weight: bold;
          padding-left: 13px;
        }
        .others{
          display: flex;
          height: 95px;
          .once{
            flex: 1;
            .span1{
              display: block;
              height: 50%;
              text-align: center;
              line-height: 65px;
              color:@gray;
              font-size:@fontMiddle;
            }
            .span2{
              display: block;
              height: 50%;
              text-align: center;
              line-height: 20px;
              color:@gray;
              font-size:@fontMiddle;
            }
          }
          .border{
            flex: 0;
            min-width:1px;
            height:25px;
            margin:35px 0;
            background:rgba(240,242,245,1);
            border-radius: 1px;
          }
        }
      }
      .chart{
        flex: 1.2;
      }
    }
  }
  .middle{
    height: 378px;
    background: @block;
    margin:14px 0;
    .chart_round{
      flex:1.3;
      margin:20px;
    }
    .chart_other{
      flex: 1;
      margin:48px 32px;
      .dis{
        color:@gray;
        padding-left: 0;
      }
      .atMiddle{
        height: 68px;
        position: relative;
        .number{
          font-size:34px;
          color:#000000;
          position: absolute;
          left: 0;
          bottom: 4px;
        }
        .danwei{
          font-size: @fontMiddle;
          color:@black;
          position: absolute;
          right: 0;
          bottom: 4px;
        }
      }
      .chart{
        height: 90px;
        box-sizing: border-box;
        border-bottom: 1px solid #EDEDED;
      }
      .atBottom{
        height: 50px;
        color:@gray;
        font-size: @fontMiddle;
        line-height: 40px;
      }
    }
  }
  .bottom{
    height:480px;
    background: @block;
    .sTitle{
      padding:19px 0;
    }
    .table_container{
      display: flex;
      height: 368px;
      .atLeft{
        flex: 8.5;
        margin-right: 50px;
        .table{
          height: 315px;
          width: 100%;
          .line{
            height: 45px;
            width: 100%;
            &:nth-child(2n){
              background: #F2F2F2;
            }
            .td{
              display: inline-block;
              line-height: 45px;
              font-size:@fontMiddle;
              text-align: center;
            }
            .td1{
              box-sizing: border-box;
              width: 40%;
              padding:0 4px;
              text-align: left;
            }
            .td2{
              width: 15%;
            }
            .td3{
              width: 15%;
            }
            .td4{
              width: 15%;
            }
            .td5{
              width: 15%;
            }
          }
          .head{
            .td{
              color:@black;
            }
          }
          .body{
            .td{
              color:@gray;
            }
            .td2{
              span{
                padding:4px 5px;
                border-radius: 2px;
              }
              .bg1{
                color:#4CCA72;
                background: rgba(77,203,115,0.2);
              }
              .bg2{
                color:#0787E8;
                background: rgba(24,144,255,0.2);
              }
              .bg3{
                color:#FAD02D;
                background: rgba(250,208,45,0.2);
              }
            }
          }
        }
        .page{
          height: 53px;
        }
      }
      .atRight{
        flex:1.5;
        padding-bottom: 53px;
        padding-right: 80px;
        .once{
          flex: 1;
          position: relative;
          .span1{
            font-size:@fontMiddle;
            color:@gray;
            padding:12px 4px;
            display: block;
          }
          .span2{
            position: absolute;
            font-size:34px;
            color:@black;
            left:4px;
            bottom: 10px;
          }
          .span3{
            position: absolute;
            font-size:@fontMiddle;
            color:@gray;
            right:4px;
            bottom: 13px;
          }
        }
      }
    }
  }
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
  .vertical_middle{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .title{
    padding:15px 12px;
    font-size: @fontBig;
    color:@black;
    border-bottom: 1px solid #EDEDED;
  }
  .sTitle{
    display: block;
    height: 22px;
    line-height: 22px;
    .border{
      width:2px;
      height:14px;
      margin:4px 0;
      background: #1890FF;
      border-radius: 1px;
      float: left;
    }
    .dis{
      font-size: @fontMiddle;
      float: left;
      padding-left: 8px;
    }
  }
  .contents{
    padding:0px 12px;
    position: relative;
    box-sizing: border-box;
    height: calc(100% - @titleHeight);
    width: 100%;
  }
  .flexRow{
    display: flex;
    flex-direction: row;
  }
  .flexColumn{
    display: flex;
    flex-direction: column;
  }
}
</style>
