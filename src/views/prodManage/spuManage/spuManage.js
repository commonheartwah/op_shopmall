/*
 * @Author: MuNaipeng
 * @Date: 2018-05-17 16:14:48
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-05-22 15:57:48
 */
import {
    getSpuList
} from '../../../api/api';
export default {
    data() {
        return {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
            spuData: [],
            listLoading: false,
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
         * @description 列表初始化方法
         * @author MuNaipeng
         */
        init() {
            this.listLoading = true;
            getSpuList({
                    page_size: this.pageSize,
                    page_index: this.currentPage,
                })
                .then(res => {
                    this.listLoading = false;
                    if (res.data.success) {
                        res.data.data.items.forEach(el => {
                            el.entity.statusShow = el.entity.stat == 1 ? '有效' : '无效';
                            el.entity.typeShow = el.entity.type == 1 ? '实物' : '虚拟';
                        });
                        this.spuData = res.data.data.items;
                        this.totalCount = res.data.data.totalCount;
                    } else {
                        this.$notify.error(res.data.msg);
                    }
                })
        },

        /**
         * @description 创建Spu
         * @author MuNaipeng
         */
        addSpuEvent() {
            this.$router.push({
                path: '/spuAdd',
                name: 'SPU创建',
            })
        },

        /**
         * @description 编辑Spu
         * @author MuNaipeng
         * @param {any} index
         * @param {any} row
         */
        edit(index, row) {
            this.$router.push({
                path: '/spuAdd',
                name: 'SPU创建',
                params: {
                    openType: 1,
                    dataObj: {
                        category_id: row.entity.categoryId,
                        content: row.entity.content,
                        description: row.entity.description,
                        name: row.entity.name,
                        status: row.entity.stat,
                        type: row.entity.type,
                        id: row.entity.id,
                        ancestorIds: row.entity.ancestorIds
                    }
                }
            })
        },

        /**
         * @description 创建商品
         * @author MuNaipeng
         * @param {any} index
         * @param {any} row
         */
        addProdEvent(index, row) {
            console.log(row);
            this.$router.push({
                path: '/prodCreate',
                name: '创建商品',
                params: {
                    spuId: row.entity.id
                }
            })
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

    }
}
