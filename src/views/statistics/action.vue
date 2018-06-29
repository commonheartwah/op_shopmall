<template>
  <section>
    <!-- 头部查询筛选 -->
    <el-row>
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
    </el-row>

    <!-- <div style="margin: 15px 0;"></div>
    <el-checkbox  v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox v-model="checkModelSelect.payIndexUV" @change="handlePayIndexUV" style="width:135px;">首页Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payIndexPV" @change="handlePayIndexPV" style="width:135px;">首页Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payRight" @change="handPayRight" style="width:135px;">获取授权数</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payOrderBtnUv" @change="handPayOrderBtnUv" style="width:135px;">下单按钮点击Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payOrderBtnPv" @change="handPayOrderBtnPv" style="width:135px;">下单按钮点击Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payAddressPageUv" @change="handPayAddressPageUv" style="width:135px;">地址页面访问Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payAddressPagePv" @change="handPayAddressPagePv" style="width:135px;">地址页面访问Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payAddressSubmitBtnUv" @change="handPayAddressSubmitBtnUv" style="width:135px;">地址提交按钮Uv</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox v-model="checkModelSelect.payAddressSubmitBtnPv" @change="handPayAddressSubmitBtnPv" style="width:135px;">地址提交按钮Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payOrderBalanceUv" @change="handPayOrderBalanceUv" style="width:135px;">订单结算页Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payOrderBalancePv" @change="handPayOrderBalancePv" style="width:135px;">订单结算页Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payPaymentBtnClickUv" @change="handPayPaymentBtnClickUv" style="width:135px;">支付按钮点击Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payPaymentBtnClickPv" @change="handPayPaymentBtnClickPv" style="width:135px;">支付按钮点击Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payPaymentSuccessSum" @change="handPayPaymentSuccessSum" style="width:135px;">支付成功数</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payTab02Uv" @change="handPayTab02Uv" style="width:135px;">tab0-2Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payTab02Pv" @change="handPayTab02Pv" style="width:135px;">tab0-2Pv</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox v-model="checkModelSelect.payTab24Uv" @change="handPayTab24Uv" style="width:135px;">tab2-4Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payTab24Pv" @change="handPayTab24Pv" style="width:135px;">tab2-4Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payTab46Uv" @change="handPayTab46Uv" style="width:135px;">tab4-6Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.payTab46Pv" @change="handPayTab46Pv" style="width:135px;">tab4-6Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.distributionIndexBtnUv" @change="handPistributionIndexBtnUv" style="width:135px;">首页分销按钮Uv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.distributionIndexBtnPv" @change="handPistributionIndexBtnPv" style="width:135px;">首页分销按钮Pv</el-checkbox>
    <el-checkbox v-model="checkModelSelect.distributionPosterUserNum" @change="handPistributionPosterUserNum" style="width:135px;">生成海报用户数</el-checkbox>
    <el-checkbox v-model="checkModelSelect.distributionAlonePage" @change="handPistributionAlonePage" style="width:135px;">有访问独立页面数量</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox v-model="checkModelSelect.distributionDealPage" @change="handPistributionDealPag" style="width:135px;">有交易独立页面数量</el-checkbox> -->
    <!-- <el-row> -->
      <!-- <el-col :span="24" class="common">
        转化路径-购买
      </el-col> -->
      <!-- <el-col :span="24"> -->
        <!-- <el-table :data="tableData3" :default-expand-all='false' border style="width: 100%" >
          <el-table-column label="转化路径-购买" align="center"  >
            <el-table-column prop="entity.id"     label="首页Uv"   align="center"></el-table-column>
            <el-table-column prop="entity.status" label="首页Pv"  align="center"></el-table-column>
            <el-table-column prop="entity.status" label="获取授权数"  align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="下单按钮点击Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="下单按钮点击Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="地址页面访问Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="地址页面访问Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="地址提交按钮Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="地址提交按钮Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="订单结算页 Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="订单结算页 Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="支付按钮点击 Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="支付按钮点击 Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="支付成功数" align="center"></el-table-column>
            <el-table-column prop="entity.money"  label="tab0-2 Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="tab0-2 Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="tab2-4 Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="tab2-4 Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="tab4-6 Uv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="tab4-6 Pv" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="转化路径-分销" align="center">
            <el-table-column prop="entity.id"     label="首页分销按钮Uv"   align="center"></el-table-column>
            <el-table-column prop="entity.status" label="首页分销按钮Pv" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="生成海报用户数" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="有访问独立页面数量" align="center"></el-table-column>
            <el-table-column prop="entity.zhushi" label="有交易独立页面数量" align="center"></el-table-column>
          </el-table-column>
        </el-table> -->
        <!-- <table class="table">
          <thead class="th">
            <td class="td" v-show="checkShowHiddenFlag.payIndexUVFlag==1">首页Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payIndexPVFlag==1">首页Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payRightFlag==1">获取授权数</td>
            <td class="td" v-show="checkShowHiddenFlag.payOrderBtnUvFlag==1">下单按钮点击Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payOrderBtnPvFlag==1">下单按钮点击Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payAddressPageUvFlag==1">地址页面访问Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payAddressPagePvFlag==1">地址页面访问Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payAddressSubmitBtnUvFlag==1">地址提交按钮Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payAddressSubmitBtnPvFlag==1">地址提交按钮Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payOrderBalanceUvFlag==1">订单结算页Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payOrderBalancePvFlag==1">订单结算页Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payPaymentBtnClickUvFlag==1">支付按钮点击Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payPaymentBtnClickPvFlag==1">支付按钮点击Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payPaymentSuccessSumFlag==1">支支付成功数</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab02UvFlag==1">tab0-2Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab02PvFlag==1">tab0-2Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab24UvFlag==1">tab2-4Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab24PvFlag==1">tab2-4Pv</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab46UvFlag==1">tab4-6Uv</td>
            <td class="td" v-show="checkShowHiddenFlag.payTab46PvFlag==1">tab4-6Pv</td>
          </thead>
          <tbody>
            <tr v-for="item in actionList">
              <td class="td" v-show='checkShowHiddenFlag.payIndexUVFlag==1'>{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payIndexPVFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payRightFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payOrderBtnUvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payOrderBtnPvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payAddressPageUvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payAddressPagePvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payAddressSubmitBtnUvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payAddressSubmitBtnPvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payOrderBalanceUvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payOrderBalancePvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payPaymentBtnClickUvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payPaymentBtnClickPvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payPaymentSuccessSumFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab02UvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab02PvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab24UvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab24PvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab46UvFlag==1">{{item.entity.id}}</td>
              <td class="td" v-show="checkShowHiddenFlag.payTab46PvFlag==1">{{item.entity.id}}</td>
            </tr>
          </tbody>
        </table> -->
      <!-- </el-col> -->

    <!-- </el-row> -->
    <el-row>
      <!-- <el-col :span="24" class="common">
        转化路径-分销
      </el-col> -->
      <el-col :span="24">
         <el-table :data="actionList" :default-expand-all='false' border style="width: 100%" v-loading="loading">
          <el-table-column prop="ds"     label="统计日期"   align="center" :formatter='formatTime'></el-table-column>
          <el-table-column prop="pageActive" label="行为" align="center" :formatter='formatAction'></el-table-column>
          <el-table-column prop="pagePath" label="页面路径" align="center"></el-table-column>
          <el-table-column prop="pv" label="页面访问量" align="center"></el-table-column>
          <el-table-column prop="uv" label="用户访问量" align="center"></el-table-column>
        </el-table>
      </el-col>
      <!-- <table class="table1">
        <thead class="th">
          <td class="td" v-show="checkShowHiddenFlag.distributionIndexBtnUvFlag==1">首页分销按钮Uv</td>
          <td class="td" v-show="checkShowHiddenFlag.distributionIndexBtnPvFlag==1">首页分销按钮Pv</td>
          <td class="td" v-show="checkShowHiddenFlag.distributionPosterUserNumFlag==1">生成海报用户数</td>
          <td class="td" v-show="checkShowHiddenFlag.distributionAlonePageFlag==1">有访问独立页面数量</td>
          <td class="td" v-show="checkShowHiddenFlag.distributionDealPageFlag==1">有交易独立页面数量</td>
        </thead>
        <tbody>
          <tr v-for="item in actionList">
            <td class="td" v-show="checkShowHiddenFlag.distributionIndexBtnUvFlag==1">{{item.entity.sum}}</td>
            <td class="td" v-show="checkShowHiddenFlag.distributionIndexBtnPvFlag==1">{{item.entity.id}}</td>
            <td class="td" v-show="checkShowHiddenFlag.distributionPosterUserNumFlag==1">{{item.entity.id}}</td>
            <td class="td" v-show="checkShowHiddenFlag.distributionAlonePageFlag==1">{{item.entity.id}}</td>
            <td class="td" v-show="checkShowHiddenFlag.distributionDealPageFlag==1">{{item.entity.id}}</td>
          </tr>
        </tbody>
      </table> -->
      <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="handleCurrentChange" :current-page.sync="listPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import util from "../../common/js/util";
import { 
  fissionStatisticsPageView
  } from "../../api/api";
export default {
  data() {
    return {
      listPage: 1,
      totalCount: 0,
      timeRange: "",
      // 多选框 v-model 初始化
      checkModelSelect: {
        // 购买相关
        // 首页
        payIndexUV: true,
        payIndexPV: true,
        // 获取授权数
        payRight: true,
        // 下单按钮点击
        payOrderBtnUv: true,
        payOrderBtnPv: true,
        // 地址页面访问
        payAddressPageUv: true,
        payAddressPagePv: true,
        // 地址提交按钮
        payAddressSubmitBtnUv: true,
        payAddressSubmitBtnPv: true,
        // 订单结算页
        payOrderBalanceUv: true,
        payOrderBalancePv: true,
        // 支付按钮点击
        payPaymentBtnClickUv: true,
        payPaymentBtnClickPv: true,
        // 支付成功数
        payPaymentSuccessSum: true,
        // tab0-2
        payTab02Uv: true,
        payTab02Pv: true,
        // tab2-4
        payTab24Uv: true,
        payTab24Pv: true,
        // tab4-6
        payTab46Uv: true,
        payTab46Pv: true,
        // 分销相关
        // 首页分销按钮
        distributionIndexBtnUv: true,
        distributionIndexBtnPv: true,
        // 生成海报用户数
        distributionPosterUserNum: true,
        // 有访问独立页面数量
        distributionAlonePage: true,
        // 有交易独立页面数量
        distributionDealPage: true
      },
      // 表格列数显示与隐藏控制标记初始化
      checkShowHiddenFlag: {
        // 购买相关
        // 首页
        payIndexUVFlag: 1,
        payIndexPVFlag: 1,
        // 获取授权数
        payRightFlag: 1,
        // 下单按钮点击
        payOrderBtnUvFlag: 1,
        payOrderBtnPvFlag: 1,
        // 地址页面访问
        payAddressPageUvFlag: 1,
        payAddressPagePvFlag: 1,
        // 地址提交按钮
        payAddressSubmitBtnUvFlag: 1,
        payAddressSubmitBtnPvFlag: 1,
        // 订单结算页
        payOrderBalanceUvFlag: 1,
        payOrderBalancePvFlag: 1,
        // 支付按钮点击
        payPaymentBtnClickUvFlag: 1,
        payPaymentBtnClickPvFlag: 1,
        // 支付成功数
        payPaymentSuccessSumFlag: 1,
        // tab0-2
        payTab02UvFlag: 1,
        payTab02PvFlag: 1,
        // tab2-4
        payTab24UvFlag: 1,
        payTab24PvFlag: 1,
        // tab4-6
        payTab46UvFlag: 1,
        payTab46PvFlag: 1,
        // 分销相关
        // 首页分销按钮
        distributionIndexBtnUvFlag: 1,
        distributionIndexBtnPvFlag: 1,
        // 生成海报用户数
        distributionPosterUserNumFlag: 1,
        // 有访问独立页面数量
        distributionAlonePageFlag: 1,
        // 有交易独立页面数量
        distributionDealPageFlag: 1
      },
      actionList: [],
      checkAll: true,
      checkIndexPv: true,
      checkIndexUv: true,
      isIndeterminate: true,
      loading: false,
    };
  },
  methods: {
    // 页面行为
    formatAction(row, column){
      let action = row.pageActive;
      if(action==''||action==0){
        return ''
      }else if(action=='index_page_stat'){
        return '首页访问'
      }else if(action=='index_get_authorization'){
        return '获取授权数'
      }else if(action=='index_buybtn_click'){
        return '下单按钮点击'
      }else if(action=='address_page_stat'){
        return '地址页面访问'
      }else if(action=='address_nextbtn_click'){
        return '地址提交按钮'
      }else if(action=='pay_page_stat'){
        return '订单结算页'
      }else if(action=='pay_paybtn_click'){
        return '支付按钮点击'
      }else if(action=='pay_pay_success'){
        return '支付成功数'
      }else if(action=='index_tab02_click'){
        return 'tab0-2'
      }else if(action=='index_tab24_click'){
        return 'tab2-4'
      }else if(action=='index_tab46_click'){
        return 'tab4-6'
      }else if(action=='index_fissionbtn_click'){
        return '首页分销按钮'
      }else if(action=='orderDetail_fissionbtn_click'){
        return '订单详情页邀请好友按钮'
      }else if(action=='index_page_m0_stat'){
        return '有访问独立页面'
      }else if(action=='fission_create_qrcode'){
        return '生成海报用户数'
      }else if(action=='pay_page_m0_stat'){
        return '有交易独立页面'
      }else {
        return '未知行为名'
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
    handleCurrentChange(page) {
      this.loadOrderList(page);
    },
    selectList() {
      this.loadOrderList(1);
    },
    loadOrderList(firstPage) {
      let para = {
        page_index: firstPage || this.listPage,
        start_date: new Date(this.timeRange[0]).getTime() || "",
        end_date: new Date(this.timeRange[1]).getTime() || ""
      };
      this.loading = true;
      fissionStatisticsPageView(para)
        .then(res => {
          if (res.data.success) {
            let actionList = res.data.data.items;
            this.listPage = res.data.data.page;
            this.totalCount = res.data.data.totalCount;
            this.actionList = res.data.data.items;
          } else {
            this.actionList = [];
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
    handleCheckAllChange(val) {
      if (this.checkAll == true) {
        this.a = 1;
        this.b = 1;
        this.checkIndexPv = false;
        this.checkIndexUv = true;
        // 购买相关
        // 首页
        this.checkModelSelect.payIndexUV = true;
        this.checkModelSelect.payIndexPV = true;
        // 获取授权数
        this.checkModelSelect.payRight = true;
        // 下单按钮点击
        this.checkModelSelect.payOrderBtnUv = true;
        this.checkModelSelect.payOrderBtnPv = true;
        // 地址页面访问
        this.checkModelSelect.payAddressPageUv = true;
        this.checkModelSelect.payAddressPagePv = true;
        // 地址提交按钮
        this.checkModelSelect.payAddressSubmitBtnUv = true;
        this.checkModelSelect.payAddressSubmitBtnPv = true;
        // 订单结算页
        this.checkModelSelect.payOrderBalanceUv = true;
        this.checkModelSelect.payOrderBalancePv = true;
        // 支付按钮点击
        this.checkModelSelect.payPaymentBtnClickUv = true;
        this.checkModelSelect.payPaymentBtnClickPv = true;
        // 支付成功数
        this.checkModelSelect.payPaymentSuccessSum = true;
        // tab0-2
        this.checkModelSelect.payTab02Uv = true;
        this.checkModelSelect.payTab02Pv = true;
        // tab2-4
        this.checkModelSelect.payTab24Uv = true;
        this.checkModelSelect.payTab24Pv = true;
        // tab4-6
        this.checkModelSelect.payTab46Uv = true;
        this.checkModelSelect.payTab46Pv = true;
        // 分销相关
        // 首页分销按钮
        this.checkModelSelect.distributionIndexBtnUv = true;
        this.checkModelSelect.distributionIndexBtnPv = true;
        // 生成海报用户数
        this.checkModelSelect.distributionPosterUserNum = true;
        // 有访问独立页面数量
        this.checkModelSelect.distributionAlonePage = true;
        // 有交易独立页面数量
        this.checkModelSelect.distributionDealPage = true;

        // 购买相关
        // 首页
        this.checkShowHiddenFlag.payIndexUVFlag = 1;
        this.checkShowHiddenFlag.payIndexPVFlag = 1;
        // 获取授权数
        this.checkShowHiddenFlag.payRightFlag = 1;
        // 下单按钮点击
        this.checkShowHiddenFlag.payOrderBtnUvFlag = 1;
        this.checkShowHiddenFlag.payOrderBtnPvFlag = 1;
        // 地址页面访问
        this.checkShowHiddenFlag.payAddressPageUvFlag = 1;
        this.checkShowHiddenFlag.payAddressPagePvFlag = 1;
        // 地址提交按钮
        this.checkShowHiddenFlag.payAddressSubmitBtnUvFlag = 1;
        this.checkShowHiddenFlag.payAddressSubmitBtnPvFlag = 1;
        // 订单结算页
        this.checkShowHiddenFlag.payOrderBalanceUvFlag = 1;
        this.checkShowHiddenFlag.payOrderBalancePvFlag = 1;
        // 支付按钮点击
        this.checkShowHiddenFlag.payPaymentBtnClickUvFlag = 1;
        this.checkShowHiddenFlag.payPaymentBtnClickPvFlag = 1;
        // 支付成功数
        this.checkShowHiddenFlag.payPaymentSuccessSumFlag = 1;
        // tab0-2
        this.checkShowHiddenFlag.payTab02UvFlag = 1;
        this.checkShowHiddenFlag.payTab02PvFlag = 1;
        // tab2-4
        this.checkShowHiddenFlag.payTab24UvFlag = 1;
        this.checkShowHiddenFlag.payTab24PvFlag = 1;
        // tab4-6
        this.checkShowHiddenFlag.payTab46UvFlag = 1;
        this.checkShowHiddenFlag.payTab46PvFlag = 1;
        // 分销相关
        // 首页分销按钮
        this.checkShowHiddenFlag.distributionIndexBtnUvFlag = 1;
        this.checkShowHiddenFlag.distributionIndexBtnPvFlag = 1;
        // 生成海报用户数
        this.checkShowHiddenFlag.distributionPosterUserNumFlag = 1;
        // 有访问独立页面数量
        this.checkShowHiddenFlag.distributionAlonePageFlag = 1;
        // 有交易独立页面数量
        this.checkShowHiddenFlag.distributionDealPageFlag = 1;
      } else {
        this.a = 2;
        this.b = 2;
        this.checkIndexPv = false;
        this.checkIndexUv = false;
        // 购买相关
        // 首页
        this.checkModelSelect.payIndexUV = false;
        this.checkModelSelect.payIndexPV = false;
        // 获取授权数
        this.checkModelSelect.payRight = false;
        // 下单按钮点击
        this.checkModelSelect.payOrderBtnUv = false;
        this.checkModelSelect.payOrderBtnPv = false;
        // 地址页面访问
        this.checkModelSelect.payAddressPageUv = false;
        this.checkModelSelect.payAddressPagePv = false;
        // 地址提交按钮
        this.checkModelSelect.payAddressSubmitBtnUv = false;
        this.checkModelSelect.payAddressSubmitBtnPv = false;
        // 订单结算页
        this.checkModelSelect.payOrderBalanceUv = false;
        this.checkModelSelect.payOrderBalancePv = false;
        // 支付按钮点击
        this.checkModelSelect.payPaymentBtnClickUv = false;
        this.checkModelSelect.payPaymentBtnClickPv = false;
        // 支付成功数
        this.checkModelSelect.payPaymentSuccessSum = false;
        // tab0-2
        this.checkModelSelect.payTab02Uv = false;
        this.checkModelSelect.payTab02Pv = false;
        // tab2-4
        this.checkModelSelect.payTab24Uv = false;
        this.checkModelSelect.payTab24Pv = false;
        // tab4-6
        this.checkModelSelect.payTab46Uv = false;
        this.checkModelSelect.payTab46Pv = false;
        // 分销相关
        // 首页分销按钮
        this.checkModelSelect.distributionIndexBtnUv = false;
        this.checkModelSelect.distributionIndexBtnPv = false;
        // 生成海报用户数
        this.checkModelSelect.distributionPosterUserNum = false;
        // 有访问独立页面数量
        this.checkModelSelect.distributionAlonePage = false;
        // 有交易独立页面数量
        this.checkModelSelect.distributionDealPage = false;

        // 购买相关
        // 首页
        this.checkShowHiddenFlag.payIndexUVFlag = 2;
        this.checkShowHiddenFlag.payIndexPVFlag = 2;
        // 获取授权数
        this.checkShowHiddenFlag.payRightFlag = 2;
        // 下单按钮点击
        this.checkShowHiddenFlag.payOrderBtnUvFlag = 2;
        this.checkShowHiddenFlag.payOrderBtnPvFlag = 2;
        // 地址页面访问
        this.checkShowHiddenFlag.payAddressPageUvFlag = 2;
        this.checkShowHiddenFlag.payAddressPagePvFlag = 2;
        // 地址提交按钮
        this.checkShowHiddenFlag.payAddressSubmitBtnUvFlag = 2;
        this.checkShowHiddenFlag.payAddressSubmitBtnPvFlag = 2;
        // 订单结算页
        this.checkShowHiddenFlag.payOrderBalanceUvFlag = 2;
        this.checkShowHiddenFlag.payOrderBalancePvFlag = 2;
        // 支付按钮点击
        this.checkShowHiddenFlag.payPaymentBtnClickUvFlag = 2;
        this.checkShowHiddenFlag.payPaymentBtnClickPvFlag = 2;
        // 支付成功数
        this.checkShowHiddenFlag.payPaymentSuccessSumFlag = 2;
        // tab0-2
        this.checkShowHiddenFlag.payTab02UvFlag = 2;
        this.checkShowHiddenFlag.payTab02PvFlag = 2;
        // tab2-4
        this.checkShowHiddenFlag.payTab24UvFlag = 2;
        this.checkShowHiddenFlag.payTab24PvFlag = 2;
        // tab4-6
        this.checkShowHiddenFlag.payTab46UvFlag = 2;
        this.checkShowHiddenFlag.payTab46PvFlag = 2;
        // 分销相关
        // 首页分销按钮
        this.checkShowHiddenFlag.distributionIndexBtnUvFlag = 2;
        this.checkShowHiddenFlag.distributionIndexBtnPvFlag = 2;
        // 生成海报用户数
        this.checkShowHiddenFlag.distributionPosterUserNumFlag = 2;
        // 有访问独立页面数量
        this.checkShowHiddenFlag.distributionAlonePageFlag = 2;
        // 有交易独立页面数量
        this.checkShowHiddenFlag.distributionDealPageFlag = 2;
      }
    },
    handlePayIndexUV() {
      if (this.checkModelSelect.payIndexUV == true) {
        this.checkShowHiddenFlag.payIndexUVFlag = 1;
      } else {
        this.checkShowHiddenFlag.payIndexUVFlag = 2;
      }
    },
    handlePayIndexPV() {
      if (this.checkModelSelect.payIndexPV == true) {
        this.checkShowHiddenFlag.payIndexPVFlag = 1;
      } else {
        this.checkShowHiddenFlag.payIndexPVFlag = 2;
      }
    },
    handPayRight() {
      if (this.checkModelSelect.payRight == true) {
        this.checkShowHiddenFlag.payRightFlag = 1;
      } else {
        this.checkShowHiddenFlag.payRightFlag = 2;
      }
    },
    handPayOrderBtnUv() {
      if (this.checkModelSelect.payOrderBtnUv == true) {
        this.checkShowHiddenFlag.payOrderBtnUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payOrderBtnUvFlag = 2;
      }
    },
    handPayOrderBtnPv() {
      if (this.checkModelSelect.payOrderBtnPv == true) {
        this.checkShowHiddenFlag.payOrderBtnPvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payOrderBtnPvFlag = 2;
      }
    },
    handPayAddressPageUv() {
      if (this.checkModelSelect.payAddressPageUv == true) {
        this.checkShowHiddenFlag.payAddressPageUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payAddressPageUvFlag = 2;
      }
    },
    handPayAddressPagePv() {
      if (this.checkModelSelect.payAddressPagePv == true) {
        this.checkShowHiddenFlag.payAddressPagePvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payAddressPagePvFlag = 2;
      }
    },
    handPayAddressSubmitBtnUv() {
      if (this.checkModelSelect.payAddressSubmitBtnUv == true) {
        this.checkShowHiddenFlag.payAddressSubmitBtnUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payAddressSubmitBtnUvFlag = 2;
      }
    },
    handPayAddressSubmitBtnPv() {
      if (this.checkModelSelect.payAddressSubmitBtnPv == true) {
        this.checkShowHiddenFlag.payAddressSubmitBtnPvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payAddressSubmitBtnPvFlag = 2;
      }
    },
    handPayOrderBalanceUv() {
      if (this.checkModelSelect.payOrderBalanceUv == true) {
        this.checkShowHiddenFlag.payOrderBalanceUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payOrderBalanceUvFlag = 2;
      }
    },
    handPayOrderBalancePv() {
      if (this.checkModelSelect.payOrderBalancePv == true) {
        this.checkShowHiddenFlag.payOrderBalancePvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payOrderBalancePvFlag = 2;
      }
    },
    handPayPaymentBtnClickUv() {
      if (this.checkModelSelect.payPaymentBtnClickUv == true) {
        this.checkShowHiddenFlag.payPaymentBtnClickUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payPaymentBtnClickUvFlag = 2;
      }
    },
    handPayPaymentBtnClickPv() {
      if (this.checkModelSelect.payPaymentBtnClickPv == true) {
        this.checkShowHiddenFlag.payPaymentBtnClickPvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payPaymentBtnClickPvFlag = 2;
      }
    },
    handPayPaymentSuccessSum() {
      if (this.checkModelSelect.payPaymentSuccessSum == true) {
        this.checkShowHiddenFlag.payPaymentSuccessSumFlag = 1;
      } else {
        this.checkShowHiddenFlag.payPaymentSuccessSumFlag = 2;
      }
    },
    handPayTab02Uv() {
      if (this.checkModelSelect.payTab02Uv == true) {
        this.checkShowHiddenFlag.payTab02UvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab02UvFlag = 2;
      }
    },
    handPayTab02Pv() {
      if (this.checkModelSelect.payTab02Pv == true) {
        this.checkShowHiddenFlag.payTab02PvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab02PvFlag = 2;
      }
    },
    handPayTab24Uv() {
      if (this.checkModelSelect.payTab24Uv == true) {
        this.checkShowHiddenFlag.payTab24UvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab24UvFlag = 2;
      }
    },
    handPayTab24Pv() {
      if (this.checkModelSelect.payTab24Pv == true) {
        this.checkShowHiddenFlag.payTab24PvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab24PvFlag = 2;
      }
    },
    handPayTab46Uv() {
      if (this.checkModelSelect.payTab46Uv == true) {
        this.checkShowHiddenFlag.payTab46UvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab46UvFlag = 2;
      }
    },
    handPayTab46Pv() {
      if (this.checkModelSelect.payTab46Pv == true) {
        this.checkShowHiddenFlag.payTab46PvFlag = 1;
      } else {
        this.checkShowHiddenFlag.payTab46PvFlag = 2;
      }
    },
    handPistributionIndexBtnUv() {
      if (this.checkModelSelect.distributionIndexBtnUv == true) {
        this.checkShowHiddenFlag.distributionIndexBtnUvFlag = 1;
      } else {
        this.checkShowHiddenFlag.distributionIndexBtnUvFlag = 2;
      }
    },
    handPistributionIndexBtnPv() {
      if (this.checkModelSelect.distributionIndexBtnPv == true) {
        this.checkShowHiddenFlag.distributionIndexBtnPvFlag = 1;
      } else {
        this.checkShowHiddenFlag.distributionIndexBtnPvFlag = 2;
      }
    },
    handPistributionPosterUserNum() {
      if (this.checkModelSelect.distributionPosterUserNum == true) {
        this.checkShowHiddenFlag.distributionPosterUserNumFlag = 1;
      } else {
        this.checkShowHiddenFlag.distributionPosterUserNumFlag = 2;
      }
    },
    handPistributionAlonePage() {
      if (this.checkModelSelect.distributionAlonePage == true) {
        this.checkShowHiddenFlag.distributionAlonePageFlag = 1;
      } else {
        this.checkShowHiddenFlag.distributionAlonePageFlag = 2;
      }
    },
    handPistributionDealPag() {
      if (this.checkModelSelect.distributionDealPage == true) {
        this.checkShowHiddenFlag.distributionDealPageFlag = 1;
      } else {
        this.checkShowHiddenFlag.distributionDealPageFlag = 2;
      }
    },
    text(str){
      if(str=='index'){
        console.log('index')
      }else if(str=='index'&&(str==str.replace('index','aaa'))){
        console.log('indexsssss')
      }else{
        console.log('none')
      }
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
.table {
  // width: 250%;
  padding: 0px;
  margin: 0px;
  font-family: Arial, Tahoma, Verdana, Sans-Serif;
  border: 1px solid rgb(223, 236, 236);
  border-collapse: collapse;
  text-align: center;
  .th {
    font-size: 14px;
    font-weight: 600;
    color: #303030;
    border-right: 1px solid rgb(223, 236, 236);
    border-bottom: 1px solid rgb(223, 236, 236);
    border-top: 1px solid rgb(223, 236, 236);
    letter-spacing: 2px;
    text-align: left;
    padding: 10px 0px 10px 0px;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    .td {
      width: 100px;
      background-color: rgb(238, 245, 246);
    }
  }
  .td {
    width: 100px;
    width: 550px;
    border-right: 1px solid rgb(223, 236, 236);
    border-bottom: 1px solid rgb(223, 236, 236);
    background: #fff;
    font-size: 14px;
    padding: 13px 13px 13px 16px;
    color: #303030;
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal;
    .td.color {
      background: #edf7f9;
    }
  }
}
.table1 {
  width: 100%;
  padding: 0px;
  margin: 0px;
  font-family: Arial, Tahoma, Verdana, Sans-Serif;
  border: 1px solid rgb(223, 236, 236);
  border-collapse: collapse;
  text-align: center;
  .th {
    font-size: 14px;
    font-weight: 600;
    color: #303030;
    border-right: 1px solid rgb(223, 236, 236);
    border-bottom: 1px solid rgb(223, 236, 236);
    border-top: 1px solid rgb(223, 236, 236);
    letter-spacing: 2px;
    text-align: left;
    padding: 10px 0px 10px 0px;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    .td {
      background-color: rgb(238, 245, 246);
    }
  }
  .td {
    width: 550px;
    border-right: 1px solid rgb(223, 236, 236);
    border-bottom: 1px solid rgb(223, 236, 236);
    background: #fff;
    font-size: 14px;
    padding: 13px 13px 13px 16px;
    color: #303030;
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal;
    .td.color {
      background: #edf7f9;
    }
  }
}
</style>
