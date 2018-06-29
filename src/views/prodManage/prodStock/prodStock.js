/*
 * @Author: MuNaipeng
 * @Date: 2018-05-17 16:10:14
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-05-21 17:37:13
 */
import {
    getSkuList,
    stockUpdate
} from '../../../api/api';
import util from '../../../common/js/util';
export default {
    data() {
        return {
            index: '1',
            activeName: 'first',
            stockData: [],
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            listLoading: false,
            dialogVisible: false,
            stockNum: {
                present: 121,
                after: '',
            },
            editType: '2',
            editAdd: 100,
            editReduce: 100,
            filterMultiple: false,
        }
    },
    /**
     * @description 初始化
     * @author MuNaipeng
     */
    mounted() {
        this.init();
    },
    methods: {

        /**
         * @description 页面初始化方法
         * @author MuNaipeng
         */
        init() {
            this.listLoading = true;
            getSkuList({
                    shelf_type: this.index,
                    page_size: this.pageSize,
                    page_index: this.currentPage,
                })
                .then(res => {
                    this.listLoading = false;
                    if (res.data.success) {
                        console.log(res.data);
                        res.data.data.items.forEach(el => {
                            el.entity.stockNumberShow = !!el.entity.stockNumber ? el.entity.stockNumber : '已售罄';
                            el.entity.createTime = util.formatDate.format(new Date(el.entity.ct), "yyyy/MM/dd   hh:mm:ss");
                        });
                        this.stockData = res.data.data.items;
                        console.log(this.stockData)
                        this.totalCount = res.data.data.totalCount;
                    } else {
                        this.$notify.error(res.data.msg);
                    }
                })

        },

        /**
         * @description tab切换
         * @author MuNaipeng
         * @param {any} b
         */
        handleClick(b) {
            console.log('tab切换');
            console.log(b.index);
            this.index = b.index == 1 ? '0' : '1';
            this.init();
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
            console.log('改变初始页数')
        },

        /**
         * @description 计算库存
         * @author MuNaipeng
         * @param {any} type
         */
        editTypeChange(type) {
            if (type == 2) {
                this.stockNum.after = (this.stockNum.present - 0) + (this.editAdd - 0);
            } else {
                this.stockNum.after = (this.stockNum.present - 0) - (this.editReduce - 0);
            }
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
         * @description 点击编辑
         * @author MuNaipeng
         * @param {any} index
         * @param {any} row
         */
        edit(index, row) {
            console.log('点击编辑');
            console.log(index);
            console.log(row);
            this.sku_id = row.entity.id;
            this.dialogVisible = true;
            this.stockNum.present = !!row.entity.stockNumber ? row.entity.stockNumber : 0;
        },

        /**
         * @description 编辑库存确认
         * @author MuNaipeng
         * @returns
         */
        stockUpdateEvent() {
            console.log('确定');
            if (this.stockNum.after < 0) {
                this.$message.warning('调整后库存不能小于0');
                return;
            }
            stockUpdate({
                    sku_id: this.sku_id,
                    type: this.editType,
                    stock: this.editType == 1 ? this.editReduce : this.editAdd,
                })
                .then(res => {
                    if (res.data.success) {
                        this.$message.success('调整库存成功！');
                        this.init();
                    } else {
                        this.$notify.error(res.data.msg);
                    }
                })
            this.dialogVisible = false;
        },

        /**
         * @description 弹窗关闭
         * @author MuNaipeng
         */
        closeDialog() {
            this.clear();
        },

        /**
         * @description 弹窗内容初始化
         * @author MuNaipeng
         */
        clear() {
            this.editType = '2';
            this.editAdd = 100;
            this.editReduce = 100;
        }
    },
}
