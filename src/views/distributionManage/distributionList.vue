<template>
    <div class="distributionList">
        <div class="distributeList_none" v-if="!distribute">
            <p>当前无分销计划</p>
            <el-button class="distributeList_create" type="primary" @click="createDitributeEvent">创建</el-button>
        </div>
        <div class="distributeList_main" v-else>
            <el-form ref="disList" :model="disList" label-width="100px">
                <el-form-item label="计划名称：">
                    {{disList.name}}
                </el-form-item>
                <el-form-item label="计划描述：">
                    {{disList.desc}}
                </el-form-item>
                <el-form-item label="开始时间：">
                    {{disList.startTime}}
                </el-form-item>
                <el-form-item label="结束时间：">
                    {{disList.endTime}}
                </el-form-item>
                <el-form-item label="返现金额：">
                    {{disList.money}}元
                </el-form-item>
                <el-form-item label="关联sku：">
                    <el-select v-model="disList.caCode" placeholder="请输入商品编码或sku名称" style="width:240px;" filterable clearable remote :remote-method="searchCategoryFunc"
                        :loading='searchCategoryLoading' class="distibiute_input_class">
                        <el-option v-for="item in categoryOptions" :key="item.caCode" :label="'（' + item.code + '）' + item.name" :value="{code:item.code,name:item.name,id:item.id}">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="onAdd">绑定</el-button>
                </el-form-item>
                <div class="dis_sku_div">
                    <p class="distributionList_no_sku" v-if="tags.length == 0">暂时没有绑定Sku,如需关联请输入商品编码进行绑定</p>
                    <el-tag v-else class="distibiute_tag" v-for="tag in tags" :key="tag.name" closable @close="handleClose(tag)" color="#FF7F50">
                        {{` ( ${tag.code} ) `}}{{tag.name}}
                    </el-tag>
                </div>
                <el-form-item>
                    <el-button class="distributeList_edit" type="primary" @click="onEdit">修改分销计划</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        getSkuList,
        getPlanBytime,
        getPlanList,
        planBindSku,
        planUnBindSku,
    } from '../../api/api';
    import util from '../../common/js/util';
    export default {
        data() {
            return {
                id: '',
                distribute: false,
                disList: {
                    name: '',
                    desc: '',
                    startTime: '',
                    endTime: '',
                    st: '',
                    et: '',
                    money: '',
                    aboutSku: '',
                    code: '',
                    caCode: {
                        code: '',
                        name: '',
                        id: '',
                    }
                },
                operateSku: {
                    sku: '',
                },
                tags: [],
                tags1: [{
                        code: '04726387613',
                        name: '标签五标签五标签五标签d五标签五标签五',
                    },
                    {
                        code: '047263853453',
                        name: '标签二',
                    },
                ],
                searchCategoryLoading: false,
                categoryOptions: [],
                cacheArr: [],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            /**
             * 初始化方法
             */
            init() {
                const timestamp = Date.parse(new Date());
                console.log(timestamp);
                getPlanBytime({
                    time: timestamp
                }).then(res => {
                    if (res.data.success) {
                        this.id = res.data.data.entity.id;
                        this.disList.name = res.data.data.entity.name;
                        this.disList.desc = res.data.data.entity.description;
                        this.disList.startTime = util.timestampToTime(res.data.data.entity.startTime, 'm');
                        this.disList.endTime = util.timestampToTime(res.data.data.entity.endTime, 'm');
                        this.disList.st = res.data.data.entity.startTime;
                        this.disList.et = res.data.data.entity.endTime;
                        this.disList.money = res.data.data.conf.rcpc / 100;
                        this.tags = !!res.data.data.skus ? res.data.data.skus : [];

                        this.distribute = true;
                    } else {
                        this.distribute = false;
                    }
                })
            },

            /**
             * 创建分销计划
             */
            createDitributeEvent() {
                console.log('create');
                this.$router.push({
                    path: '/distributionConfig',
                    name: '分销配置',
                    params: {
                        type: 1
                    }
                })
            },

            /**
             * 编辑分销计划
             */
            onEdit() {
                console.log('onsubmit!');
                this.$router.push({
                    path: '/distributionConfig',
                    name: '分销配置',
                    params: {
                        type: 2,
                        id: this.id,
                        name: this.disList.name,
                        desc: this.disList.desc,
                        st: this.disList.st,
                        et: this.disList.et,
                        money: this.disList.money,
                    }
                })
            },

            /**
             * 解绑sku
             */
            handleClose(tag) {
                console.log(tag);
                this.$confirm('此操作将解绑此sku, 是否继续?', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    planUnBindSku({
                        id: this.id,
                        sku_ids: tag.id
                    }).then(res => {
                        if (res.data.success) {
                            this.tags.splice(this.tags.indexOf(tag), 1);
                            this.$message.success('解绑成功');
                            this.init();
                        }
                    })

                }).catch(() => {});
            },

            /**
             * 绑定sku
             */
            onAdd() {
                console.log('onAdd');
                console.log(this.disList.caCode.id);
                if (!this.disList.caCode.id) {
                    this.$message.warning('请填写有效的商品编码！');
                    return;
                };
                console.log(this.tags);
                let flag = true;
                this.tags.forEach(el => {
                    if (el.id == this.disList.caCode.id) {
                        this.$message.warning('请勿重复添加商品！');
                        flag = false;
                    };
                });
                if (flag) {

                    planBindSku({
                        id: this.id,
                        sku_ids: this.disList.caCode.id
                    }).then(res => {
                        if (res.data.success) {
                            this.tags.push(this.disList.caCode);
                            this.$message.success('绑定成功');
                            this.init();
                        }
                    })
                };
                console.log(this.disList.caCode);


            },

            /**
             * @description 搜索sku
             * @author MuNaipeng
             * @param {any} query
             */
            searchCategoryFunc(query) {
                if (query !== '') {
                    // let temp = Number(query);
                    var reg = /^[0-9]+.?[0-9]*$/;
                    let temp = reg.test(query);
                    let params = {};
                    temp ? params['code'] = query : params['name'] = query;
                    params.sale_type = 1;
                    params.shelf_type = 1;
                    this.searchCategoryLoading = true;
                    // 调用 加载列表的接口
                    getSkuList(params).then((res) => {
                        if (res.data.success) {
                            this.categoryOptions = res.data.data.items.map((item) => {
                                let tempObj = {
                                    code: item.entity.code,
                                    name: item.entity.name,
                                    id: item.entity.id
                                }
                                return tempObj
                            });
                            console.log(this.categoryOptions)
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                        this.searchCategoryLoading = false;
                    });
                } else {
                    this.categoryOptions = [];
                }
            },
        }
    }

</script>
<style lang="scss" scoped>
    .distributionList {

        padding-top: 20px;
        /*无分销计划*/
        .distributeList_none {
            position: relative;
            p {
                text-align: center;
                margin-top: 200px;
                margin-bottom: 100px;
                font-size: 20px;
                font-weight: 700;
                color: #48666A;
            }
            .distributeList_create {
                position: absolute;
                left: 50%;
                top: 200px;
                margin-left: -95px;
                width: 200px;
            }
        }
        /*有分销计划*/
        .distributeList_main {
            .distibiute_input_class {
                width: 300px;
            }
            .disList_about_sku {
                display: inline-block;
                padding: 2px 10px;
                border: 1px solid #36b3b3;
                border-radius: 5px;
                margin: 5px;
            }
            .distributeList_edit {
                margin-top: 50px;
                width: 200px;
            }
            .distibiute_tag {
                height: 36px;
                line-height: 36px;
                margin: 8px 8px;
            }
            .dis_sku_div {
                display: inline-block;
                border: 1px dotted #36b3b3;
                border-radius: 5px; // padding: 10px;
                margin-left: 100px;
                min-height: 60px;
                min-width: 400px;
            }
            .distributionList_no_sku {
                line-height: 60px;
                text-align: center;
                color: #BFD7D9;
            }
        }
    }

</style>
