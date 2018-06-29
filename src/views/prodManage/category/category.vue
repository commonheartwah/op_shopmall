<template>
    <div class="category">
        <div class="category_right">
            <el-button type="primary" @click="addCategory">创建类目</el-button>
        </div>
        <div class="prodList_table">
            <el-table :data='categoryData' v-loading='listLoading' style='width: 100%;' border stripe>

                <el-table-column prop='entity.name' label='名称' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.id' label='ID' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.parentId' label='父类目ID' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.description' label='描述' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column prop='entity.statusShow' label='状态' width='' align='center' show-overflow-tooltip></el-table-column>

                <el-table-column label='操作' width="230" align='center'>
                    <template scope='scope'>
                        <el-button size='small' type="text" @click='edit(scope.$index, scope.row)'>编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="prodList_page">
            <el-pagination background layout="sizes,prev, pager, next" :total="totalCount" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
        <!-- 操作类目 -->
        <el-dialog title="编辑类目：" :visible.sync="dialogVisible" @close="closeDialog" width="30%" class="edit_dialog">
            <div>
                <el-form ref="categoryForm" :rules="rules" :model="categoryForm" label-width="100px">
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="categoryForm.name" placeholder="不超过50个字" :maxlength="50" class="category_class_input"></el-input>
                    </el-form-item>
                    <el-form-item label="父级栏目：" v-if="idEdit">
                        <el-select v-model="categoryForm.parent_id" placeholder="请输入父栏目名称或Id搜索" style="width:240px;" filterable clearable remote
                            :remote-method="searchCategoryFunc" :loading='searchCategoryLoading'>
                            <el-option v-for="item in categoryOptions" :key="item.id" :label="'（' + item.id + '）' + item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：" prop="description">
                        <el-input v-model="categoryForm.description" placeholder="不超过50个字" :maxlength="50" class="category_class_input"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                        <el-radio-group v-model="categoryForm.status">
                            <el-radio label="0">无效</el-radio>
                            <el-radio label="1">有效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEvent('categoryForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    import {
        categoryList,
        categoryAdd,
        categoryUpdate,
        getOrderList
    } from '../../../api/api';
    export default {
        data() {
            return {
                idEdit: true,
                id: '',
                categoryOptions: [],
                searchCategoryLoading: false,
                dialogVisible: false,
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,
                categoryData: [],
                listLoading: false,
                categoryForm: {
                    name: '',
                    parent_id: '',
                    description: '',
                    status: '1',
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请填写类目名称',
                        trigger: 'blur'
                    }],
                    description: [{
                        required: true,
                        message: '请填写描述',
                        trigger: 'blue'
                    }],
                    status: [{
                        required: true,
                        message: '请选择类目状态',
                        trigger: 'change'
                    }],

                },
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
                categoryList({
                        page_size: this.pageSize,
                        page_index: this.currentPage,
                    })
                    .then(res => {
                        this.listLoading = false;
                        if (res.data.success) {
                            res.data.data.items.forEach(el => {
                                el.entity.statusShow = el.entity.stat == 1 ? '有效' : '无效';
                            });
                            this.categoryData = res.data.data.items;
                            this.totalCount = res.data.data.totalCount;
                        } else {
                            this.$notify.error(res.data.msg);
                        }
                    })
            },

            /**
             * @description 创建类目
             * @author MuNaipeng
             */
            addCategory() {
                this.idEdit = true;
                this.dialogVisible = true;
            },

            /**
             * @description 编辑类目
             * @author MuNaipeng
             * @param {any} index
             * @param {any} row
             */
            edit(index, row) {
                this.idEdit = false;
                this.dialogVisible = true;
                console.log(row.entity);
                this.id = row.entity.id;
                this.categoryForm = {
                    name: row.entity.name,
                    parent_id: row.entity.parentId,
                    description: row.entity.description,
                    status: row.entity.stat.toString(),
                };

            },

            /**
             * @description 创建/编辑类目确定
             * @author MuNaipeng
             */
            submitEvent(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {};
                        params.name = this.categoryForm.name;
                        params.parent_id = this.categoryForm.parent_id;
                        params.description = this.categoryForm.description;
                        params.status = this.categoryForm.status;
                        if (!!this.id) {
                            params.id = this.id;
                            categoryUpdate(params)
                                .then(res => {
                                    if (res.data.success) {
                                        this.dialogVisible = false;
                                        this.init();
                                    } else {
                                        this.$notify.error(res.data.msg);
                                    }
                                })
                        } else {
                            categoryAdd(params)
                                .then(res => {
                                    if (res.data.success) {
                                        this.dialogVisible = false;
                                        this.init();
                                    } else {
                                        this.$notify.error(res.data.msg);
                                    }
                                })
                        }


                    }
                })
            },


            /**
             * @description 搜索父级栏目
             * @author MuNaipeng
             * @param {any} query
             */
            searchCategoryFunc(query) {
                if (query !== '') {
                    let temp = Number(query);
                    let parameter = {};
                    temp ? parameter['id'] = temp : parameter['name'] = query;
                    this.searchCategoryLoading = true;
                    // 调用 加载列表的接口
                    categoryList(parameter).then((res) => {
                        if (res.data.success) {
                            this.categoryOptions = res.data.data.items.map((item) => {
                                let tempObj = {
                                    id: item.entity.id,
                                    name: item.entity.name,
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

            /**
             * @description 弹窗关闭回调
             * @author MuNaipeng
             */
            closeDialog() {
                this.clear();
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
             * @description clear
             * @author MuNaipeng
             */
            clear() {
                this.id = '';
                this.categoryForm = {
                    name: '',
                    parent_id: '',
                    description: '',
                    status: '1',
                };
            }

        }
    }

</script>
<style scoped lang="scss">
    .category {
        .category_right {
            float: right;
            overflow: hidden;
            margin-top: 20px;
            .el-button {
                float: left;
            }
            .category_i {
                float: left;
                width: 1px;
                height: 25px;
                margin: 5px 20px;
                background: #36b3b3;
            }
        }

        .prodList_table {
            clear: both;
            padding-top: 10px;
        }

        .prodList_page {
            margin-top: 10px;
            overflow: hidden;
            .el-pagination {
                float: right;
            }
        }
        .category_class_input {
            width: 240px;
        }
    }

</style>
