import axios from 'axios';
import Qs from 'qs';
import babyfsConf from '@/babyfsConf';
console.log(babyfsConf)

let oldBase = `${babyfsConf.oEnv}/op`; // nginx配置后的url
let base = `${babyfsConf.nEnv}/op/retailer`; // nginx配置后的url

// __用户
// 用户登录
export const requestLogin = params => {
    return axios.post(`${oldBase}/sys/user/login`, Qs.stringify(params))
};
// 请求后台用户列表
export const getBackMemberListPage = params => {
    return axios.get(`${oldBase}/sys/user/accounts`, {
        params: params
    });
};
// 增加后台用户
export const addUser = params => {
    return axios.post(`${oldBase}/sys/user/add`, Qs.stringify(params));
};
// 修改后台用户
export const editUser = params => {
    return axios.post(`${oldBase}/sys/user/update`, Qs.stringify(params));
};
// 用户登出
export const requestLogout = () => {
    return axios.get(`${oldBase}/sys/user/logout`)
};
// 修改密码
export const changePassword = params => {
    return axios.post(`${oldBase}/sys/user/change_password`, Qs.stringify(params));
};

// 用户角色管理
// 查询当前用户的角色
export const requestCurrentRoles = params => {
    return axios.get(`${oldBase}/sys/user/roles`, {
        params: params
    });
};
// 更新当前用户的角色
export const updateRoles = params => {
    return axios.post(`${oldBase}/sys/user/update_roles`, Qs.stringify(params));
};

// __角色
// 后台角色列表(无分页 不需要参数)
export const getBackRoleList = params => {
    return axios.get(`${oldBase}/sys/role_perm/roles`, {
        params: params
    });
};
// 通过角色id查询角色列表
export const getBackRoleById = params => {
    return axios.get(`${oldBase}/sys/role_perm/get_role`, {
        params: params
    });
};
// 增加角色
export const addRole = params => {
    return axios.post(`${oldBase}/sys/role_perm/addrole`, Qs.stringify(params));
};
// 修改角色(更新)
export const editRole = params => {
    return axios.post(`${oldBase}/sys/role_perm/update_role`, Qs.stringify(params));
};
// 获取角色对应的权限
export const getPermsById = params => {
    return axios.get(`${oldBase}/sys/role_perm/role_perms`, {
        params: params
    });
};
// 更新角色对象的权限
export const updatePermsById = params => {
    return axios.post(`${oldBase}/sys/role_perm/update_role_perms`, Qs.stringify(params));
};

//__Material
// 获取资源列表(图片\视频\音频)
export const getMaterialsList = params => {
    return axios.get(`${oldBase}/material/list`, {
        params: params
    });
};
// 上传图片到资源
export const uploadPicToLib = params => {
    return axios.post(`${oldBase}/material/upload_image_lib`, Qs.stringify(params));
};
// 上传图片返回url
export const uploadPic = params => {
    return axios.post(`${oldBase}/material/upload_image`, Qs.stringify(params));
};
// 上传zip包返回url
export const uploadZip = params => {
    return axios.post(`${oldBase}/material/upload_zip`, Qs.stringify(params));
};
// 更新素材
export const updateMaterial = params => {
    return axios.post(`${oldBase}/material/update`, Qs.stringify(params));
};
//获取上传七牛的下载URL
export const getDownloadUrl = params => {
    return axios.post(`${oldBase}/material/get_download_url`, Qs.stringify(params));
};
// 获取上传七牛的token
export const getUploadToken = params => {
    return axios.post(`${oldBase}/material/get_upload_token`, Qs.stringify(params));
};
// 上传文件成功后向回调接口传值
export const goCallback = params => {
    return axios.post(`${oldBase}/material/av_upload_callback`, Qs.stringify(params));
};
// 从优酷获取视频
export const getVideoFromYouku = params => {
    return axios.post(`${oldBase}/material/youku_video`, Qs.stringify(params));
};


// spu管理
// 类目创建
export const categoryAdd = params => {
    return axios.post(`${base}/category/add`, Qs.stringify(params));
};
// 类目更新
export const categoryUpdate = params => {
    return axios.post(`${base}/category/update`, Qs.stringify(params));
};
// 类目树
export const categoryTree = params => {
    return axios.get(`${base}/category/category_tree`, {
        params: params
    });
};
// 类目查询
export const categoryList = params => {
    return axios.get(`${base}/category/list`, {
        params: params
    });
};

// spu创建
export const spuAdd = params => {
    return axios.post(`${base}/spu/add`, Qs.stringify(params));
};
// spu编辑
export const spuUpdate = params => {
    return axios.post(`${base}/spu/update`, Qs.stringify(params));
};
// spu查询
export const getSpuList = params => {
    return axios.get(`${base}/spu/list`, {
        params: params
    });
};

