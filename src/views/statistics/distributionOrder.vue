<template>
  <section>
    <el-row>
      <el-col :span="24" class="common">
        订单概况
      </el-col>
      <el-col :span="11" class="count">
        <el-col :span="24" class="header">截止到昨日</el-col>
        <el-col :span="12">
          待发货
          <el-col :span="24" class="num">
            {{deliverGoodsNum}}
          </el-col>
        </el-col>
        <el-col :span="12">
          退款中
          <el-col :span="24" class="num">
            {{refundGoodsNum}}
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="12" class="count">
        <el-col :span="24" class="header">昨日一天数据</el-col>
        <el-col :span="8">
          昨日支付完成订单
          <el-col :span="24" class="num">
            {{yesPaySussOrder}}
          </el-col>
        </el-col>
        <el-col :span="8">
          昨日订单总金额
          <el-col :span="24" class="num">
            {{yesMoneyOrder}}
          </el-col>
        </el-col>
        <el-col :span="8">
          昨日退款中
          <el-col :span="24" class="num">
            {{yesRefundOrder}}
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="common">
        数据筛选
      </el-col>
      <!-- 头部查询筛选 -->
      <el-col  class='toolbar' style='padding-bottom: 0px;'>
        <el-form :inline = "true">
          <el-form-item>
              <el-date-picker v-model="timeRange" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type='primary' @click.native='selectList'>筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 数据列表 -->
      <el-col :span="24">
        <el-table :data="orderList" :default-expand-all='false' border style="width: 100%" v-loading="loading">
          <el-table-column prop="ds" label="日期"   align="center" :formatter='formatTime'></el-table-column>
          <el-table-column  label="订单数据"  align="center">
            <el-table-column prop="orderCt" label="下单笔数" align="center"></el-table-column>
            <el-table-column prop="payedOrderCt" label="支付完成订单数" align="center"></el-table-column>
            <el-table-column prop="saleGoodsTotalCt" label="商品总销量" align="center"></el-table-column>
            <el-table-column prop="orderTotalPaymentSum" label="订单总金额(实付金额)" align="center" width="180"></el-table-column>
            <el-table-column prop="sendingOrderCt" label="当天发货订单" align="center"></el-table-column>
            <el-table-column prop="refundingOrderCt" label="当天申请退款订单" align="center" width="180"></el-table-column>
            <el-table-column prop="refundedOrderCt" label="当天完成退款订单" align="center" width="180"></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="orderHandleCurrentChange" :current-page.sync="orderListPage" :page-size="20" layout="total, prev, pager, next" :total="orderTotalCount">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="common">
        数据趋势
      </el-col>
      <el-col :span="24">
        <div class="charts" >
            <div id="myChart" style="width:1000px;height:500px"></div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from "echarts";
