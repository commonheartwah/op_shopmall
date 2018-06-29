// 登录注册404
import Login from './views/Login'
import NotFound from './views/404'
import Home from './views/Home'

// 后台管理
import BackMemberList from './views/backManage/BackMemberList'
import BackRoleList from './views/backManage/BackRoleList'
import RolesPerm from './views/backManage/RolesPerm'


// 商品管理
import spuManage from './views/prodManage/spuManage/spuManage.vue';
import spuAdd from './views/prodManage/spuAdd/spuAdd.vue';
import prodList from './views/prodManage/prodList/prodList.vue';
import prodCreate from './views/prodManage/prodCreate/prodCreate.vue';
import prodStock from './views/prodManage/prodStock/prodStock.vue';
import category from './views/prodManage/category/category.vue';

// 订单管理
import OrdersList from './views/ordersManage/ordersList.vue'
import BatchRefund from './views/ordersManage/batchRefund.vue'
import BatchDelivery from './views/ordersManage/batchDelivery.vue'
import BatchDeliveryDetailList from './views/ordersManage/batchDeliveryDetailList.vue'
import OrdersDetail from './views/ordersManage/ordersDetail.vue'
import SendGoodsDetail from './views/ordersManage//sendGoodsDetail.vue'

// 分销管理
import DistributionList from './views/distributionManage/distributionList.vue'
import DistributionConfig from './views/distributionManage/distributionConfig.vue'

// 统计
import DistributionOrder from './views/statistics/distributionOrder.vue'
import DistributionGoods from './views/statistics/distributionGoods.vue'
import Action from './views/statistics/action.vue'
import FinanceReport from './views/statistics/financeReport.vue'
import FinanceReportDetail from './views/statistics/financeReportDetail.vue'
import StatisticM from './views/statistics/statisticM.vue'

// let or const 影响
const routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-tasks fa-fw',
        children: [
            { path: '/category', component: category, name: '类目管理' },
            { path: '/spuManage', component: spuManage, name: 'SPU管理' },
            { path: '/spuAdd', component: spuAdd, name: 'SPU创建', hidden: true },
            { path: '/prodCreate', component: prodCreate, name: '创建商品', hidden: true },
            { path: '/prodList', component: prodList, name: '商品管理' },
            { path: '/prodStock', component: prodStock, name: '库存管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-credit-card-alt fa-fw',
        children: [
            { path: '/ordersList', component: OrdersList, name: '所有订单' },
            { path: '/batchDelivery', component: BatchDelivery, name: '批量发货' },
            { path: '/batchRefund', component: BatchRefund, name: '批量退款', hidden: true },
            { path: '/ordersDetail', component: OrdersDetail, name: '订单详情页', hidden: true },
            { path: '/batchDeliveryDetailList', component: BatchDeliveryDetailList, name: '批量发货详情页', hidden: true },
            { path: '/sendGoodsDetail', component: SendGoodsDetail, name: '发货详情' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分销管理',
        iconCls: 'fa fa-edit fa-fw',
        children: [
            { path: '/distributionList', component: DistributionList, name: '分销管理' },
            { path: '/distributionConfig', component: DistributionConfig, name: '分销配置', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计管理',
        iconCls: 'fa fa-table fa-fw',
        children: [
            { path: '/distributionOrder', component: DistributionOrder, name: '订单分析' },
            { path: '/distributionGoods', component: DistributionGoods, name: '商品分析' },
            { path: '/financeReport', component: FinanceReport, name: '财务报表' },
            { path: '/financeReportDetail', component: FinanceReportDetail, name: '财务报表明细', hidden: true },
            { path: '/action', component: Action, name: '行为统计' },
            { path: '/statisticM', component: StatisticM, name: 'M0&M1统计' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '后台管理',
    //     iconCls: 'fa fa-user-plus fa-fw',
    //     children: [
    //         { path: '/backMember', component: BackMemberList, name: '后台用户列表' },
    //         { path: '/backRole', component: BackRoleList, name: '后台角色列表' },
    //         { path: '/rolePerm', component: RolesPerm, name: '后台用户权限', hidden: true }
    //     ]
    // },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
    }
]
export default routes;