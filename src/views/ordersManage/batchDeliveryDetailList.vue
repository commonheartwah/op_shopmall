<template>
  <section>
    <el-row class="topStyle">
      发货成功订单333个，失败20个
    </el-row>
    <el-row>
      <!-- 批量发货订单列表详情页 -->
      <el-table :data="tableData3" :default-expand-all='false' border style="width: 100%" >
        <el-table-column prop="entity.id" label="序号" align="center"></el-table-column>
        <el-table-column prop="entity.id" label="订单号" align="center"></el-table-column>
        <el-table-column prop="entity.peo" label="失败原因" align="center"></el-table-column>
      </el-table>
      <!-- 批量发货订单列表详情页分页 -->
      <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="handleCurrentChange" :current-page.sync="allListPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      allListPage: 1,
      totalCount: 1,
      tableData3: [
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王大哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王2哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王3哈",
            status: "已发货",
            start: "2018-04-28-15-19",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王4哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王5哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王6哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        },
        {
          entity: {
            id: 201804281111,
            sum: 1,
            shouhou: "售后",
            peo: "王7哈",
            status: "已发货",
            start: "2018-04-28-15-15",
            money: 3000,
            zhushi: "无注释"
          }
        }
      ]
    };
  },
  methods: {
    handleCurrentChange() {}
  }
};
</script>
