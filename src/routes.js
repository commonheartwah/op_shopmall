// 登录注册404
import Login from './views/Login'
import NotFound from './views/404'
import Home from './views/Home'

// 后台管理
import BackMemberList from './views/backManage/BackMemberList'
import BackRoleList from './views/backManage/BackRoleList'
import RolesPerm from './views/backManage/RolesPerm'

// let or const 影响
const routes = [
    {
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
        name: '后台管理',
        iconCls: 'fa fa-user-plus fa-fw',
        children: [
            { path: '/backMember', component: BackMemberList, name: '后台用户列表' },
            { path: '/backRole', component: BackRoleList, name: '后台角色列表' },
            { path: '/rolePerm', component: RolesPerm, name: '后台用户权限', hidden: true }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
    }
]
export default routes;
