<template>
  <section>
    <el-row>
      <el-col :span="24" class="common">
        商品概况
      </el-col>

      <el-col :span="12" class="count">
        <el-col :span="24" class="header">昨日一天数据</el-col>
        <el-col :span="12">
          商品总销量 
          <el-col :span="24" class="num">
            {{yesPaySussOrder}}
          </el-col>
        </el-col>
        <el-col :span="12">
          销售商品SKU种类
          <el-col :span="24" class="num">
            {{yesMoneyOrder}}
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
          <el-table-column  label="商品数据"  align="center">
            <el-table-column prop="code" label="商品Code" align="center"></el-table-column>
            <el-table-column prop="skuName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="saleTotalCt" label="商品销量" align="center"></el-table-column>
          </el-table-column>
        </el-table>
        <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="orderHandleCurrentChange" :current-page.sync="orderListPage" :page-size="20" layout="total, prev, pager, next" :total="orderTotalCount">
        </el-pagination>
      </el-col>
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
import util from "../../common/js/util";
import {
  orderStatisticsOrderItemSellList,
  orderStatisticsOrderSellList
} from "../../api/api";
let time = new Date().toLocaleDateString();
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
      // 昨日一天数据
      yesPaySussOrder: 44,
      yesMoneyOrder: 44444,
      // 商品总销量
      goodsASum: [0, 0, 0, 0, 0, 0, 0],
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
      orderStatisticsOrderItemSellList(para)
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
    loadEchartData7(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[6] += res.data.data.items[i].saleTotalCt;
              }
            }
          } else {
            this.orderList = [];
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
    loadEchartData6(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[5] += res.data.data.items[i].saleTotalCt;
              }
            }
            this.yesPaySussOrder = this.goodsASum[5];
            this.yesMoneyOrder = res.data.data.items.length;
          } else {
            this.orderList = [];
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
    loadEchartData5(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[4] += res.data.data.items[i].saleTotalCt;
              }
            }
          } else {
            this.orderList = [];
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
    loadEchartData4(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[3] += res.data.data.items[i].saleTotalCt;
              }
            }
          } else {
            this.orderList = [];
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
    loadEchartData3(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[2] += res.data.data.items[i].saleTotalCt;
              }
            }
          } else {
            this.orderList = [];
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
    loadEchartData2(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[1] += res.data.data.items[i].saleTotalCt;
              }
            }
          } else {
            this.orderList = [];
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
    loadEchartData1(para) {
      orderStatisticsOrderItemSellList(para)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              for (var i = 0; i < res.data.data.items.length; i++) {
                this.goodsASum[0] += res.data.data.items[i].saleTotalCt;
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
                data: ["商品总销量"]
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
                  name: "商品总销量",
                  type: "line",
                  stack: "总量",
                  data: this.goodsASum
                }
              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            if (option && typeof option === "object") {
              mainChart.setOption(option, true);
            }
          } else {
            this.orderList = [];
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
  mounted(options) {
    let para = {
      page_index: 1
    };
    // 周日数据
    let para7 = {
      start_time: timeNowSecond,
      end_time: timeNowSecond + 86400000 
    };
    //周六数据
    let para6 = {
      start_time: timeNowSecond - 86400000 * 1,
      end_time: timeNowSecond - 86400000 * 0
    };
    let para5 = {
      start_time: timeNowSecond - 86400000 * 2,
      end_time: timeNowSecond - 86400000 * 1
    };
    let para4 = {
      start_time: timeNowSecond - 86400000 * 3,
      end_time: timeNowSecond - 86400000 * 2
    };
    let para3 = {
      start_time: timeNowSecond - 86400000 * 4,
      end_time: timeNowSecond - 86400000 * 3
    };
    let para2 = {
      start_time: timeNowSecond - 86400000 * 5,
      end_time: timeNowSecond - 86400000 * 4
    };
    let para1 = {
      start_time: timeNowSecond - 86400000 * 6,
      end_time: timeNowSecond - 86400000 * 5
    };
    this.loadOrderList(para);
    this.loadEchartData7(para7);
    this.loadEchartData6(para6);
    this.loadEchartData5(para5);
    this.loadEchartData4(para4);
    this.loadEchartData3(para3);
    this.loadEchartData2(para2);
    this.loadEchartData1(para1);
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
