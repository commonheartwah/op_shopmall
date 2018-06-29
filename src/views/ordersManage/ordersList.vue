<template lang="html">
	<section>
		<el-tabs  v-model="activeName"  element-loading-text="努力加载中">
			<el-tab-pane name='virtual'>
				<span slot="label"><i class="fa fa-feed"></i> 全部订单</span>
        <!-- 头部查询筛选 -->
        <el-col  class='toolbar' style='padding-bottom: 0px;'>
          <el-form :inline = "true" :model='filter'>
            <el-form-item>
                <el-input  placeholder='请输入订单号' v-model='filter.orderNo' clearable icon="circle-cross" :on-icon-click="handleIconClick_orderId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input  placeholder='请输入下单人姓名' v-model='filter.userName' clearable icon="circle-cross" :on-icon-click="handleIconClick_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input  placeholder='请输入下单人手机号' v-model='filter.mobile' clearable icon="circle-cross" :on-icon-click="handleIconClick_tel"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="filter.timeRange" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-select v-model="filter.orderStatus" placeholder="请选择订单状态" clearable>
                    <el-option v-for="item in statusOrderOptions" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="filter.order_refund_stat" placeholder="请选择维权状态" clearable>
                    <el-option v-for="item in statusPowerOptions" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='text' @click.native='loadSelectOrderListAbout7'>近7天</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type='text' @click.native='loadSelectOrderListAbout30'>近30天</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click.native='loadSelectOrderList'>筛选</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click.native='openExport'>批量导出</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click.native='openFlag'>标记发货</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 订单分类页面 -->
        <el-col>
          <el-tabs type="border-card" v-model="classify" @tab-click="tabsClick">
            <el-tab-pane label="全部" name='0'>
              <!-- 全部订单列表 -->
              <el-table :data="allList" :default-expand-all='false' border style="width: 100%" @selection-change="selsChange" border>
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small" @click="sendGood(scope.$index, scope.row)">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 全部订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="allHandleCurrentChange" :current-page.sync="allListPage" :page-size="20" layout="total, prev, pager, next" :total="allTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="待付款" name='2'>
              <!-- 代付款订单列表 -->
              <el-table :data="waitPayList" :default-expand-all='false' border style="width: 100%"  >
                <!-- <el-table-column type="selection" width="55"></el-table-column>                 -->
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 代付款订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="waitPayHandleCurrentChange" :current-page.sync="waitPayListPage" :page-size="20" layout="total, prev, pager, next" :total="waitPayTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="待发货" name='3'>
              <!-- 代发货订单列表 -->
              <el-table :data="waitGoodsList" :default-expand-all='false' border style="width: 100%"  @selection-change="selsChange" border>
                <el-table-column type="selection" width="55"></el-table-column>                
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 代发货订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="waitGoodsHandleCurrentChange" :current-page.sync="waitGoodsListPage" :page-size="20" layout="total, prev, pager, next" :total="waitGoodsTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已发货" name="4">
              <!-- 已发货订单列表 -->
              <el-table :data="doneGoodsList" :default-expand-all='false' border style="width: 100%"  >
                <!-- <el-table-column type="selection" width="55"></el-table-column>                 -->
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 已发货订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="doneGoodsHandleCurrentChange" :current-page.sync="doneGoodsListPage" :page-size="20" layout="total, prev, pager, next" :total="doneGoodsTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="8">
              <!-- 已完成订单列表 -->
              <el-table :data="doneList" :default-expand-all='false' border style="width: 100%"  >
                <!-- <el-table-column type="selection" width="55"></el-table-column>                 -->
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 已完成订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="doneHandleCurrentChange" :current-page.sync="doneListPage" :page-size="20" layout="total, prev, pager, next" :total="doneTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="已关闭" name="7">
              <!-- 已关闭订单列表 -->
              <el-table :data="closeList" :default-expand-all='false' border style="width: 100%"  >
                <!-- <el-table-column type="selection" width="55"></el-table-column>                 -->
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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

                <el-table-column label="操作" align="center" width="150" fixed="right">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 已关闭订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="closeHandleCurrentChange" :current-page.sync="closeListPage" :page-size="20" layout="total, prev, pager, next" :total="closeTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="退款订单" name="6">
              <!-- 退款订单列表 -->
              <el-table :data="refundList" :default-expand-all='false' border style="width: 100%"  >
                <!-- <el-table-column type="selection" width="55"></el-table-column>                 -->
                <!-- <el-table-column type="expand">
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
                              <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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
                </el-table-column> -->
                <el-table-column prop="parsedOrder.entity.orderNo" label="主订单号" sortable  align="center"  width="220"></el-table-column>
                <el-table-column prop="entity.refundNo" label="退款单号" sortable  align="center"  width="220"></el-table-column>
                <el-table-column prop="entity.reason" label="退款原因" align="center" width="150"></el-table-column>
                <!-- <el-table-column prop="entity.description" label="退款描述" align="center" width="120"></el-table-column> -->
                <el-table-column prop="parsedOrderItem.parsed.skuSnapshot.skuName" label="退款商品名称" align="center" width="220"></el-table-column>
                <el-table-column prop="entity.ct" label="创建退款单时间" sortable align="center" :formatter='formatTime' width="200"></el-table-column>
                <el-table-column prop="entity.refundStat" label="退款状态" align="center" width="120"></el-table-column>
                <el-table-column prop="entity.refundPrice" label="退款金额" align="center"  :formatter='formatMoneyRefund' width="120"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template scope="scope">
                        <el-button-group>
                          <!-- <el-button type="success" size="small">发货</el-button> -->
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
              </el-table>
              <!-- 退款中订单列表分页 -->
              <el-col class='toolbar'>
                <el-pagination style='float: right' @current-change="refundHandleCurrentChange" :current-page.sync="refundListPage" :page-size="20" layout="total, prev, pager, next" :total="refundTotalCount">
                </el-pagination>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-col>
			</el-tab-pane>
			<!-- <el-tab-pane name='reality' v-model="activeName" >
				<span slot="label"><i class="fa fa-credit-card-alt"></i> 待发货订单</span>
        <el-table :data="waitGoodsList" :default-expand-all='false' border style="width: 100%"  @selection-change="selsChange" border>
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
                      <span class="liTop1"><img :src='item.parsedOrderItem.entity.coverUrl' class="img"> </span>
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
          <el-table-column prop="entity.userName" label="买家" align="center" width="100"></el-table-column>
          <el-table-column prop="entity.mobile" label="买家电话" align="center" width="150"></el-table-column>
          <el-table-column prop="entity.ct" label="下单时间" sortable align="center" :formatter='formatTime' width="150"></el-table-column>
          <el-table-column prop="entity.satt" label="订单状态" align="center" width="100"></el-table-column>
          <el-table-column prop="entity.totalPrice" label="实付金额" align="center" width="100" :formatter='formatMoney'></el-table-column>
          <el-table-column prop="entity.buyerRemarks" label="买家备注" align="center" width="100"></el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="150">
                    <template scope="scope">
                        <el-button-group>
                          <el-button type="info" size="small" @click="detailPage(scope.$index, scope.row)">详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
        </el-table>
        <el-col class='toolbar'>
          <el-pagination style='float: right' @current-change="waitGoodsHandleCurrentChange" :current-page.sync="waitGoodsListPage" :page-size="20" layout="total, prev, pager, next" :total="waitGoodsTotalCount">
          </el-pagination>
        </el-col>
			</el-tab-pane> -->
		</el-tabs>
    <!-- 发货弹窗 -->
    <el-dialog title='商品发货' :visible.sync="sendGoodsFormVisible" :close-on-click-modal='false'>
        <el-form  label-width='100px' ref="examInfo1" >
					  <el-form-item label='收货地址' >
							  <el-input auto-complete='off'></el-input>
					  </el-form-item>
            <el-form-item label='快递公司' prop="op_user_id">
                <el-select v-model='item' style="width: 260px;" placeholder="请选择物流公司"  >
                  <el-option  v-for="item in logisticsCompanyList" :key="item" :label="item" :value="item">
                </el-option>
					    </el-select>
					  </el-form-item>
            <el-form-item label='快递单号' prop="app_user_id">
							<el-input  auto-complete='off'></el-input>
					  </el-form-item>
            <el-form-item label='注意' prop="description">
              <p>请仔细填写物流公司及快递单号，不可修改</p>
					  </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="close">取消</el-button>
            <el-button type="primary" >提交</el-button>
        </div>
    </el-dialog>
    <!-- 标记发货弹窗 -->
    <el-dialog title='标记发货' :visible.sync="flagSendGoodsFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'>
        <el-form-item label='订单号:' class="floatLeft">
            <span>{{this.filter.orderNo || "-"}}</span>
        </el-form-item>
        <el-form-item label='收货人姓名:' class="">
            <span>{{this.filter.userName || "-"}}</span>
        </el-form-item>
        <el-form-item label='收货人手机号:' class="floatLeft">
            <span>{{this.filter.mobile || "-"}}</span>
        </el-form-item>
        <el-form-item label='时间范围:' class="">
            <span>{{this.filter.time || "-"}}</span>
        </el-form-item>
        <el-form-item label='订单状态:' class="">
            <span>{{this.filter.orderStatus==2?'待付款':'' ||this.filter.orderStatus==3?'待发货':''||this.filter.orderStatus==4?'已发货':''||this.filter.orderStatus==8?'已完成':''||this.filter.orderStatus==7?'已关闭':''|| "全部"}}</span>
        </el-form-item>
        <el-form-item label='提示说明:'>
          <p>1,标记发货后，订单状态由“待发货”变为“已发货”。之后需要上传快递单号，才能显示快递进度</p>
          <p>2,以上操作仅限采购同学处理，请慎重操作</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="flagSendGoods">提交</el-button>
          <el-button @click="closeFlag">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 订单导出弹窗 -->
    <el-dialog title='订单导出' :visible.sync="exportOrdersFormVisible" :close-on-click-modal='false'>
      <el-form  label-width='100px'>
        <el-form-item label='订单号:' class="floatLeft">
            <span>{{this.filter.orderNo || "-"}}</span>
        </el-form-item>
        <el-form-item label='收货人姓名:' class="">
            <span>{{this.filter.userName || "-"}}</span>
        </el-form-item>
        <el-form-item label='收货人手机号:' class="floatLeft">
            <span>{{this.filter.mobile || "-"}}</span>
        </el-form-item>
        <el-form-item label='时间范围:' class="">
            <span>{{this.filter.time || "-"}}</span>
        </el-form-item>
        <el-form-item label='订单状态:' class="floatLeft">
          <span>{{this.filter.orderStatus==2?'待付款':'' ||this.filter.orderStatus==3?'待发货':''||this.filter.orderStatus==4?'已发货':''||this.filter.orderStatus==8?'已完成':''||this.filter.orderStatus==7?'已关闭':''|| "全部"}}</span>
        </el-form-item>
        <el-form-item label='订单维权状态:' class="">
            <span>{{this.filter.order_refund_stat==1?'同意退款':''||this.filter.order_refund_stat==2?'退款中':''||this.filter.order_refund_stat==3?'退款成功':''|| "全部"}}</span>
        </el-form-item>
        <el-form-item label='提示说明:'>
          <p>1,采购同学发货是，请先对订单进行“标记发货”再导出进行导出</p>
          <p>2,导出时请注意对订单状态的筛选条件，不要一次导出超过5000条的订单数据</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ordersExport">提交</el-button>
          <el-button @click="closeExport">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 隐藏的form表单 接收服务器发来的excel文件 用form表单的post进行请求 浏览器会自动下载 别的方式暂时不可以 -->
    <section>
      <form method="post" ref="oForm"></form>
    </section>
	</section>
