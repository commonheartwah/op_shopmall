<template>
  <section>
    <el-row>
      <!-- 头部查询筛选 -->
      <el-col  class='toolbar' style='padding-bottom: 0px;'>
        <el-form :inline = "true">
          <el-form-item>
            <el-date-picker v-model="month" type="month" placeholder="选择月"></el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type='primary' @click.native='selectList'>筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 数据列表 -->
      <el-col :span="24">
        <el-table :data="finList" :default-expand-all='false' border style="width: 100%" v-loading="loading">
          <el-table-column prop="ds"     label="统计日期"   align="center" :formatter='formatTime' width="120"></el-table-column>
          <el-table-column prop="m0Id" label="M0Id"   align="center"></el-table-column>
          <el-table-column prop="m0WXNike" label="M0微信昵称" align="center" width="120"></el-table-column>
          <el-table-column prop="idCardName" label="姓名" align="center" width="120"></el-table-column>
          <el-table-column prop="idCardNo" label="身份证号" align="center" width="200"></el-table-column>
          <el-table-column prop="mobile" label="手机号" align="center" width="130"></el-table-column>
          <el-table-column prop="fissionItemCt" label="累计分销订单数" align="center" width="150"></el-table-column>
          <el-table-column prop="fissionItemPriceSum" label="累计分销订单总金额" align="center" :formatter='formatMoney1' width="180"></el-table-column>
          <el-table-column prop="earningSum" label="累计产生返现收益" align="center" :formatter='formatMoney2' width="165"></el-table-column>
          <el-table-column prop="drawableItemCt" label="累计可提现单数" align="center" width="160"></el-table-column>
          <el-table-column prop="drawableItemPriceSum" label="累计可提现订单总金额" align="center" :formatter='formatMoney3' width="200"></el-table-column>
          <el-table-column prop="beforTax" label="累计产生税前可提现总金额" align="center" :formatter='formatMoney4' width="210"></el-table-column>
          <el-table-column prop="tax" label="个税金额" align="center" :formatter='formatMoney5' width="160"></el-table-column>
          <el-table-column prop="afterTax" label="累计产生税后可提现金额" align="center" :formatter='formatMoney6' width="200"></el-table-column>
          <el-table-column prop="drawedCash" label="可提现金额" align="center" :formatter='formatMoney7' width="160"></el-table-column>
          <el-table-column prop="remainedCash" label="期初金额（历史遗留未提现金额）" align="center" :formatter='formatMoney8' width="250"></el-table-column>
          <el-table-column prop="drawableCash" label="剩余可实收金额" align="center" :formatter='formatMoney9' width="160"></el-table-column>
          <el-table-column label="操作" align="center" width="150" fixed="right">
            <template scope="scope">
                <el-button-group>
                  <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                </el-button-group>
            </template>
          </el-table-column>
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
import { fissionStatisticsFinMouth } from "../../api/api";
export default {
  data() {
    return {
      listPage: 1,
      totalCount: 0,
      month: "",
      finList: [],
      loading: false,
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
      if(row!=undefined&&row.fissionItemPriceSum!=undefined){
        return parseFloat(row.fissionItemPriceSum/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney2(row, column) {
      if(row!=undefined&&row.earningSum!=undefined){
        return parseFloat(row.earningSum/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney3(row, column) {
      if(row!=undefined&&row.drawableItemPriceSum!=undefined){
        return parseFloat(row.drawableItemPriceSum/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney4(row, column) {
      if(row!=undefined&&row.beforTax!=undefined){
        return parseFloat(row.beforTax/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney5(row, column) {
      if(row!=undefined&&row.tax!=undefined){
        return parseFloat(row.tax/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney6(row, column) {
      if(row!=undefined&&row.afterTax!=undefined){
        return parseFloat(row.afterTax/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney7(row, column) {
      if(row!=undefined&&row.drawedCash!=undefined){
        return parseFloat(row.drawedCash/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney8(row, column) {
      if(row!=undefined&&row.remainedCash!=undefined){
        return parseFloat(row.remainedCash/100).toLocaleString()
      }else{
        return ''
      }
    },
    formatMoney9(row, column) {
      if(row!=undefined&&row.drawableCash!=undefined){
        return parseFloat(row.drawableCash/100).toLocaleString()
      }else{
        return ''
      }
    },
    selectList() {
      this.loadOrderList(1);
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
    // 点击详情按钮跳转到详情页
    detailPage(index, row) {
      this.$router.push({
        path: "/FinanceReportDetail",
        query: {
          m0_id: row.m0Id
        }
      });
    },
    handleCurrentChange(page) {
      this.loadOrderList(page);
    },
    loadOrderList(firstPage) {
      let para = {
        page_index: firstPage || this.listPage,
        month: new Date(this.month).getTime() || ""
      };
      this.loading = true;
      fissionStatisticsFinMouth(para)
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
};
</script>
<style lang="less" scoped>
</style>
