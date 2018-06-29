<template>
    <div class="spuManage">
        <el-form ref="spuForm" :rules="rules" :model="spuForm" label-width="100px">

            <div class="spuManage_line">基础信息</div>

            <el-form-item label="商品类目：" prop="selectedOptions">
                <el-cascader expand-trigger="hover" placeholder="请选择" :options="options" v-model="spuForm.selectedOptions" @change="selectedChange"
                    class="spuManage_class_select" :disabled="!!openType">
                </el-cascader>
            </el-form-item>

            <el-form-item label="Spu名称：" prop="name">
                <el-input v-model="spuForm.name" placeholder="不超过50个字" :maxlength="50" class="spuManage_class_input"></el-input>
            </el-form-item>

            <el-form-item label="Spu描述：">
                <el-input v-model="spuForm.description" type="textarea" placeholder="不超过50个字" :maxlength="50" class="spuManage_class_input"></el-input>
            </el-form-item>

            <el-form-item label="Spu状态：" prop="status">
                <el-radio-group v-model="spuForm.status">
                    <el-radio label="0">无效</el-radio>
                    <el-radio label="1">有效</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Spu类型：" prop="type" >
                <el-radio-group v-model="spuForm.type" :disabled="!!openType">
                    <el-radio label="0">虚拟</el-radio>
                    <el-radio label="1">实物</el-radio>
                </el-radio-group>
            </el-form-item>

            <div class="spuManage_line">商品详情</div>

            <div class="createPost-container">
                <span class="checkStar">*</span>
                <span class="checkProdDetail">商品详情：</span>
                <div class="createPost-main-container">
                    <div class="imageUrl_cover"></div>
                    <div class="editorContent" ref="editorContent">
                        <div class="editor-container">
                            <Tinymce :height='520' :width="editorWidth" ref="editor" v-model="spuForm.content"></Tinymce>
                        </div>
                        <div class="mobile">
                            <div class="article">
                                <div class="rich-text" v-html="previewContent" ref="richText"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="createPost_warn" v-if="prodDetailIf">请填写商品详情</p>
            </div>

            <el-form-item class="spuManage_submit_item">
                <el-button type="primary" @click="submitForm('spuForm')" class="spuManage_submit_btn">保存</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>
<script>
    import spuAdd from "./spuAdd.js";
    export default {
        ...spuAdd
    }

</script>
<style scoped lang="scss">
    @import "./spuAdd.scss";

</style>
