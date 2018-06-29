<template>
    <div class="distributeConfig">
        <el-form ref="disForm" :rules="rules" :model="disForm" label-width="100px">
            <el-form-item label="计划名称：" prop="name">
                <el-input v-model="disForm.name" class="distibiute_input_class" :maxlength="50" placeholder="请输入计划名称，限50字"></el-input>
            </el-form-item>
            <el-form-item label="计划描述：" prop="desc">
                <el-input type="textarea" v-model="disForm.desc" placeholder="不超过1000个字" :maxlength="1000" class="distibiute_input_class"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime">
                <el-date-picker :editable="true" v-model="disForm.startTime" type="datetime" placeholder="选择开始时间" format='yyyy-MM-dd HH:mm'>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="endTime">
                <el-date-picker :editable="true" v-model="disForm.endTime" type="datetime" placeholder="选择结束时间" format='yyyy-MM-dd HH:mm'>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="返现金额：" prop="money">
                <el-input placeholder="返现金额，最小0.01" v-model.number="disForm.money" :disabled='moneyDisabled' class="distibiute_price_input">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="distributeList_create" @click="onSubmit('disForm')" v-if="openType == 1">创建</el-button>
                <el-button type="primary" class="distributeList_create" @click="onSubmit('disForm')" v-else>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {
        planAdd,
        planUpdate,
    } from '../../api/api';
    export default {
        data() {
            return {
                id: '',
                openType: 1,
                moneyDisabled: false,
                disForm: {
                    name: '',
                    desc: '',
                    startTime: '',
                    endTime: '',
                    money: '',
                    st: '',
                    et: '',
                    type: 1
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入计划名称',
                        trigger: 'blur'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入计划描述',
                        trigger: 'blur'
                    }],
                    startTime: [{
                        required: true,
                        type: 'date',
                        message: '请选择开始时间',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: true,
                        type: 'date',
                        message: '请选择结束时间',
                        trigger: 'blur'
                    }],
                    money: [{
                        min: 0.01,
                        max: 1000000,
                        type: 'number',
                        required: true,
                        message: '请输入自然数',
                        trigger: 'blur'
                    }, {
                        validator: function (rule, value, callback) {
                            const PriceRegex = /^([0-9]+|[0-9]{1,5}(,[0-9]{3})*)(.[0-9]{1,2})?$/;
                            if (!PriceRegex.test(value)) {
                                callback(new Error('返现金额不符合要求,限小数点后两位！'))
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {

            /**
             * 提交
             */
            onSubmit(formName) {
                console.log('onSubmit');
                console.log(this.disForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {};
                        params.name = this.disForm.name;
                        params.description = this.disForm.desc;
                        params.type = this.disForm.type;
                        params.start_time = (Date.parse(this.disForm.startTime) + '').substr(0, 8) + '00000';
                        params.end_time = (Date.parse(this.disForm.endTime) + '').substr(0, 8) + '00000';
                        params.rcpc = Math.floor(this.disForm.money * 100);
                        console.log(params)
                        if (this.openType == 1) {
                            planAdd(params).then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/distributionList',
                                        name: '分销管理',
                                        params: {
                                            'type': this.openType,
                                        }
                                    })
                                }
                            })
                        } else {
                            params.id = this.id;
                            planUpdate(params).then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/distributionList',
                                        name: '分销管理',
                                        params: {
                                            'type': this.openType,
                                        }
                                    })
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
             * 获取路由参数
             */
            getParams() {
                // 取到路由带过来的参数
                console.log('接收跳回');
                // 取到路由带过来的参数
                let routerParams = this.$route.params;
                console.log(routerParams);
                this.openType = routerParams.type;
                if (this.openType == 2) {
                    console.log('编辑');
                    this.moneyDisabled = true;
                    this.id = routerParams.id;
                    this.disForm.name = routerParams.name;
                    this.disForm.desc = routerParams.desc;
                    this.disForm.startTime = new Date(routerParams.st);
                    this.disForm.endTime = new Date(routerParams.et);
                    this.disForm.money = routerParams.money;
                } else {
                    console.log('创建');
                    this.moneyDisabled = false;
                }

            },
        },
        mounted() {
            this.getParams();
        },
    }

</script>
<style lang="scss" scoped>
    .distributeConfig {
        .distibiute_input_class {
            width: 300px;
        }
        .distibiute_price_input {
            width: 193px;
        }
        .dis_sku_div {
            padding-left: 95px;
            margin-top: 10px;
        }
        .distibiute_tag {
            height: 36px;
            line-height: 36px;
            margin: 5px 5px 0;
        }
        .distributeList_create {
            margin-top: 20px;
            width: 200px;
        }
    }

</style>
