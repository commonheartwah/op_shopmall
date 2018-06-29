<template>
  <section>
    <el-row>
      <!-- 数据列表 -->
      <el-col :span="24">
        <el-table :data="finList" :default-expand-all='false' border style="width: 100%" v-loading="loading">
          <el-table-column prop="ds"     label="统计日期"   align="center" :formatter='formatTime' width="120"></el-table-column>
          <el-table-column prop="m0Id" label="M0id"   align="center"></el-table-column>
          <el-table-column prop="m0WxNike" label="M0微信昵称" align="center"></el-table-column>
          <el-table-column prop="idCardName" label="分销者姓名" align="center"></el-table-column>
          <el-table-column prop="orderId" label="订单号（内部）" align="center"></el-table-column>
          <el-table-column prop="orderItemPrice" label="订单金额" align="center" :formatter='formatMoney1'></el-table-column>
          <el-table-column prop="skuName" label="产品名称" align="center"></el-table-column>
          <el-table-column prop="retuenCash" label="返现金额" align="center" :formatter='formatMoney2'></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" align="center"></el-table-column>
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
// 引入工具包
import util from "../../common/js/util";
// axios
import { 
  fissionStatisticsSettleDetail
  } from "../../api/api";
export default {
  data() {
    return {
      listPage:1,
      totalCount:0,
      month:'',
      finList: [],
      loading: false,
    };
  },
  methods:{
    formatMoney1(row, column) {
      if(row!=undefined&&row.orderItemPrice!=undefined){
        return parseFloat(row.orderItemPrice/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney2(row, column) {
      if(row!=undefined&&row.retuenCash!=undefined){
        return parseFloat(row.retuenCash/100).toLocaleString()
      }else{
        return ''
      }
    },
    // 时间转化
    formatTime(row, column) {
      let time = row.ds;
      if (time === 0) {
        return "/";
      }
      return util.formatDate.format(new Date(time), "yyyy/MM/dd");
    },
    // 金钱转换
    formatMoney(row, column) {
      let property = column.property.split(".");
      let money = row[property[0]][property[1]];
      if (money === 0) {
        return "/";
      }
      return money / 100 + "元";
    },
    handleCurrentChange(){
      this.loadOrderList(page);
    },
    loadOrderList(firstPage) {
      let para = {
        page_index: firstPage || this.listPage,
        m0_id: this.$route.query.m0_id
      };
      this.loading = true;
      fissionStatisticsSettleDetail(para)
        .then(res => {
          if (res.data.success) {
            let finList = res.data.data.items;
            this.listPage = res.data.data.page;
            this.totalCount = res.data.data.totalCount;
            this.finList = res.data.data.items;
          } else {
            this.finList = [];
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
}
</script>
<style lang="less" scoped>

</style>
