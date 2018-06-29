<template>
  <section>
    <el-row>
      <el-col :span="24" class="topMargin">
        <el-table :data="list" :default-expand-all='false' border style="width: 100%"  >
          <el-table-column type="expand">
            <template scope="props" >
            <figure class="formExpand">
                <figcaption>
                  <ul class="ulTop">
                    <li class="liTop">商品图片</li>
                    <li class="liTop">商品名称</li>
                    <li class="liTop">购买数量</li>
                    <li class="liTop">划线价格</li>
                    <li class="liTop">商品价格</li>
                    <li class="liTop">会员价格</li>
                  </ul> 
                  <ul class="ulTop1" v-for='item in props.row.parsedPairList'>
                    <li>
                      <span class="liTop1"><img :src='item.parsedOrderItem.parsed.skuSnapshot.coverUrl' class="img"> </span>
                      <span class="liTop1">{{item.parsedOrderItem.parsed.skuSnapshot.skuName}}</span>
                      <span class="liTop1">1</span>
                      <span class="liTop1">{{item.parsedOrderItem.parsed.skuSnapshot.linePrice/100}}元</span>
                      <span class="liTop1">{{item.parsedOrderItem.parsed.skuSnapshot.price/100}}元</span>
                      <span class="liTop1">{{item.parsedOrderItem.parsed.skuSnapshot.vipPrice/100}}元</span>
                    </li>
                  </ul> 
                </figcaption>
            </figure>
          </template>
          </el-table-column>
          <el-table-column prop="entity.orderNo" label="订单号" sortable  align="center"  width="220"></el-table-column>
          <el-table-column prop="entity.totalPrice" label="总价钱" align="center" :formatter='formatMoney'></el-table-column>
          <el-table-column prop="entity.userName" label="下单人" align="center" width="150"></el-table-column>
          <el-table-column prop="entity.mobile" label="下单人电话" align="center" width="150"></el-table-column>
          <el-table-column prop="parsed.addressSnapshot.phone" label="收货人电话" align="center" width="150"></el-table-column>
          <el-table-column prop="entity.ct" label="下单时间" sortable align="center" :formatter='formatTime' width="200"></el-table-column>
          <el-table-column prop="entity.stat" label="订单状态" align="center" width="150"></el-table-column>
          <el-table-column prop="entity.totalPrice" label="实付金额" align="center" width="100" :formatter='formatMoney'></el-table-column>
          <el-table-column prop="entity.buyerRemarks" label="买家备注" align="center" width="100"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="midBorder">
        <el-steps :active="step" finish-status="success">
          <el-step title="买家下单" :description='timeUp'></el-step>
          <el-step title="买家付款" :description='timePay'></el-step>
          <el-step title="商家发货" :description='timeSend'></el-step>
          <el-step title="交易完成" :description='timeSuccess'></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row class="bottomBorder" >
      <el-col :span="8" style="border-right:0px solid #ccc;padding:10px">
        <h3>订单信息</h3>
        <div class="common-mar">
          <label>订单编号:</label><span>{{orderId}}</span>
        </div>
        <div class="common-mar">
          <label>订单类型:</label><span>{{orderType}}</span>
        </div>
        <div class="common-mar">
          <label>付款方式:</label><span>{{orderPayType}}</span>
        </div>
        <div class="common-mar">
          <label>支付时间:</label><span>{{orderPayTime}}</span>
        </div>
        <h3>配送信息</h3>
        <!-- <div class="common-mar">
          <label>配送方式:</label><span>{{dispatchingType}}</span>
        </div> -->
        <div class="common-mar">
          <label>收货信息:</label><span>{{dispatchingGetGoodsInfo}}</span>
        </div>
        <div class="common-mar">
          <label>收货姓名:</label><span>{{dispatchingBuyName}}</span>
        </div>
        <div class="common-mar">
          <label>收货电话:</label><span>{{dispatchingBuyTel}}</span>
        </div>
        <div class="common-mar">
          <label>买家留言:</label><span>{{dispatchingBuyWords}}</span>
        </div>
      </el-col>
      <el-col :span="16" style="border-left:1px solid #ccc;padding:10px">
        <el-col class="orderStatus">
          <i class="el-icon-warning"></i>
          <span>订单状态:</span>
          <span>{{orderType}}</span>
        </el-col>
        <el-col class="border-bottom">
          <el-button type="primary" @click.native="clickRefund" v-if = 'this.mainStatusFlag==1'>标记退款</el-button>
          <el-button type="primary" @click.native="affirmRefund" v-if = 'this.refundStatusFlag==1'>确认退款</el-button>
          <el-button type="primary" @click.native="refundInfoUpdate" v-if = 'this.mainStatusFlag!=1'>退货人信息</el-button>
          <span>{{dispatchingBuyWords}}</span>
        </el-col>
        <el-col class="orderStatus">
          <h4>快递信息:</h4>
          <el-col class="orderInfo">
            <span>包裹 - 1</span>
            <span>{{dispatchingType}}</span>
            <span>运单号:</span>
            <span>{{expressNo}}</span>
            <span>{{exportNewInfo}}</span>
            <el-button type="text" @click.native="showDeiInfo">更多</el-button>
          </el-col>
        </el-col>
        <el-col class="orderDetail">
          <el-col :span="10">
            <p><span>售后状态:</span><span>{{afterInfo}}</span></p>
            <p><span>标记退款日期:</span><span>{{afterAgreeTime}}</span></p>
            <p><span>{{afterInfo1}}日期:</span><span>{{afterAgreeTimeNew}}</span></p>
          </el-col>
          <el-col :span="10">
            <!-- <p><span>售后详情:</span><span>{{afterDetail}}</span></p> -->
            <p><span>退款原因:</span><span>{{afterReason}}</span></p>
            <p><span>处理方式:</span><span>{{afterType}}</span></p>
            <p><span>退款金额:</span><span>{{afterMoney}}</span></p>
            <p><span>扣款说明:</span><span>{{afterIllustration}}</span></p>
            <p><span>退款人手机号:</span><span>{{afterPeoplePhone}}</span></p>
            <p><span>退款人快递单号:</span><span>{{afterPeopleExpressId}}</span></p>
          </el-col>
        </el-col>
        <el-col class="orderDetail">
          <el-col :span="28">
            商家备注:<el-button type="small" @click.native="clickRemarkRefundPeople">添加备注</el-button>
          </el-col>
          <el-col :span="28">
            客服:<span>{{businessRemarkInfo}}</span>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <!-- 标记退款按钮弹窗 -->
    <el-dialog title='标记退款' :visible.sync="flagRefundFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'  :model='refund'>
        <el-form-item label='实付金额' >
          <el-input type="info" disabled auto-complete='off' v-model='refund.realMoney'></el-input>
        </el-form-item>
        <el-form-item label='退款方式' >
          <el-radio class="radio" v-model='refund.type' label='0'>仅退款</el-radio>
					<el-radio class="radio" v-model='refund.type' label='1'>退货退款</el-radio>
					<!-- <el-radio class="radio" v-model='refund.type' label='2'>退货</el-radio> -->
        </el-form-item>
        <el-form-item label='退款金额' >
          <el-input type="info" v-model='refund.price' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='退款原因'>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 40}"  v-model='refund.refund_reason'></el-input>
        </el-form-item>
        <el-form-item label='退款说明' >
          <el-input type="info" v-model='refund.description' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='退货人手机号' >
          <el-input type="info" v-model='refund.phone' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='退货人快递单号' >
          <el-input type="info" v-model='refund.express_no' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='注意'>
            <p>同意退款后,订单为[退款中]状态,等待财务打款完成后,财务打款</p>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeRefund">取消</el-button>
          <el-button type="primary" @click.native="refundOk">提交</el-button>
      </div>
    </el-dialog>
    <!-- 退货人信息修改 -->
    <el-dialog title='退货人信息' :visible.sync="updateRefundFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'  :model='refund'>
        <el-form-item label='退货人手机号' >
          <el-input type="info" v-model='refund.phone' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='退货人快递单号' >
          <el-input type="info" v-model='refund.express_no' auto-complete='off'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeRefundPeopleUpdate">取消</el-button>
          <el-button type="primary" @click.native="refundPeopleUpdate">提交</el-button>
      </div>
    </el-dialog>
     <!-- 请输入备注信息 -->
    <el-dialog title='请输入备注信息' :visible.sync="remarkRefundFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'>
        <el-form-item label='备注信息' >
          <el-input type="textarea" v-model='businessRemark' auto-complete='off'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeRemarkRefundPeopleUpdate">取消</el-button>
          <el-button type="primary" @click.native="remarkRefundPeopleUpdate">提交</el-button>
      </div>
    </el-dialog>
    <!-- 确认退款按钮弹窗 -->
    <el-dialog title='确认打款' :visible.sync="flagMoneyFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px' :model='refundAff'>
        <el-form-item label='实付金额' >
          <el-input type="info" v-model='refundAff.realMoney' disabled auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='退款金额'>
          <el-input type="info" v-model='refundAff.price' auto-complete='off'></el-input>
        </el-form-item>
        <el-form-item label='扣款说明' >
            <el-input type="textarea" v-model='refundAff.deduct_des' :autosize="{ minRows: 2, maxRows: 40}"></el-input>
        </el-form-item>
        <el-form-item label='注意'>
            <p>同意退款后,订单为[退款中]状态,等待财务打款完成后,订单关闭</p>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeMoney">取消</el-button>
          <el-button type="primary" @click.native="refundFlagAff">提交</el-button>
      </div>
    </el-dialog>
    <!-- 快递信息弹窗 -->
    <el-dialog title='快递信息' :visible.sync="deliveryFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'>
        <el-table :data="expressInfoDetail" :default-expand-all='false' border style="width: 100%">
        <el-table-column prop="context" label="当前状态" sortable  align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center" ></el-table-column>
      </el-table>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
