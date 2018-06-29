<template>
  <section>
    <!-- 头部查询筛选 -->
    <el-col  class='toolbar' style='padding-bottom: 0px;'>
      <el-form :inline = "true" :model='filter'>
        <el-form-item>
          <el-input  placeholder='请输入订单号' v-model='filter.order_no' clearable icon="circle-cross" :on-icon-click="handleIconClick_orderId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input  placeholder='请输入快递物流号' v-model='filter.express_no' clearable icon="circle-cross" :on-icon-click="handleIconClick_kuaiId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input  placeholder='请输入仓储单号' v-model='filter.storage_no' clearable icon="circle-cross" :on-icon-click="handleIconClick_cangId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filter.start_time"  type="date" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filter.end_time"  type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model='filter.express_status' placeholder="请选择发货状态" clearable>
            <el-option v-for="item in statusOrderOptions" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='primary' @click.native='selectOrderList'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 全部订单列表 -->
    <el-table :data="allList" :default-expand-all='false' border style="width: 100%" v-loading="initLoading">
      <el-table-column prop="orderNo" label="订单号" sortable  align="center"  width="210"></el-table-column>
      <el-table-column prop="expressCompany" label="快递公司" align="center"></el-table-column>
      <el-table-column prop="expressNo" label="快递单号" align="center" ></el-table-column>
      <el-table-column prop="storageNo" label="仓储单号" align="center" ></el-table-column>
      <el-table-column prop="expressSt" label="发货时间" sortable align="center" :formatter='formatTime' ></el-table-column>
      <el-table-column prop="expressStatus" label="订单状态" align="center" ></el-table-column>

      <el-table-column label="操作" align="center" width="150">
        <template scope="scope">
          <el-button-group>
            <el-button type="text" size="small" @click="detailPage(scope.$index, scope.row)">查看详情</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 全部订单列表分页 -->
    <el-col class='toolbar'>
      <el-pagination style='float: right' @current-change="allHandleCurrentChange" :current-page.sync="allListPage" :page-size="20" layout="total, prev, pager, next" :total="allTotalCount">
      </el-pagination>
    </el-col>
    <!-- 快递信息弹窗 -->
    <el-dialog title='快递信息' :visible.sync="deliveryFormVisible" :close-on-click-modal='false'>
      <el-table :data="expressInfoDetail" :default-expand-all='false' border style="width: 100%">
        <el-table-column prop="context" label="当前状态" sortable  align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center" ></el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>
<script>
// 引入工具包
import util from "../../common/js/util";
import { 
  getOrderList, 
  orderBatchSend ,
  expressGetByOrder,
  expressList
  } from "../../api/api";
export default {
  data() {
    return {
      // 快递信息弹窗
      deliveryFormVisible: false,
      // 快递信息
      expressInfoDetail:[],
      allListPage:0,
      allTotalCount:0,
      initLoading: true,
      status: "",
      timeRange: "",
      filter: {
        order_no: "",
        express_no: "",
        storage_no: "",
        start_time:"",
        end_time:"",
        express_status:"",
      },
      // 发送状态select
      statusOrderOptions: [
        {
          value: 1,
          label: "已发货"
        },
        {
          value: 2,
          label: "已签收"
        },
        {
          value: 3,
          label: "物流关闭"
        }
      ],
      allList:[],
    };
  },
  methods: {
    handleIconClick_orderId() {
      this.filter.order_no = ''
    },
    handleIconClick_kuaiId() {
      this.filter.express_no = ''
    },
    handleIconClick_cangId() {
      this.filter.storage_no = ''
    },
    // 时间转化
    formatTime(row, column) {
      let time = row.expressSt
      if (time === 0) {
        return "/";
      }
      return util.formatDate.format(new Date(time), "yyyy/MM/dd   hh:mm:ss");
    },
    // 点击详情展示物流信息
    detailPage(index, row) {
      let para ={
        order_no:row.orderNo
      }
      this.expressInfo(para)
      // 快递信息弹窗
      this.deliveryFormVisible=true
      
    },
    // 全部订单分页操作
    allHandleCurrentChange(page) {
     let para = {
        page_index: page,
      };
      this.loadOrderList(para)
    },
    selectOrderList(){
      let start=''
      if(this.filter.start_time==''){
        start = ''
      }else{
        start = util.formatDate.format(new Date(this.filter.start_time))
      }
      let end=''
      if(this.filter.end_time==''){
        end = ''
      }else{
        end = util.formatDate.format(new Date(this.filter.end_time))
      }
      let para = {
        page_index: 1,
        order_no: this.filter.order_no,
        express_no: this.filter.express_no,
        storage_no: this.filter.storage_no,
        start_time: start,
        end_time: end,
        express_status:  parseInt(this.filter.express_status) || ''
      };
      
      this.loadOrderList(para)
    },
    loadOrderList(para) {
      expressList(para)
        .then(res => {
          if (res.data.success) {
            let list = res.data.data.items;
            if (list && list.length) {
              list.map((item, index) => {
                if(item.expressStatus==1){
                  item.expressStatus='已发货'
                }else if(item.expressStatus==2){
                  item.expressStatus='已签收'
                }else if(item.expressStatus==3){
                  item.expressStatus='物流关闭'
                }
              });
            }
            // 全部订单
            this.allListPage = res.data.data.page;
            this.allTotalCount = res.data.data.totalCount;
            this.allList = list;
          } else {
            this.allList = [];
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
          this.initLoading = false;
          // this.listLoading = false;
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
          // this.listLoading = false;
        });
    },
    // 物流信息方法
    expressInfo(para) {
      expressGetByOrder(para)
        .then(res => {
          if (res.data.success) {
            if(res.data.data.kd100Result!=undefined){
              let info = eval('(' + res.data.data.kd100Result + ')').data
              this.expressInfoDetail = info
            }else{
              this.expressInfoDetail = []
            }
          } else {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
          this.listLoading = false;
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
            // this.$notify({
            //   title: "错误",
            //   message: error.message,
            //   type: "error"
            // });
          }
          this.listLoading = false;
        });
    }
  },
  mounted() {
    let start=''
      if(this.filter.start_time==''){
        start = ''
      }else{
        start = util.formatDate.format(new Date(this.filter.start_time))
      }
      let end=''
      if(this.filter.end_time==''){
        end = ''
      }else{
        end = util.formatDate.format(new Date(this.filter.end_time))
      }
      let para = {
        page_index: 1,
        order_no: this.filter.order_no,
        express_no: this.filter.express_no,
        storage_no: this.filter.storage_no,
        start_time: start,
        end_time: end,
        express_status:  parseInt(this.filter.express_status) || ''
      };
    this.loadOrderList(para);
  }
};
</script>
<style lang="less" scoped>
</style>

