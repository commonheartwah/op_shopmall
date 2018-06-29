<template>
    <div class="prodList">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="上架中" name="first">
                <prodTable :openType="1" v-if="prodTable == 0"></prodTable>
            </el-tab-pane>
            <el-tab-pane label="已下架" name="second">
                <prodTable :openType="2" v-if="prodTable == 1"></prodTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import prodList from "./prodList.js";
    export default {
        ...prodList
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "./prodList.scss";

</style>
