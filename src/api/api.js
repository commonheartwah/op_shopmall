import axios from 'axios';
import Qs from 'qs';
let base = '/op'; // nginx配置后的url

// __用户
// 用户登录
export const requestLogin = params => { return axios.post(`${base}/sys/user/login`, Qs.stringify(params)) };
// 请求后台用户列表
export const getBackMemberListPage = params => { return axios.get(`${base}/sys/user/accounts`, { params: params }); };
// 增加后台用户
export const addUser = params => { return axios.post(`${base}/sys/user/add`, Qs.stringify(params)); };
// 修改后台用户
export const editUser = params => { return axios.post(`${base}/sys/user/update`, Qs.stringify(params)); };
// 用户登出
export const requestLogout = () => { return axios.get(`${base}/sys/user/logout`) };
// 修改密码
export const changePassword = params => { return axios.post(`${base}/sys/user/change_password`, Qs.stringify(params)); };

// 用户角色管理
// 查询当前用户的角色
export const requestCurrentRoles = params => { return axios.get(`${base}/sys/user/roles`, { params: params }); };
// 更新当前用户的角色
export const updateRoles = params => { return axios.post(`${base}/sys/user/update_roles`, Qs.stringify(params)); };

// __角色
// 后台角色列表(无分页 不需要参数)
export const getBackRoleList = params => { return axios.get(`${base}/sys/role_perm/roles`, { params: params }); };
// 通过角色id查询角色列表
export const getBackRoleById = params => { return axios.get(`${base}/sys/role_perm/get_role`, { params: params }); };
// 增加角色
export const addRole = params => { return axios.post(`${base}/sys/role_perm/addrole`, Qs.stringify(params)); };
// 修改角色(更新)
export const editRole = params => { return axios.post(`${base}/sys/role_perm/update_role`, Qs.stringify(params)); };
// 获取角色对应的权限
export const getPermsById = params => { return axios.get(`${base}/sys/role_perm/role_perms`, { params: params }); };
// 更新角色对象的权限
export const updatePermsById = params => { return axios.post(`${base}/sys/role_perm/update_role_perms`, Qs.stringify(params)); };

