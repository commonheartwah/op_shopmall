/*
 * @Author: MuNaipeng
 * @Date: 2018-05-17 16:07:54
 * @Last Modified by:   MuNaipeng
 * @Last Modified time: 2018-05-17 16:07:54
 */
import prodTable from "./prodTable/prodTable.vue";
export default {
    components: {
        prodTable,
    },
    data() {
        return {
            activeName: 'first',
            tableType: '',
            prodTable: 0,
        }
    },
    methods: {

        /**
         * @description tab切换
         * @author MuNaipeng
         * @param {any} b
         */
        handleClick(b) {
            console.log('tab切换');
            console.log(b.index);
            this.prodTable = b.index;
        },

        /**
         * @description 路由参数获取
         * @author MuNaipeng
         */
        getParams() {
            // 取到路由带过来的参数
            console.log('接收跳回');
            // 取到路由带过来的参数
            let routerParams = this.$route.params;
            console.log(routerParams);
            const arr = Object.keys(routerParams);
            console.log(arr)
            if (arr.length > 0) {
                // 将数据放在当前组件的数据内
                if (routerParams.type == 0 || routerParams.type == 2) {
                    console.log('2')
                    this.activeName = 'second';
                    this.prodTable = 1;
                } else {
                    console.log('1')
                    this.activeName = 'first';
                    this.prodTable = 0;
                }
            }

        }

    },

    /**
     * @description 初始化
     * @author MuNaipeng
     */
    mounted() {
        this.getParams();
    },
}
