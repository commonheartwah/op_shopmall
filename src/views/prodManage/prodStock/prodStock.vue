<template>
    <div class="prodStock">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="上架中" name="first"></el-tab-pane>
            <el-tab-pane label="已下架" name="second"></el-tab-pane>
        </el-tabs>
        <div class="prodStock_table">
            <el-table :data='stockData' v-loading='listLoading' style='width: 100%;' border stripe>
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="entity.coverUrl" label="商品" width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.entity.coverUrl" alt="" style="width: 50px;height: 50px;margin-top:10px;">
                    </template>
                </el-table-column>

                <el-table-column prop='entity.name' label='商品名称' width='140' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.spuName' label='spu名称' width='140' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.code' label='商品编码' width='140' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.stockNumberShow' label='库存' align='center' show-overflow-tooltip :filters="[{ text: '已售罄', value: '0' }, { text: '未售罄', value:'1'  }]"
                    :filter-method="filterTag" :filter-multiple="filterMultiple">
                    <template slot-scope="scope">
                        <el-tag type="danger" disable-transitions v-if="scope.row.entity.stockNumberShow == '已售罄'">{{scope.row.entity.stockNumberShow}}</el-tag>
                        <span v-else>{{scope.row.entity.stockNumberShow}}</span>
                        <!-- <el-tag :type="scope.row.entity.stockNumberShow == '已售罄' ? 'danger' : 'primary'" disable-transitions>{{scope.row.entity.stockNumberShow}}</el-tag> -->
                    </template>
                </el-table-column>

                <el-table-column prop='entity.createTime' label='创建时间' align='center' show-overflow-tooltip sortable></el-table-column>

                <el-table-column label='操作' width="230" align='center'>
                    <template scope='scope'>
                        <el-button size='small' type="text" @click='edit(scope.$index, scope.row)'>编辑库存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="prodStock_page">
            <el-pagination background layout="sizes,prev, pager, next" :total="totalCount" :page-size="pageSize" :page-sizes="[10, 20,30, 40]"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
        <!-- 编辑库存 -->
        <el-dialog title="编辑库存：" :visible.sync="dialogVisible" @close="closeDialog" width="30%" class="edit_dialog">
            <div>
                <el-form :inline="true" :model="stockNum">
                    <el-form-item label="当前库存数：">
                        <span>{{stockNum.present}}</span>
                    </el-form-item>
                    <el-form-item class="stockNum_after" label="调整后库存数：">
                        <span>{{stockNum.after}}</span>
                    </el-form-item>
                </el-form>
                <i class="edilt_line"></i>
                <dl>
                    <dt>库存调整：</dt>
                    <dd>
                        <el-radio v-model="editType" :change="editTypeChange(editType)" label="2">增加</el-radio>
                        <el-input class="editStockType_input" v-model="editAdd" placeholder=""></el-input>
                        <span>件</span>
                    </dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>
                        <el-radio v-model="editType" label="1">减少</el-radio>
                        <el-input class="editStockType_input" v-model="editReduce" placeholder=""></el-input>
                        <span>件</span>
                    </dd>
                </dl>
                <dl>
                    <dt></dt>
                    <dd>库存减少为0时，商品放入【已售罄】列表</dd>
                </dl>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="stockUpdateEvent">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import prodStock from "./prodStock";
    export default {
        ...prodStock
    }

</script>

<style scoped lang="scss">
    @import "./prodStock.scss";

</style>