import {
  orderStatisticsRefundList,
  orderStatisticsOrderSellList
} from "../../api/api";
import util from "../../common/js/util";
// 当前时间
let time = new Date().toLocaleDateString();
// 当前时间戳
let timeNowSecond = new Date(time).getTime();
let nowDate_7 = util.formatDate.format(new Date(time), "yyyy/MM/dd");
let nowDate_6 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 1),
  "yyyy/MM/dd"
);
let nowDate_5 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 2),
  "yyyy/MM/dd"
);
let nowDate_4 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 3),
  "yyyy/MM/dd"
);
let nowDate_3 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 4),
  "yyyy/MM/dd"
);
let nowDate_2 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 5),
  "yyyy/MM/dd"
);
let nowDate_1 = util.formatDate.format(
  new Date(timeNowSecond - 86400000 * 6),
  "yyyy/MM/dd"
);
export default {
  data() {
    return {
      loading: false,
      orderListPage: 0,
      orderTotalCount: 0,
      // 截止到昨日
      deliverGoodsNum: 0,
      refundGoodsNum: 0,
      // 昨日一天数据
      yesPaySussOrder: 0,
      yesMoneyOrder: 0,
      yesRefundOrder: 0,
      // 下单笔数
      placeOrderSum: [0, 0, 0, 0, 0, 0, 0],
      // 付款单数
      payOrderSum: [0, 0, 0, 0, 0, 0, 0],
      // 日期
      time: [
        nowDate_1,
        nowDate_2,
        nowDate_3,
        nowDate_4,
        nowDate_5,
        nowDate_6,
        nowDate_7
      ],
      timeRange: "",
      orderList: []
    };
  },
  methods: {
    // 时间转化
    formatTime(row, column) {
      let time = row.ds;
      if (time === 0) {
        return "/";
      }
      return util.formatDate.format(new Date(time), "yyyy/MM/dd");
    },
    selectList() {
      let para = {
        start_time: new Date(this.timeRange[0]).getTime() || "",
        end_time: new Date(this.timeRange[1]).getTime() || ""
      };
      this.loadOrderList(para);
    },
    orderHandleCurrentChange(page) {
      let para = {
        page_index: page,
        start_time: new Date(this.timeRange[0]).getTime() || "",
        end_time: new Date(this.timeRange[1]).getTime() || ""
      };
      this.loadOrderList(para);
    },
    loadOrderList(para) {
      this.loading = true;
      orderStatisticsOrderSellList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items;
            this.orderListPage = res.data.data.page;
            this.orderTotalCount = res.data.data.totalCount;
            this.orderList = res.data.data.items;
          } else {
            this.orderList = [];
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          if (error.response) {
            this.$notify({
              title: error.response.status,
              message: "网络请求错误",
              type: "error"
            });
          } else if (error.request) {
            this.$notify({
              title: error.request,
              message: "网络请求错误",
              type: "error"
            });
          } else {
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    loadOrderTop(para) {
      orderStatisticsRefundList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              this.deliverGoodsNum = res.data.data.items[0].waitSendingCt;
              this.refundGoodsNum = res.data.data.items[0].refundingCt;
            }
          } else {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          if (error.response) {
            this.$notify({
              title: error.response.status,
              message: "网络请求错误",
              type: "error"
            });
          } else if (error.request) {
            this.$notify({
              title: error.request,
              message: "网络请求错误",
              type: "error"
            });
          } else {
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    loadEchartData(para) {
      orderStatisticsOrderSellList(para)
        .then(res => {
          if (res.data.success) {
            for (let i = 0; i < 7; i++) {
              if (res.data.data.items[i] != undefined) {
                if (
                  res.data.data.items[i].ds != undefined &&
                  res.data.data.items[i].ds == timeNowSecond - 86400000 * i &&
                  res.data.data.items[i] != undefined
                ) {
                  this.placeOrderSum[6 - i] = res.data.data.items[i].orderCt;
                  this.payOrderSum[6 - i] = res.data.data.items[i].payedOrderCt;
                } else {
                  this.placeOrderSum[6 - i] = 0;
                  this.payOrderSum[6 - i] = 0;
                }
              } else {
                this.placeOrderSum[6 - i] = 0;
                this.payOrderSum[6 - i] = 0;
              }
              if (res.data.data.items[i] != undefined) {
                if (
                  res.data.data.items[i].ds != undefined &&
                  res.data.data.items[i].ds == timeNowSecond - 86400000 * 1 &&
                  res.data.data.items[i] != undefined
                ) {
                  this.yesPaySussOrder = res.data.data.items[i].payedOrderCt;
                  this.yesMoneyOrder =
                    res.data.data.items[i].orderTotalPaymentSum;
                  this.yesRefundOrder = res.data.data.items[i].refundingOrderCt;
                } else {
                  this.yesPaySussOrder = 0;
                  this.yesMoneyOrder = 0;
                  this.yesRefundOrder = 0;
                }
              } else {
                this.yesPaySussOrder = 0;
                this.yesMoneyOrder = 0;
                this.yesRefundOrder = 0;
              }
            }
            let echarts = require("echarts/lib/echarts"); // 引入基本模板，如果在项目中对体积要求比较苛刻，也可以只按需引入需要的模块(可以按需引入的模块列表见见本博客底部)
            // 例如：引入柱状图
            //require('echarts/lib/chart/bar');
            let chartBox = document.getElementsByClassName("charts")[0];
            let myChart = document.getElementById("myChart");
            function resizeCharts() {
              //为调整图标尺寸的方法
              myChart.style.width = chartBox.style.width + "px";
              myChart.style.height = chartBox.style.height + "px";
            }
            let mainChart = echarts.init(myChart); // 基于准备好的dom，初始化echarts实例
            var option = null;
            // 指定图表的配置项和数据
            option = {
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["下单笔数", "付款订单"]
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: {
                    show: true,
                    type: ["line", "bar", "stack", "tiled"]
                  },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: this.time
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: [
                {
                  name: "下单笔数",
                  type: "line",
                  stack: "总量",
                  data: this.placeOrderSum
                },
                {
                  name: "付款订单",
                  type: "line",
                  stack: "总量",
                  data: this.payOrderSum
                }
              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            if (option && typeof option === "object") {
              mainChart.setOption(option, true);
            }
          } else {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          if (error.response) {
            this.$notify({
              title: error.response.status,
              message: "网络请求错误",
              type: "error"
            });
          } else if (error.request) {
            this.$notify({
              title: error.request,
              message: "网络请求错误",
              type: "error"
            });
          } else {
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    }
  },
  mounted() {
    let para = {
      page_index: 1
    };
    let para1 = {
      start_time: timeNowSecond - 86400000 * 1,
      end_time: timeNowSecond - 86400000 * 0
    };
    this.loadOrderList(para);
    this.loadOrderTop(para1);
    this.loadEchartData(para);
  }
};
</script>
<style lang="less" scoped>
.common {
  width: 100%;
  margin: 10px 0;
  background-color: #ccc;
  font-weight: 700;
}
.count {
  text-align: center;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 5px;
  padding: 5px;
}
.header {
  font-weight: 700;
  font-size: 18px;
  margin: 5px 0;
}
.num {
  font-size: 24px;
  color: #36b3b3;
}
</style>