// sku管理
// sku创建
export const skuAdd = params => {
    return axios.post(`${base}/sku/add`, Qs.stringify(params));
};
// sku更新
export const skuUpdate = params => {
    return axios.post(`${base}/sku/update`, Qs.stringify(params));
};
// sku查询
export const getSkuList = params => {
    return axios.get(`${base}/sku/list`, {
        params: params
    });
};
// sku批量更新上架
export const batchShelf = params => {
    return axios.post(`${base}/sku/batch_shelf`, Qs.stringify(params));
};
// sku批量更新可售不可售
export const batchSale = params => {
    return axios.post(`${base}/sku/batch_sale`, Qs.stringify(params));
};

// 库存管理
// 库存更新
export const stockUpdate = params => {
    return axios.post(`${base}/stock/update`, Qs.stringify(params));
};


// 分销计划
// 创建分销计划
export const planAdd = params => {
    return axios.post(`${base}/fission/plan/add`, Qs.stringify(params));
};
// 更新分销计划
export const planUpdate = params => {
    return axios.post(`${base}/fission/plan/update`, Qs.stringify(params));
};
// 分销计划绑定sku
export const planBindSku = params => {
    return axios.post(`${base}/fission/plan/bindingSku`, Qs.stringify(params));
};
// 分销计划解除绑定sku
export const planUnBindSku = params => {
    return axios.post(`${base}/fission/plan/unBindingSku`, Qs.stringify(params));
};
// 获取分销计划
export const getPlanList = params => {
    return axios.get(`${base}/fission/plan/get`, {
        params: params
    });
};
// 获取分销计划是否已经存在
export const getPlanBytime = params => {
    return axios.get(`${base}/fission/plan/getPlanByTime`, {
        params: params
    });
};

// 订单管理
// 订单列表
export const getOrderList = params => { return axios.get(`${base}/order/list`, { params: params }); };
// 标记申请退款接口
export const orderRefundFlag = params => { return axios.post(`${base}/order_refund/create`, Qs.stringify(params)); };
// 订单退款列表
export const orderRefundList = params => { return axios.get(`${base}/order_refund/list`, { params: params }); };
// 批量标记为已发货
export const orderBatchSend = params => { return axios.post(`${base}/order/batch_send`, Qs.stringify(params)); };
// 订单导出
export const orderExprot = params => { return axios.post(`${base}/order/export`, Qs.stringify(params)); };
// 查询交易凭证
export const voucherTradeGet = params => { return axios.get(`${base}/voucher/trade/get`, { params: params }); };
// 退款更新 确认接口 默认将状态修改为 退款中
export const orderRefundUpdate = params => { return axios.post(`${base}/order_refund/update`, Qs.stringify(params)); };
// 批量标记为已发货 通过时间日期标记
export const orderBatchSendByTime = params => { return axios.post(`${base}/order/batch_send_by_time`, Qs.stringify(params)); };
// 订单备注
export const orderRemark = params => { return axios.post(`${base}/order/remark`, Qs.stringify(params)); };
// 标记退款的物流信息接口
export const orderRefundRemarkExpress = params => { return axios.post(`${base}/order_refund/remark_express`, Qs.stringify(params)); };


// 物流相关 express
// 物流Excel上传
export const expressExcelUpload = params => { return axios.post(`${base}/express/excel/upload`, Qs.stringify(params)); };
// 根据订单号获取物流信息
export const expressGetByOrder = params => { return axios.get(`${base}/express/getByOrder`, { params: params }); };
// express查询
export const expressList = params => { return axios.get(`${base}/express/list`, { params: params }); };

// Statistics
// 订单退款统计
export const orderStatisticsRefundList = params => { return axios.get(`${base}/order_statistics/refund_list`, { params: params }); };
// 订单统计
export const orderStatisticsOrderSellList = params => { return axios.get(`${base}/order_statistics/order_sell_list`, { params: params }); };
// 订单项统计
export const orderStatisticsOrderItemSellList = params => { return axios.get(`${base}/order_statistics/order_item_sell_list`, { params: params }); };
// 财务报表汇总
export const fissionStatisticsFinMouth = params => { return axios.get(`${base}/fission_statistics/fin_mouth`, { params: params }); };
// 结算详情
export const fissionStatisticsSettleDetail = params => { return axios.get(`${base}/fission_statistics/settle_detail`, { params: params }); };
// 访问量统计
export const fissionStatisticsPageView = params => { return axios.get(`${base}/fission_statistics/page_view`, { params: params }); };
// M0&M1
export const fissionStatisticsM0M1 = params => { return axios.get(`${base}/fission_statistics/m0_m1`, { params: params }); };

