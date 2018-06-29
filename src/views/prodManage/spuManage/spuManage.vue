<template>
    <div class="spuManage">
        <div class="spuManage_right">
            <el-button type="primary" @click="addSpuEvent">创建SPU</el-button>
        </div>
        <div class="prodList_table">
            <el-table :data='spuData' v-loading='listLoading' style='width: 100%;' border stripe>

                <el-table-column prop='entity.categoryName' label='类目' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.name' label='名称' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.typeShow' label='类型' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.statusShow' label='状态' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column label='操作' width="230" align='center'>
                    <template scope='scope'>
                        <el-button size='small' type="text" @click='edit(scope.$index, scope.row)'>编辑</el-button>
                        <el-button size='small' type="text" @click='addProdEvent(scope.$index, scope.row)'>创建商品</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="prodList_page">
            <el-pagination background layout="sizes,prev, pager, next" :total="totalCount" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import spuManage from './spuManage.js';
    export default {
        ...spuManage
    }

</script>

<style scoped lang="scss">
    @import "./spuManage.scss";

</style>
