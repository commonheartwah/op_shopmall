<template>
  <section>
    <el-row>
      <el-col :span="24" class="common">
        数据概况
      </el-col>
      <el-col :span="11" class="count">
        <el-col :span="24" class="header">截止到昨日</el-col>
        <el-col :span="5">
          M0用户数
          <el-col :span="24" class="num">
            {{leftM0Num}}
          </el-col>
        </el-col>
        <el-col :span="5">
          有订单M0用户数
          <el-col :span="24" class="num">
            {{leftM0OrderNum}}
          </el-col>
        </el-col>
         <el-col :span="5">
          分销订单数
          <el-col :span="24" class="num">
            {{leftDisOrderNum}}
          </el-col>
        </el-col>
         <el-col :span="4">
          M1用户数
          <el-col :span="24" class="num">
            {{leftM1Num}}
          </el-col>
        </el-col>
         <el-col :span="5">
          可提现订单数
          <el-col :span="24" class="num">
            {{leftDrawOrderNum}}
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="12" class="count">
        <el-col :span="24" class="header">昨日新增</el-col>
        <el-col :span="5">
          M0用户数
          <el-col :span="24" class="num">
            {{rightM0Num}}
          </el-col>
        </el-col>
        <el-col :span="5">
          有订单M0用户数
          <el-col :span="24" class="num">
            {{rightM0OrderNum}}
          </el-col>
        </el-col>
         <el-col :span="5">
          分销订单数
          <el-col :span="24" class="num">
            {{rightDisOrderNum}}
          </el-col>
        </el-col>
         <el-col :span="4">
          M1用户数
          <el-col :span="24" class="num">
            {{rightM1Num}}
          </el-col>
        </el-col>
         <el-col :span="5">
          可提现订单数
          <el-col :span="24" class="num">
            {{rightDrawOrderNum}}
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
        <el-table :data="mList" :default-expand-all='false' border style="width: 100%" v-loading="loading">
          <el-table-column prop="ds" label="日期"   align="center" :formatter='formatTime'></el-table-column>
          <el-table-column prop="m0Id" label="M0Id"   align="center"></el-table-column>
          <el-table-column prop="m0WxxNike" label="M0微信昵称" align="center"></el-table-column>
          <el-table-column prop="fissionOrderCt" label="分销单量" align="center"></el-table-column>
          <el-table-column prop="fissionOrderPriceSum" label="分销金额" align="center" :formatter='formatMoney1'></el-table-column>
          <el-table-column prop="returnCashSum" label="返现金额" align="center" :formatter='formatMoney2'></el-table-column>
          <el-table-column prop="drawableOrderCt" label="可提现单量" align="center"></el-table-column>

        </el-table>
        <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="handleCurrentChange" :current-page.sync="listPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
          </el-pagination>
        </el-col>
      </el-col>
    </el-row>
    
  </section>
</template>
<script>
import util from "../../common/js/util";
import { 
  fissionStatisticsM0M1
  } from "../../api/api";
export default {
  data() {
    return {
      timeRange: "",
      listPage: 1,
      totalCount: 0,
      timeRange: "",
      mList: [],
      loading: false,
      leftM0Num:0,
      leftM0OrderNum:0,
      leftDisOrderNum:0,
      leftM1Num:0,
      leftDrawOrderNum:0,
      rightM0Num:0,
      rightM0OrderNum:0,
      rightDisOrderNum:0,
      rightM1Num:0,
      rightDrawOrderNum:0,
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
    formatMoney1(row, column) {
      if(row!=undefined&&row.fissionOrderPriceSum!=undefined){
        return parseFloat(row.fissionOrderPriceSum/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney2(row, column) {
      if(row!=undefined&&row.returnCashSum!=undefined){
        return parseFloat(row.returnCashSum/100).toLocaleString()
      }else{
        return ''
      }
    },
    selectList() {
      this.loadOrderList(1);
    },
    handleCurrentChange(page) {
      this.loadOrderList(page);
    },
    loadOrderList(firstPage) {
      let para = {
        page_index: firstPage || this.listPage,
        start_date: new Date(this.timeRange[0]).getTime() || "",
        end_date: new Date(this.timeRange[1]).getTime() || ""
      };
      this.loading = true;
      fissionStatisticsM0M1(para)
        .then(res => {
          if (res.data.success) {
            let mList = res.data.data.items;
            this.listPage = res.data.data.page;
            this.totalCount = res.data.data.totalCount;
            this.mList = res.data.data.items;
          } else {
            this.mList = [];
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
    }
  },
  mounted() {
    this.loadOrderList(1);
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
