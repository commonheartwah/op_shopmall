<template>
    <div class="prodCreate">
        <el-form ref="form" :rules="rules" :model="form" label-width="110px">

            <div class="prodCreate_line">基础信息</div>

            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="form.name" placeholder="不超过50个字" :maxlength="50" class="prodCreate_name_input" :disabled="forbidden"></el-input>
            </el-form-item>

            <el-form-item label="商品描述：">
                <el-input v-model="form.description" type="textarea" placeholder="不超过50个字" :maxlength="50" class="prodCreate_name_input" :disabled="forbidden"></el-input>
            </el-form-item>

            <el-form-item label="商品编码：" prop="code">
                <el-input v-model="form.code" placeholder="以0开头的10位数字" :maxlength="10" class="prodCreate_name_input" :disabled="forbidden"></el-input>
            </el-form-item>

            <el-form-item label="商品条形码：" prop="bar_code">
                <el-input v-model="form.bar_code" placeholder="以0开头的10位数字" :maxlength="10" class="prodCreate_name_input" :disabled="forbidden"></el-input>
            </el-form-item>

            <el-form-item label="商品类型：" prop="type">
                <el-radio-group v-model="form.type" :disabled="forbidden">
                    <el-radio label="0">单件</el-radio>
                    <el-radio label="1">组合</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="价格：" prop="price">
                <el-input placeholder="最小为0.01,最大1000000" v-model.number="form.price" class="prodCreate_price_input" :disabled="forbidden">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <el-form-item label="vip价格：" prop="vip_price">
                <el-input placeholder="最小为0.01,最大1000000" v-model.number="form.vip_price" class="prodCreate_price_input" :disabled="forbidden">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <el-form-item label="划线价格：" prop="line_price">
                <el-input placeholder="最小为0.01,最大1000000" v-model.number="form.line_price" class="prodCreate_price_input" :disabled="forbidden">
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <!-- <el-form-item label="stockFiledShow" prop="stock" v-if="openType !== 2"> -->
            <el-form-item label="temp" prop="init_stock" v-if="openType !== 2">
                <span slot="label">{{openType == 1 ? '库存：':'初始库存：'}}</span>
                <el-input v-model.number="form.init_stock" placeholder="" :maxlength="50" class="prodCreate_name_input" :disabled="forbidden"></el-input>
            </el-form-item>

            <el-form-item label="封面图：" prop="cover_url" class="imageUrl_cover_parent">
                <div class="imageUrl_cover" v-if="forbidden"></div>
                <Upload v-model="form.cover_url"></Upload>
            </el-form-item>

            <div class="prodCreate_line">销售规则</div>

            <el-form-item label="快递运费：" prop="express_price">
                <el-input placeholder="0.00" v-model.number="form.express_price" class="prodCreate_price_input" disabled>
                    <template slot="prepend">￥</template>
                </el-input>
            </el-form-item>

            <el-form-item label="限购条件：">
                <el-checkbox v-model="form.checked" disabled>每个用户只能买</el-checkbox>
                <el-input v-model="form.condition" placeholder="" class="prodCreate_condition_input" disabled></el-input>
                <span style="color: #bbb;cursor: not-allowed;">件</span>
            </el-form-item>

            <el-form-item class="prodCreate_submit_item">
                <el-button type="primary" @click="goBack()" class="prodCreate_submit_btn" v-if="openType == 1">返回</el-button>
                <el-button type="primary" @click="submitForm('form')" class="prodCreate_submit_btn" v-else>保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import prodCreate from "./prodCreate";
    export default {
        ...prodCreate
    }

</script>

<style scoped lang="scss">
    @import "./prodCreate.scss";

</style>
