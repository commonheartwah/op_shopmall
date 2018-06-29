/*
 * @Author: MuNaipeng
 * @Date: 2018-05-17 16:05:00
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-06-14 10:47:17
 */
import Tinymce from '../../../components/Tinymce'
import MDinput from '../../../components/MDinput';
import Upload from '../../../components/Upload/singleImage3'

import {
    addNewArticle,
    updateArticle,
    getArticleItem,
    skuAdd,
    skuUpdate,
} from '../../../api/api';
export default {
    components: {
        Tinymce,
        MDinput,
        Upload
    },
    data() {
        return {
            openType: 0,
            spuId: '',
            forbidden: false,
            form: {
                // selectedOptions: [],
                name: '', //名称
                description: '', //描述
                code: '', //商品编码
                bar_code: '', //条形码
                price: '', //价格
                vip_price: '', //vip价格
                line_price: '', //划线价
                init_stock: '', //库存
                cover_url: '', //封面图
                optionType: '', //上下架状态
                saleType: '', //销售状态
                //邮费，限购
                express_price: 0,
                condition: 1,
                checked: true,
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入商品名称',
                    trigger: 'blur'
                }],
                code: [{
                        required: true,
                        message: '请输入商品编码',
                        trigger: 'blur'
                    },
                    {
                        validator: function (rule, value, callback) {
                            const CodeRegex = /^0[0-9]{9}$/;
                            if (!CodeRegex.test(value)) {
                                callback(new Error('商品编码格式不正确，限以0开头的10位数字'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                type: [{
                    required: true,
                    message: '请选择商品类型',
                    trigger: 'change'
                }],
                price: [{
                        min: 0.01,
                        max: 1000000,
                        type: 'number',
                        required: true,
                        message: '请输入范围在0.01-1000000之间的价格数值',
                        trigger: 'blur'
                    },
                    {
                        validator: function (rule, value, callback) {
                            const PriceRegex = /^([0-9]+|[0-9]{1,5}(,[0-9]{3})*)(.[0-9]{1,2})?$/;
                            if (!PriceRegex.test(value)) {
                                callback(new Error('价格不符合要求！'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                vip_price: [{
                        min: 0.01,
                        max: 1000000,
                        type: 'number',
                        required: true,
                        message: '请输入范围在0.01-1000000之间的vip价格数值',
                        trigger: 'blur'
                    },
                    {
                        validator: function (rule, value, callback) {
                            const VipPriceRegex = /^([0-9]+|[0-9]{1,5}(,[0-9]{3})*)(.[0-9]{1,2})?$/;
                            if (!VipPriceRegex.test(value)) {
                                callback(new Error('vip价格不符合要求！'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                line_price: [{
                        min: 0.01,
                        max: 1000000,
                        type: 'number',
                        required: true,
                        message: '限范围在0.01-1000000之间的划线价格数值',
                        trigger: 'blur'
                    },
                    {
                        validator: function (rule, value, callback) {
                            const LinePriceRegex = /^([0-9]*|[0-9]{1,5}(,[0-9]{3})*)(.[0-9]{1,2})?$/;
                            if (!LinePriceRegex.test(value)) {
                                callback(new Error('划线价格不符合要求！'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                init_stock: [{
                        min: 0,
                        max: 1000000,
                        type: 'number',
                        required: true,
                        message: '初始库存限不超过1000000的正整数',
                        trigger: 'blur'
                    },
                    {
                        validator: function (rule, value, callback) {
                            const StockRegex = /^[0-9]\d*$/;
                            if (!StockRegex.test(value)) {
                                callback(new Error('初始库存输入不符合要求!'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                cover_url: [{
                    required: true,
                    message: '请上传一张1M以内的封面图',
                    trigger: 'change'
                }],
            },
            previewContent: '',
        }
    },
    methods: {

        /**
         * @description 返回
         * @author MuNaipeng
         */
        goBack() {
            this.$router.push({
                path: '/prodList',
                name: '商品管理',
                params: {
                    'type': this.openType,
                }
            })
        },

        /**
         * @description 提交编辑
         * @author MuNaipeng
         * @param {any} formName
         */
        submitForm(formName) {
            console.log(this.form);
            console.log(this.openType);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {};
                    params.name = this.form.name;
                    params.description = this.form.description;
                    params.code = this.form.code;
                    params.bar_code = this.form.bar_code;
                    params.cover_url = this.form.cover_url;
                    // params.cover_url = 'http://i.s.babyfs.cn/op/1/aa4b81fa686b4557887395e5600d8688.jpg';
                    params.type = this.form.type;
                    params.shelf_type = 0;
                    params.sale_type = 0;
                    params.price = Math.floor(this.form.price * 100);
                    params.line_price = Math.floor(this.form.line_price * 100);
                    params.vip_price = Math.floor(this.form.vip_price * 100);
                    params.spu_id = this.spuId;
                    if (this.openType == 0) {
                        params.init_stock = this.form.init_stock;
                    } else {
                        params.id = this.form.id;
                    };
                    if (this.openType == 0) {
                        skuAdd(params)
                            .then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/prodList',
                                        name: '商品管理',
                                        params: {
                                            'type': this.openType,
                                        }
                                    })
                                } else {
                                    this.$notify.error(res.data.msg);
                                }
                            })
                    } else {
                        skuUpdate(params)
                            .then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/prodList',
                                        name: '商品管理',
                                        params: {
                                            'type': this.openType,
                                        }
                                    })
                                } else {
                                    this.$notify.error(res.data.msg);
                                }
                            })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        /**
         * @description 获取路由参数
         * @author MuNaipeng
         */
        getParams() {
            // 取到路由带过来的参数
            let routerParams = this.$route.params;
            console.log(routerParams);
            // 将数据放在当前组件的数据内
            if (!!routerParams.openType) {
                console.log(routerParams.openType)
                this.openType = routerParams.openType;
                if (routerParams.openType == 1) {
                    this.forbidden = true;
                }
                this.form = routerParams.dataObj;
                this.form.type = routerParams.dataObj.type.toString();
                this.form.init_stock = routerParams.dataObj.stockNumberShow == '已售罄' ? 0 : routerParams.dataObj.stockNumberShow;
                this.form.price = (routerParams.dataObj.price - 0) / 100;
                this.form.vip_price = (routerParams.dataObj.vip_price - 0) / 100;
                this.form.line_price = (routerParams.dataObj.line_price - 0) / 100;
                this.spuId = routerParams.dataObj.spu_id;
            } else {
                this.spuId = routerParams.spuId;
                console.log(this.spuId);
            }
        }

    },

    /**
     * @description 页面初始化
     * @author MuNaipeng
     */
    mounted() {
        this.getParams();
    },
}
