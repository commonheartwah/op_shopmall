/*
 * @Author: MuNaipeng
 * @Date: 2018-05-15 10:45:59
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-06-05 12:11:47
 */
import {
    getSkuList,
    batchShelf,
    batchSale
} from '../../../../api/api';
import util from '../../../../common/js/util';
export default {
    props: ['openType'],
    data() {
        return {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            skuData: [],
            listLoading: false,
            idArr: [],
            filterMultiple: false,
        }
    },

    /**
     * @description 初始化
     * @author MuNaipeng
     */
    mounted() {
        console.log(this.openType)
        this.init();
    },
    methods: {

        /**
         * @description sku列表初始化
         * @author MuNaipeng
         */
        init() {
            this.listLoading = true;
            getSkuList({
                    shelf_type: this.openType == 1 ? '1' : '0',
                    page_size: this.pageSize,
                    page_index: this.currentPage,
                })
                .then(res => {
                    this.listLoading = false;
                    if (res.data.success) {
                        console.log(res.data);
                        res.data.data.items.forEach(el => {
                            el.entity.saleShow = el.entity.saleType == 1 ? '售卖中' : '暂停售卖';
                            el.entity.stockNumberShow = !!el.entity.stockNumber ? el.entity.stockNumber : '已售罄';
                            el.entity.createTime = util.formatDate.format(new Date(el.entity.ct), "yyyy/MM/dd   hh:mm:ss");
                            el.entity.previewLink = `http://mall.babyfs.cn/m_retailer/preview?skuId=${ el.entity.id}`;
                        });
                        this.skuData = res.data.data.items;
                        this.totalCount = res.data.data.totalCount;
                    } else {
                        this.$notify.error(res.data.msg);
                    }
                })
        },

        /**
         * @description 编辑
         * @author MuNaipeng
         * @param {any} index
         * @param {any} row
         */
        edit(index, row) {
            console.log(row);
            this.$router.push({
                path: '/prodCreate',
                name: '创建商品',
                params: {
                    openType: this.openType,
                    dataObj: {
                        name: row.entity.name,
                        description: row.entity.description,
                        code: row.entity.code,
                        bar_code: row.entity.barCode,
                        price: row.entity.price,
                        vip_price: row.entity.vipPrice,
                        line_price: row.entity.linePrice,
                        cover_url: row.entity.coverUrl,
                        id: row.entity.id,
                        type: row.entity.type,
                        spu_id: row.entity.spuId,
                        stockNumberShow: row.entity.stockNumberShow,
                        express_price: 0,
                        condition: 1,
                        checked: true,
                    }
                }
            })
        },

        /**
         * @description 预览
         * @author MuNaipeng
         * @param {any} index
         * @param {any} row
         */
        preview(index, row) {
            console.log(row);
        },

        /**
         * @description 复制
         * @author MuNaipeng
         * @param {any} e
         */
        onCopy(e) {
            var doc = document.getElementsByClassName("prodTable")[0];
            doc.click();
            console.log('你刚刚复制: ' + e.text)
            this.$message.success('复制成功！');
        },

        /**
         * @description 复制错误回调
         * @author MuNaipeng
         * @param {any} e
         */
        onError(e) {
            console.log('无法复制文本！');
            this.$message.error('无法复制文本！');
        },

        /**
         * @description size
         * @author MuNaipeng
         * @param {any} size
         */
        handleSizeChange(size) {
            console.log(size);
            this.pageSize = size;
            this.init();
            console.log('改变每页条数')
        },

        /**
         * @description page
         * @author MuNaipeng
         * @param {any} current
         */
        handleCurrentChange(current) {
            console.log(current);
            this.currentPage = current;
            this.init();
            console.log('改变初始页数');
        },

        /**
         * @description checkBox
         * @author MuNaipeng
         * @param {any} selection
         * @param {any} row
         */
        handleSelectionChange(selection, row) {
            console.log('tablecheckbox');
            console.log(selection);
            this.idArr = [];
            selection.forEach(ele => {
                this.idArr.push(ele.entity.id);
            });
        },

        /**
         * @description 列表筛选
         * @author MuNaipeng
         * @param {any} value
         * @param {any} row
         * @returns
         */
        filterTag(value, row) {
            console.log(value)
            console.log(row)
            return value == (row.entity.stockNumberShow == '已售罄' ? '0' : '1');
        },

        /**
         * @description 下架
         * @author MuNaipeng
         * @returns
         */
        soldOutEvent() {
            if (this.idArr.length == 0) {
                this.$message({
                    message: '请至少勾选一个想要下架的商品',
                    type: 'warning'
                });
                return;
            };
            this.$confirm('确定下架商品吗?下架后的商品在用户端不可见', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                console.log('confirm');
                const idStr = this.idArr.join(',');
                batchShelf({
                        ids: idStr,
                        shelf_type: 0
                    })
                    .then(res => {
                        if (res.data.success) {
                            this.init();
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                    })
            }).catch(err => err);

        },

        /**
         * @description 上架
         * @author MuNaipeng
         * @returns
         */
        putAwayEvent() {
            console.log(this.idArr);
            if (this.idArr.length == 0) {
                this.$message({
                    message: '请至少勾选一个想要上架的商品',
                    type: 'warning'
                });
                return;
            };

            this.$confirm('确定上架商品吗?商品上架后用户可以正常购买商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                const idStr = this.idArr.join(',');
                batchShelf({
                        ids: idStr,
                        shelf_type: 1
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            this.init();
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                    })
            }).catch(err => err);

        },

        /**
         * @description 暂停销售
         * @author MuNaipeng
         * @returns
         */
        stopSalesEvent() {
            console.log(this.idArr);
            if (this.idArr.length == 0) {
                this.$message({
                    message: '请至少勾选一个想要暂停销售的商品',
                    type: 'warning'
                });
                return;
            };

            this.$confirm('确定暂停销售吗?暂停销售后用户将无法继续购买商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                const idStr = this.idArr.join(',');
                batchSale({
                        ids: idStr,
                        sale_type: 0
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            this.init();
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                    })
            }).catch(err => err);
        },

        /**
         * @description 恢复销售
         * @author MuNaipeng
         * @returns
         */
        salesEvent() {
            console.log(this.idArr);
            if (this.idArr.length == 0) {
                this.$message({
                    message: '请至少勾选一个想要恢复销售的商品',
                    type: 'warning'
                });
                return;
            };

            this.$confirm('确定恢复销售吗?恢复销售后用户可以继续购买商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                const idStr = this.idArr.join(',');
                batchSale({
                        ids: idStr,
                        sale_type: 1
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            this.init();
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                    })
            }).catch(err => err);

        },

    },
}
