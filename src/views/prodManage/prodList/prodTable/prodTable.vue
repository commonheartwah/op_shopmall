<template>
    <div class="prodTable">
        <div class="prodTable_right" v-if="openType == 1">
            <el-button type="primary" @click="soldOutEvent">下架商品</el-button>
            <i class="prodTable_i"></i>
            <el-button type="primary" @click="stopSalesEvent">暂停销售</el-button>
            <el-button type="primary" @click="salesEvent">恢复销售</el-button>
        </div>
        <div class="prodTable_right" v-if="openType == 2">
            <el-button type="primary" @click="putAwayEvent">上架商品</el-button>
        </div>
        <div class="prodList_table">
            <el-table :data='skuData' v-loading='listLoading' @selection-change="handleSelectionChange" style='width: 100%;' border stripe>

                <el-table-column type="selection" prop="checkBox" label="" width="80"></el-table-column>

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

                <el-table-column prop='entity.saleShow' label='当前销售状态' align='center' show-overflow-tooltip v-if="openType == 1">
                    <template slot-scope="scope">
                        <span :class="{cellClassName:scope.row.entity.saleShow == '暂停售卖'}">{{scope.row.entity.saleShow}}</span>
                    </template>
                </el-table-column>

                <el-table-column label='操作' width="230" align='center'>
                    <template scope='scope'>
                        <el-button size='small' type="text" @click='edit(scope.$index, scope.row)'>{{openType == 1 ? '查看':'编辑'}}</el-button>
                        <!-- <el-button slot="reference" size='small' type="text" @click='preview(scope.$index, scope.row)'>预览链接</el-button> -->
                        <el-popover placement="bottom" title="商业详情页链接" width="260" trigger="click">
                            <div class="popover_main">
                                <p class="popover_main_p">{{scope.row.entity.previewLink}}</p>
                                <div class="popover_main_div">
                                    <el-button class="popover_main_btn" type="primary" size="mini" v-clipboard:copy="scope.row.entity.previewLink" v-clipboard:success="onCopy"
                                        v-clipboard:error="onError">复制</el-button>
                                </div>
                            </div>
                            <el-button slot="reference" size='small' type="text" @click='preview(scope.$index, scope.row)'>预览链接</el-button>
                        </el-popover>
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
    import prodTable from './prodTable.js';
    export default {
        ...prodTable
    }

</script>

<style scoped lang="scss">
    @import "./prodTable.scss";

</style>