// 引入工具包
import util from "../../common/js/util";
// axios
import { 
  getOrderList, 
  orderRefundFlag,
  expressGetByOrder,
  voucherTradeGet,
  orderRefundUpdate,
  expressList,
  orderRemark,
  orderRefundRemarkExpress
  } from "../../api/api";
export default {
  data() {
    return {
      // 商家备注
      businessRemark:'',
      businessRemarkInfo:'',
      refundStatusFlag:-1,
      mainStatusFlag:-1,
      // 标记退款订单子订单id
      orderChildrenId:'',
      // 确认退款订单子订单id
      orderFlagChildrenId:'',
      // 物流最新信息
      exportNewInfo:'',
      expressNo:'',
      // 快递信息
      expressInfoDetail:[],
      list: [],
      // 订单信息字段定义
      orderId: "",
      orderType: "",
      orderPayType: "",
      orderPayTime: "",
      // 配送信息字段定义
      dispatchingType: "",
      dispatchingGetGoodsInfo: "",
      dispatchingBuyName: "",
      dispatchingBuyTel: "",
      dispatchingBuyWords: "",
      // 售后模块字段定义
      afterInfo: "",
      afterInfo1: "",
      afterAgreeTime: "",
      afterDetail: "无",
      afterReason: "",
      afterType: "",
      afterMoney: "",
      afterAgreeTimeNew:'',
      afterIllustration: "",
      afterPeoplePhone: "",
      afterPeopleExpressId: "",
      // 进度条字段名称定义
      timeUp: "/",
      timePay: "/",
      timeSend: "/",
      timeSuccess: "/",
      // 快递信息弹窗
      deliveryFormVisible: false,
      // 标记退款弹窗
      flagRefundFormVisible: false,
      // 确认打款弹窗
      flagMoneyFormVisible: false,
      // 退货人信息弹窗
      updateRefundFormVisible: false,
      // 备注信息弹窗
      remarkRefundFormVisible: false,
      step: 0,
      // 标记退款数据结构初始化定义
      refund:{
        realMoney:'',
        order_id:'',
        order_item_id :'',
        price:'',
        type:'',
        refund_reason:'',
        description:'',
        phone:'',
        express_no:'',
      },
      // 确定退款数据结构
      refundAff:{
        realMoney:'',
        order_refund_id:'',
        price:'',
        deduct_des:'',
      }
    };
  },
  methods: {
    // 时间转化
    formatTime(row, column) {
      let property = column.property.split(".");
      let time = row[property[0]][property[1]];
      if (time === 0) {
        return "/";
      }
      return util.formatDate.format(new Date(time), "yyyy/MM/dd   hh:mm:ss");
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
    // 点击标记退款取消按钮
    closeRefund() {
      this.flagRefundFormVisible = false;
    },
    // 点击确认打款取消按钮
    closeMoney() {
      this.flagMoneyFormVisible = false;
    },
    // 点击标记退款按钮
    clickRefund() {
      this.refund.realMoney = this.list[0].entity.actualPrice/100+'元'
      this.refund.price = this.list[0].entity.actualPrice/100
      this.flagRefundFormVisible = true;
    },
    // 点击确认退款按钮
    affirmRefund(){
      this.refundAff.realMoney= this.list[0].entity.actualPrice/100+'元'
      this.flagMoneyFormVisible=true
    },
    showDeiInfo() {
      this.deliveryFormVisible = true;
    },
    // 点击退货人信息按钮
    refundInfoUpdate(){
      this.updateRefundFormVisible = true;
    },
    // 点击退货人弹窗取消按钮
    closeRefundPeopleUpdate(){
      this.updateRefundFormVisible = false;
    },
    // 点击备注信息按钮
    clickRemarkRefundPeople(){
      this.remarkRefundFormVisible = true;
    },
    // 点击备注信息弹窗取消按钮
    closeRemarkRefundPeopleUpdate(){
      this.remarkRefundFormVisible = false;
    },
    // 订单信息获取
    loadOrderList() {
      let para = {
        order_no: this.$route.query.orderNo
      };
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            this.businessRemarkInfo = res.data.data.items[0].entity.remarks||''
            // 收货信息
            this.dispatchingGetGoodsInfo = res.data.data.items[0].parsed.addressSnapshot.province+
                                           res.data.data.items[0].parsed.addressSnapshot.city+
                                           res.data.data.items[0].parsed.addressSnapshot.area+
                                           res.data.data.items[0].parsed.addressSnapshot.street
            // 买家姓名
            this.dispatchingBuyName = res.data.data.items[0].parsed.addressSnapshot.realName
            // 买家电话
            this.dispatchingBuyTel = res.data.data.items[0].parsed.addressSnapshot.phone
            
            // 订单编号
            this.orderId = res.data.data.items[0].entity.orderNo
            
            // 买家留言
            this.dispatchingBuyWords = res.data.data.items[0].entity.buyerRemarks
            // 标记子订单id
            this.orderChildrenId = res.data.data.items[0].parsedPairList[0].parsedOrderItem.entity.id

            if(res.data.data.items[0].entity.stat==0 || res.data.data.items[0].entity.stat==1 || res.data.data.items[0].entity.stat==2|| res.data.data.items[0].entity.stat==9){
              // 买家下单含之前订单状态
              this.step = 1
            }else if(res.data.data.items[0].entity.stat==3){
              // 买家付款含之前状态
              this.step = 2
            }else if(res.data.data.items[0].entity.stat==4 ||res.data.data.items[0].entity.stat==6){
              // 商家发货含之前状态
              this.step = 3
            }else if(res.data.data.items[0].entity.stat==8){
              // 交易完成
              this.step = 4
            }else if(res.data.data.items[0].entity.stat==7){
              // 交易完成
              this.step = 0
            }
            // 主订单状态
            let mainStatus = res.data.data.items[0].entity.stat
            let mainRefundParsed = res.data.data.items[0].parsedPairList[0].parsedOrderRefund
            let arr = Object.getOwnPropertyNames(mainRefundParsed);
            if((mainStatus==0 || mainStatus ==1|| mainStatus ==3|| mainStatus ==4|| mainStatus ==5|| mainStatus ==6|| mainStatus ==7|| mainStatus ==8)&&arr.length == 0){
              this.mainStatusFlag = 1
            }else{
              // 隐藏标记按钮
              this.mainStatusFlag = 2
            }
            if(res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity!=undefined){
              // 退款单状态
              let refundStatus = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.refundStat
              if(mainStatus==4&&refundStatus==1){
                this.refundStatusFlag = 1
              }else if(mainStatus==6&&refundStatus==1){
                this.refundStatusFlag = 1
              }else if(mainStatus==8&&refundStatus==1){
                this.refundStatusFlag = 1
              }else{
                // 隐藏确认按钮
                this.refundStatusFlag = 2
              }
              
              // 确认退款子订单id
              this.orderFlagChildrenId = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.id
              // 退款原因
              this.afterReason = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.reason
              // 处理方式
              let flag = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.refundStat
              if(flag==0){
                this.afterType='仅退款'
              }else if(flag == 1){
                this.afterType='退货退款'
              }else if(flag==2){
                this.afterType='退货'
              }else{
                this.afterType=''
              }
              // 退款金额
              this.afterMoney = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.refundPrice/100+'元'
              // 售后状态
              let afterInfoDetail = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.refundStat
              if(afterInfoDetail==0){
                this.afterInfo = '退款创建，申请退款'
                this.afterInfo1 = '退款创建，申请退款'
              }else if(afterInfoDetail==1){
                this.afterInfo = '同意退款'
                this.afterInfo1 = '同意退款'
              }else if(afterInfoDetail==2){
                this.afterInfo = '退款中'
                this.afterInfo1 = '退款更新'
              }else if(afterInfoDetail==3){
                this.afterInfo = '退款成功'
                this.afterInfo1 = '退款成功'
              }else if(afterInfoDetail==4){
                this.afterInfo = '拒绝退款'
                this.afterInfo1 = '拒绝退款'
              }else if(afterInfoDetail==5){
                this.afterInfo = '退款关闭'
                this.afterInfo1 = '退款关闭'
              }
              // 同意退款日期
              this.afterAgreeTime =util.formatDate.format(new Date(res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.ct), "yyyy/MM/dd   hh:mm:ss");
              if(res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.ut!=0){
                this.afterAgreeTimeNew =util.formatDate.format(new Date(res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.ut), "yyyy/MM/dd   hh:mm:ss");
              }else{
                this.afterAgreeTimeNew ='/'
              }
              // 售后详情
              // this.afterDetail = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.
              // 退款说明
              this.afterIllustration = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.entity.deductDes
              if(res.data.data.items[0].parsedPairList[0].parsedOrderRefund.parsed!=undefined){
                this.afterPeoplePhone = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.parsed.refundPhone
                this.afterPeopleExpressId = res.data.data.items[0].parsedPairList[0].parsedOrderRefund.parsed.expressNo
              }else{
                this.afterPeoplePhone = ''
                this.afterPeopleExpressId = ''
              }
            }else{
              // 退款原因
              this.afterReason = ''
              // 处理方式
              this.afterType = ''
              // 退款金额
              this.afterMoney = ''
              // 同意退款日期
              this.afterAgreeTime = ''
              // 退款说明
              this.afterIllustration =''
            }
            // 买家下单日期
            this.timeUp =util.formatDate.format(new Date(res.data.data.items[0].entity.ct), "yyyy/MM/dd   hh:mm:ss");
            
            // 订单
            this.list = res.data.data.items;
            if (this.list && this.list.length) {
              this.list.map((item, index) => {
                if(item.entity.stat==0){
                  item.entity.stat='没有创建支付交易'
                }else if(item.entity.stat==1){
                  item.entity.stat='创建失败'
                }else if(item.entity.stat==2){
                  item.entity.stat='等待支付'
                }else if(item.entity.stat==3){
                  item.entity.stat='等待卖家发货'
                }else if(item.entity.stat==4){
                  item.entity.stat='卖家已发货'
                }else if(item.entity.stat==5){
                  item.entity.stat=''
                }else if(item.entity.stat==6){
                  item.entity.stat='买家已签收'
                }else if(item.entity.stat==7){
                  item.entity.stat='交易关闭'
                }else if(item.entity.stat==8){
                  item.entity.stat='交易完成'
                }else if(item.entity.stat==9){
                  item.entity.stat='未支付，交易取消'
                }
              });
              if(arr.length>0){
                // 订单类型
                this.orderType = this.afterInfo
              }else{
                // 订单类型
                this.orderType = res.data.data.items[0].entity.orderStatStr
              }
            }
          } else {
            this.list = [];
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
          this.listLoading = false;
        });
    },
    // 物流信息方法
    expressInfo(para) {
      expressGetByOrder(para)
        .then(res => {
          if (res.data.success) {
            // 配送方式
            this.dispatchingType = res.data.data.expressCompany
            // // 收货信息
            // this.dispatchingGetGoodsInfo = res.data.data.consigneeAddress
            // // 买家姓名
            // this.dispatchingBuyName = res.data.data.consigneeName
            // // 买家电话
            // this.dispatchingBuyTel = res.data.data.consigneePhone
            // 运单号
            this.expressNo = res.data.data.expressNo
            if(res.data.data.kd100Result!=''){
              let info = eval('(' + res.data.data.kd100Result + ')').data
              this.expressInfoDetail = info
              this.exportNewInfo = info[0].time+info[0].context
              let flagStr = /已签收/g.test(info[0].context)
              if(flagStr){
                this.timeSuccess = info[0].time
              }else{
                this.time = ''
              }
            }else{
              this.expressInfoDetail = []
            }
          } else {
            // this.$notify({
            //   title: "错误",
            //   message: res.data.msg,
            //   type: "error"
            // });
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
          this.listLoading = false;
        });
    },
    // 订单标记退款按钮
    refundOk(){
      let para = {
        order_id:this.$route.query.orderNo,
        order_item_id :this.orderChildrenId,
        price:parseInt(this.refund.price*100),
        type:this.refund.type,
        refund_reason:this.refund.refund_reason,
      }
      orderRefundFlag(para)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: "标记退款",
              message: "标记退款成功",
              type: "success"
            });
            this.flagRefundFormVisible = false
            this.loadOrderList()
            location.reload() 
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    // 订单确认退款按钮
    refundFlagAff(){
      let para = {
        order_refund_id:this.orderFlagChildrenId,
        price:parseInt(this.refundAff.price*100),
        deduct_des:this.refundAff.deduct_des,
      }
      orderRefundUpdate(para)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: "确认退款",
              message: "确认退款成功",
              type: "success"
            });
            this.flagMoneyFormVisible = false
            this.loadOrderList()
            // location.reload() 
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    // 点击退货人信息确认
    refundPeopleUpdate(){
      let para = {
        order_refund_id:this.orderFlagChildrenId,
        phone:this.refund.phone,
        express_no:this.refund.express_no,
      }
      orderRefundRemarkExpress(para)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: "成功",
              message: "退货人信息添加成功",
              type: "success"
            });
            this.updateRefundFormVisible = false
            this.loadOrderList()
            // location.reload() 
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    // 点击备注信息弹窗确认按钮
    remarkRefundPeopleUpdate(){
      let para = {
        order_no:this.$route.query.orderNo,
        remark:this.businessRemark,
      }
      orderRemark(para)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: "商家备注",
              message: "商家备注添加成功",
              type: "success"
            });
            this.remarkRefundFormVisible = false
            this.loadOrderList()
            // location.reload() 
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
        });
    },
    voucherTradeGetInfo(para){
      voucherTradeGet(para)
        .then(res => {
          if (res.data.success) {
            // 付款方式
            this.orderPayType = res.data.data.payType
            // 支付时间
            this.orderPayTime = util.formatDate.format(new Date(res.data.data.successTime), "yyyy/MM/dd   hh:mm:ss");
            this.timePay = this.orderPayTime
          } else {
            // this.$notify({
            //   title: "错误",
            //   message: res.data.msg,
            //   type: "error"
            // });
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
            this.$notify({
              title: "错误",
              message: error.message,
              type: "error"
            });
          }
          this.listLoading = false;
        });
    },
    stepSendGoodTime(para) {
      expressList(para)
        .then(res => {
          if (res.data.success) {
            if(res.data.data.items.length>0){
              this.timeSend = util.formatDate.format(new Date(res.data.data.items[0].expressSt), "yyyy/MM/dd   hh:mm:ss");
            }else{
              this.timeSend = '/'
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
  },
  mounted() {
    this.loadOrderList()
    let para ={
      order_no: this.$route.query.orderNo
    }
    let para1 ={
      order_no:this.$route.query.orderNo
    }
    this.expressInfo(para)
    this.voucherTradeGetInfo(para1)
    this.stepSendGoodTime(para)
  }
};
</script>
<style  lang="less" scoped>
.ulTop {
  .liTop {
    // float: left;
    display: inline-block;
    width: 150px;
    text-align: center;
    font-weight: 700;
    margin-left: 13px;
    margin-bottom: 10px;
  }
}
.ulTop1 {
  li {
    margin-left: 64px;
    .liTop1 {
      display: inline-block;
      width: 162px;
      margin-bottom: 10px;
      .img {
        width: 50px;
        vertical-align: middle;
      }
    }
  }
}
.midBorder {
  border: 1px solid #ccc;
  margin: 20px 0;
  padding: 30px 0px 20px 100px;
  border-radius: 5px;
  text-align: center;
}
.topMargin {
  margin-top: 10px;
}
.bottomBorder {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 2px 0 2px 10px;
}
.common-mar {
  margin: 5px;
}
.orderStatus {
  padding: 10px;
}
.border-bottom {
  border-bottom: 1px solid #ccc;
  padding: 0 0 10px 20px;
}
.el-icon-warning {
  font-size: 20px;
  color: #36b3b3;
  vertical-align: middle;
}
.orderInfo {
  border: 2px dotted #ccc;
  padding: 5px;
}
.orderDetail {
  border-top: 1px solid #ccc;
  padding: 15px 0 0 10px;
}
</style>