</template>

<script>
// 引入工具包
import util from "../../common/js/util";
// axios
import { 
  getOrderList, 
  orderBatchSend, 
  expressGetByOrder,
  orderExprot,
  orderRefundList,
  orderBatchSendByTime
  } from "../../api/api";

export default {
  data() {
    return {
      // 过滤
      filter: {
        orderNo: "",
        userName: "",
        mobile: "",
        start_time: "",
        end_time: "",
        orderStatus: "",
        order_refund_stat:'',
        timeRange: "",
        time:''
      },
      first_page:1,
      tabIndex: "",
      orderStatus: "",
      timeRange: "",
      status: "",
      statusPower: "",
      item: "",
      classify: "",
      // 标记发货选择多项订单id集合
      selsList: [],
      orderIds:'',
      // 全部订单
      allListPage: 0,
      allTotalCount: 0,
      allList: [],
      // 代付款订单
      waitPayListPage: 0,
      waitPayTotalCount: 0,
      waitPayList: [],
      // 代发货订单
      waitGoodsListPage: 0,
      waitGoodsTotalCount: 0,
      waitGoodsList: [],
      // 已发货订单
      doneGoodsListPage: 0,
      doneGoodsTotalCount: 0,
      doneGoodsList: [],
      // 已完成订单
      doneListPage: 0,
      doneTotalCount: 0,
      doneList: [],
      // 已关闭订单
      closeListPage: 0,
      closeTotalCount: 0,
      closeList: [],
      // 退款中订单分页
      refundListPage: 0,
      refundTotalCount: 0,
      refundList: [],
      activeName: "virtual",
      // 标记发货弹窗
      flagSendGoodsFormVisible:false,
      // 订单导出弹窗
      exportOrdersFormVisible:false,
      // 发货弹窗初始化
      sendGoodsFormVisible: false,
      logisticsCompanyList: ["申通", "中通", "韵达", "邮政"],
      // 订单状态select
      statusOrderOptions: [
        {
          value: '',
          label: "全部"
        },
        {
          value: 2,
          label: "待付款"
        },
        {
          value: 3,
          label: "待发货"
        },
        {
          value: 4,
          label: "已发货"
        },
        {
          value: 8,
          label: "已完成"
        },
        {
          value: 7,
          label: "已关闭"
        },
        
      ],
      // 维权状态select
      statusPowerOptions: [
        {
          value: '',
          label: "全部"
        },
        {
          value: 1,
          label: "同意退款"
        },
        {
          value: 2,
          label: "退款中"
        },
        {
          value: 3,
          label: "退款成功"
        },
        
      ],
      // 发货初始化数据定义
      sendGoods: {
        order_ids: ""
      }
    };
  },
  methods: {
    // 打开标记发货弹窗
    openFlag(){
      if(this.filter.timeRange!=''&&this.filter.timeRange[0]!=null&&this.filter.timeRange[1]!=null){
        this.filter.time=util.formatDate.format(new Date(new Date(this.filter.timeRange[0]).getTime()), "yyyy/MM/dd   hh:mm:ss")+'-'+util.formatDate.format(new Date(new Date(this.filter.timeRange[1]).getTime()), "yyyy/MM/dd   hh:mm:ss")
      }else{
        this.filter.time='-'
      }
      this.flagSendGoodsFormVisible = true
    },
    // 打开导出弹窗
    openExport(){
      if(this.filter.timeRange!=''&&this.filter.timeRange[0]!=null&&this.filter.timeRange[1]!=null){
        this.filter.time=util.formatDate.format(new Date(new Date(this.filter.timeRange[0]).getTime()), "yyyy/MM/dd   hh:mm:ss")+'-'+util.formatDate.format(new Date(new Date(this.filter.timeRange[1]).getTime()), "yyyy/MM/dd   hh:mm:ss")
      }else{
        this.filter.time='-'
      }
      this.exportOrdersFormVisible = true
    },
    // 关闭标记发货弹窗
    closeFlag(){
      
      this.flagSendGoodsFormVisible = false
    },

    // 关闭导出弹窗
    closeExport(){
      this.exportOrdersFormVisible = false
    },

    // 标记发货获取多个订单id集合方法
    selsChange(sels) {
      let selsList = []
      for(let i=0;i<sels.length;i++){
        selsList.push(sels[i].entity.id)
      }
      this.orderIds = selsList.toString()
    },
    
    // 标记发货
    flagSendGoods(){
      if(this.orderIds){
        let para = {
          order_ids:this.orderIds
        }
        orderBatchSend(para)
          .then(res => {
            if (res.data.success) {
              this.flagSendGoodsFormVisible = false
              this.$notify({
                title: "成功",
                message: "标记发货成功",
                type: "success"
              });
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
      }else{
        let paraTime = {
          start_time: new Date(this.filter.timeRange[0]).getTime()||'',
          end_time: new Date(this.filter.timeRange[1]).getTime()||'',
          // order_no: this.filter.orderNo,
          // user_name: this.filter.userName,
          // phone: this.filter.mobile,
          order_stat: this.filter.orderStatus
        }
        orderBatchSendByTime(paraTime)
        .then(res => {
          if (res.data.success) {
            this.flagSendGoodsFormVisible = false
            this.$notify({
              title: "成功",
              message: "标记发货成功",
              type: "success"
            });
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

    // 批量导出
    ordersExport(){
      let params = '?start_time=' + (new Date(this.filter.timeRange[0]).getTime()?new Date(this.filter.timeRange[0]).getTime():'')+
       '&end_time=' + (new Date(this.filter.timeRange[1]).getTime()?new Date(this.filter.timeRange[1]).getTime():'')+
       '&order_stat='+this.filter.orderStatus
      // 借用隐藏的form表单提交数据 请求到excel进行下载
			this.$refs['oForm'].action = "/op/retailer/order/export" + params
			this.$refs['oForm'].methods = 'post'
			this.$refs['oForm'].submit()
      this.exportOrdersFormVisible = false
    },

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

    formatMoneyRefund(row, column) {
      let money = row.entity.refundPrice
      return money / 100 + "元";
    },

    // 清空筛选项
    handleIconClick_orderId() {
      this.filter.orderNo = "";
    },

    handleIconClick_name() {
      this.filter.userName = "";
    },

    handleIconClick_tel() {
      this.filter.mobile = "";
    },

    // 点击发货按钮方法
    sendGood(index, row) {
      this.sendGoodsFormVisible = true;
    },

    // 点击发货按钮取消
    close() {
      this.sendGoodsFormVisible = false;
    },

    // 点击详情按钮跳转到详情页
    detailPage(index, row) {
      if(this.classify == "6"){
        // console.log()
        this.$router.push({
          path: "/OrdersDetail",
          query: {
            orderNo: row.parsedOrder.entity.orderNo
          }
        });
      }else{
        this.$router.push({
          path: "/OrdersDetail",
          query: {
            orderNo: row.entity.orderNo
          }
        });
      }
      
    },

    // 全部订单分页操作
    allHandleCurrentChange(page) {
      let para = {
        page_index: page||first_page,
        order_stat: ''
      };
      this.loadAllList(para);
    },

    // 代付款订单分页操作
    waitPayHandleCurrentChange(page) {
      let para = {
        page_index: page,
        order_stat: '2'
      };
      this.loadWaitPayList(para);
    },

    // 代发货订单分页操作
    waitGoodsHandleCurrentChange(page) {
      let para = {
        page_index: page,
        order_stat: '3'
      };
      this.loadWaitGoodsList(para);
    },

    // 已发货订单分页操作
    doneGoodsHandleCurrentChange(page) {
      let para = {
        page_index: page,
        order_stat: '4'
      };
      this.loadDoneGoodsList(para);
    },

    // 已完成订单分页操作
    doneHandleCurrentChange(page) {
      let para = {
        page_index: page,
        order_stat: '8'
      };
      this.loadDoneList(para);
    },

    // 已关闭订单分页操作
    closeHandleCurrentChange(page) {
      let para = {
        page_index: page,
        order_stat: '7'
      };
      this.loadCloseList(para);
    },

    // 退款中订单分页操作
    refundHandleCurrentChange(page) {
      let para = {
        page_index: page,
        // order_stat: '6'
      };
      this.loadRefundList(para);
    },

    // 订单tab切换方法
    tabsClick(tab, event) {
      let para = {
        order_stat: tab.name,
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: new Date(this.filter.timeRange[0]).getTime() || '',
        end_time: new Date(this.filter.timeRange[1]).getTime() || '',
      };
      let para1 = {
        order_refund_stat: "",
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: new Date(this.filter.timeRange[0]).getTime() || '',
        end_time: new Date(this.filter.timeRange[1]).getTime() || '',
      };
      if (para.order_stat == 2) {
        this.classify = "2";
        this.loadWaitPayList(para);
      } else if (para.order_stat == 3) {
        this.classify = "3";
        this.loadWaitGoodsList(para);
      } else if (para.order_stat == 4) {
        this.classify = "4";
        this.loadDoneGoodsList(para);
      } else if (para.order_stat == 5) {
        this.classify = "5";
        this.loadDoneList(para);
      } else if (para.order_stat == 7) {
        this.classify = "7";
        this.loadCloseList(para);
      } else if (para.order_stat == 8) {
        this.classify = "8";
        this.loadDoneList(para);
      } 
      else if (para.order_stat == 6) {
        this.classify = "6";
        this.loadRefundList(para1);
      } 
      else if (para.order_stat == "" || para.order_stat == 0) {
        para.order_stat = ''
        this.classify = "0";
        this.loadAllList(para);
      } else {
        this.classify = "0";
        this.loadAllList(para);
      }
    },

    // 点击筛选按钮事件--- 首先判断筛选订单的状态是什么 同时点击筛选按钮后跳到对应的tab
    loadSelectOrderList() {
      let para = {
        page_index: 1,
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: new Date(this.filter.timeRange[0]).getTime() || '',
        end_time: new Date(this.filter.timeRange[1]).getTime() || '',
        order_stat: this.filter.orderStatus
      };
      let para1 = {
        page_index: 1,
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: new Date(this.filter.timeRange[0]).getTime() || '',
        end_time: new Date(this.filter.timeRange[1]).getTime() || '',
        order_refund_stat: this.filter.order_refund_stat
      };
     if (para.order_stat == 2) {
        this.classify = "2";
        this.loadWaitPayList(para);
      } else if (para.order_stat == 3) {
        this.classify = "3";
        this.loadWaitGoodsList(para);
      } else if (para.order_stat == 4) {
        this.classify = "4";
        this.loadDoneGoodsList(para);
      } else if (para.order_stat == 5) {
        this.classify = "5";
        this.loadDoneList(para);
      } else if (para.order_stat == 7) {
        this.classify = "7";
        this.loadCloseList(para);
      } else if (para.order_stat == 8) {
        this.classify = "8";
        this.loadDoneList(para);
      } else if (para.order_stat == ""&&para1.order_refund_stat=='' ) {
        this.classify = "0";
        this.loadAllList(para);
      } else if (para1.order_refund_stat == 1 ||para1.order_refund_stat == 2|| para1.order_refund_stat == 3  ) {
        this.classify = "6";
        this.loadRefundList(para1);
      } else {
        this.classify = "0";
        this.loadAllList(para);
      }
    },

    // 最近7天
    loadSelectOrderListAbout7() {
      let timeEnd = Date.parse(new Date());
      let timeStart = timeEnd - 86400000 * 7;
      let para = {
        page_index: 1,
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: timeStart,
        end_time: timeEnd,
        order_stat: this.filter.orderStatus
      };
      this.classify = "0";
      this.loadAllList(para);
    },

    // 最近30天
    loadSelectOrderListAbout30() {
      let timeEnd = Date.parse(new Date());
      let timeStart = timeEnd - 86400000 * 30;
      let para = {
        page_index: 1,
        order_no: this.filter.orderNo,
        user_name: this.filter.userName,
        phone: this.filter.mobile,
        start_time: timeStart,
        end_time: timeEnd,
        order_stat: this.filter.orderStatus
      };
      this.classify = "0";
      this.loadAllList(para);
    },

    // 主列表查询方法
    loadAllList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            // 全部订单
            this.allListPage = res.data.data.page;
            this.allTotalCount = res.data.data.totalCount;
            this.allList = orderList;
          } else {
            this.allList = [];
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
    // 代付款订单
    loadWaitPayList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            this.waitPayListPage = res.data.data.page;
            this.waitPayTotalCount = res.data.data.totalCount;
            this.waitPayList = orderList;
          } else {
            this.waitPayList = [];
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
    // 代发货订单
    loadWaitGoodsList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            this.waitGoodsListPage = res.data.data.page;
            this.waitGoodsTotalCount = res.data.data.totalCount;
            this.waitGoodsList = orderList;
          } else {
            this.waitGoodsList = [];
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
    // 已发货订单
    loadDoneGoodsList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            this.doneGoodsListPage = res.data.data.page;
            this.doneGoodsTotalCount = res.data.data.totalCount;
            this.doneGoodsList = orderList;
          } else {
            this.doneGoodsList = [];
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
    // 已完成订单
    loadDoneList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            this.doneListPage = res.data.data.page;
            this.doneTotalCount = res.data.data.totalCount;
            this.doneList = orderList;
          } else {
            this.doneList = [];
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
    // 已关闭订单
    loadCloseList(para) {
      getOrderList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
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
            }
            this.closeListPage = res.data.data.page;
            this.closeTotalCount = res.data.data.totalCount;
            this.closeList = orderList;
          } else {
            this.closeList = [];
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
    // 退款中订单
    loadRefundList(para) {
      orderRefundList(para)
        .then(res => {
          if (res.data.success) {
            let orderList = res.data.data.items
            if (orderList && orderList.length) {
              orderList.map((item, index) => {
                if(item.entity.refundStat==0){
                  item.entity.refundStat='退款创建，申请退款'
                }else if(item.entity.refundStat==1){
                  item.entity.refundStat='同意退款'
                }else if(item.entity.refundStat==2){
                  item.entity.refundStat='退款中'
                }else if(item.entity.refundStat==3){
                  item.entity.refundStat='退款成功'
                }else if(item.entity.refundStat==4){
                  item.entity.refundStat='拒绝退款'
                }else if(item.entity.refundStat==5){
                  item.entity.refundStat='退款关闭'
                }
              });
            }
            this.refundListPage = res.data.data.page;
            this.refundTotalCount = res.data.data.totalCount;
            this.refundList = res.data.data.items;
          } else {
            this.refundList = [];
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
    let para = {
      page_index: 1
    };
    this.loadAllList(para);
  }
};
</script>
<style lang="less" scoped>
.ulTop {
  .liTop {
    // float: left;
    display: inline-block;
    width: 165px;
    text-align: center;
    font-weight: 700;
    margin-left: 20px;
    margin-bottom: 10px;
  }
}
.ulTop1 {
  li {
    margin-left: 74px;
    .liTop1 {
      display: inline-block;
      width: 185px;
      margin-bottom: 10px;
      .img {
        width: 50px;
        vertical-align: middle;
      }
    }
  }
}
.floatLeft{
  float: right;
}
</style>