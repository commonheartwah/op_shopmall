<template>
  <section>
    <el-row class="topStyle">
      温馨提示:
      <p>1,批量退款为财务同学确认已经给用户打款后，执行的操作。每次批量退款的退款订单号不超过50个。</p>
      <p>2,退款后，订单状态为【已关闭】</p>
    </el-row>
    <el-row class="midStyle">
      <el-button type='primary' @click.native="addRefundFormVisible">新增退款记录</el-button>
    </el-row>
    <el-row>
      <!-- 批量退款订单列表 -->
      <el-table :data="tableData3" :default-expand-all='false' border style="width: 100%" >
        <el-table-column prop="entity.id" label="序号" align="center"></el-table-column>
        <el-table-column prop="entity.start" label="退款单号" align="center"></el-table-column>
        <el-table-column prop="entity.shouhou" label="状态" align="center"></el-table-column>
        <el-table-column prop="entity.peo" label="退款时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
            <template scope="scope">
                <el-button-group>
                  <el-button type="text" size="small" @click="refundFormVisible(scope.$index, scope.row)">查看详情</el-button>
                </el-button-group>
            </template>
        </el-table-column>
      </el-table>
      <!-- 批量退款订单列表分页 -->
      <el-col class='toolbar'>
        <el-pagination style='float: right' @current-change="handleCurrentChange" :current-page.sync="allListPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增退款弹窗 -->
    <el-dialog title='批量退款' :visible.sync="batchRefundFormVisible" :close-on-click-modal='false'>
        <el-form  label-width='100px'>
          <el-form-item label='批量退款单号' >
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 40}" placeholder="请输入退款单号，每次不超过50个，以英文逗号分隔"></el-input>
          </el-form-item>
          <el-form-item label='注意'>
            <p>请先线下执行退款操作,确认退款后，订单为[已关闭]状态</p>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="close">取消</el-button>
            <el-button type="primary" >提交</el-button>
        </div>
    </el-dialog>
    <!-- 批量退款详情弹窗 -->
    <el-dialog title='批量退款详情' :visible.sync="batchRefundDetailFormVisible" :close-on-click-modal='false'>
        <el-form  label-width='100px'>
          <el-form-item label='退款失败单号'>
            <p>2个</p>
          </el-form-item>
          <el-form-item label='退款失败单号' >
              <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 40}"></el-input>
          </el-form-item>
          <el-form-item label='退款成功单号'>
            <p>48个</p>
          </el-form-item>
          <el-form-item label='退款成功单号' >
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 40}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="closeDetail">取消</el-button>
            <el-button type="primary" >提交</el-button>
        </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      // 批量退款弹窗
      batchRefundFormVisible: false,
      batchRefundDetailFormVisible: false,
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
    handleCurrentChange() {},
    // 点击批量退款按钮取消
    close() {
      this.batchRefundFormVisible = false;
    },
    // 点击批量退款详情按钮取消
    closeDetail() {
      this.batchRefundDetailFormVisible = false;
    },
    // 点击新增批量退款记录按钮
    addRefundFormVisible() {
      this.batchRefundFormVisible = true;
    },
    // 点击详情按钮
    refundFormVisible(index, row) {
      this.batchRefundDetailFormVisible = true;
    }
  }
};
</script>

<style>
.topStyle {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
.midStyle {
  margin: 0 0 10px 0;
}
</style>