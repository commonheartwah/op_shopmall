<template>
  <section>
    <el-row class="topStyle">
      温馨提示:
      <p>1,上传批量发货的Excel需要以实例格式为准，否侧无法处理。每个Excel中不超过10000笔订单。</p>
      <p>2,发货后，订单状态将为“已发货”，该笔订单将不能再次上传快递单号。如需多次发货，请使用【部分发货】功能</p>
    </el-row>
    <el-row class="midStyle">
      <el-button type='primary' @click="fileDowmLoad">发货文件模版</el-button>
      <el-button type='primary' @click='importFormVisible = true'>上传发货文件</el-button>
    </el-row>
    <!-- 上传发货文件弹窗 -->
    <el-dialog title='上传发货文件' v-model='importFormVisible' :close-on-click-modal='false'>
			<el-form :model='importForm' label-width='10px' ref='importForm'>
				<el-form-item>
					<el-upload
						class="upload-demo"
						ref="upload"
						action="/op/retailer/express/excel/upload"
						name="bin"
						:on-change="handleChange"
						:file-list="fileList"
						:auto-upload="false"
						:on-success="handleSuccess"
					>
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
						<div slot="tip" class="el-upload__tip">只支持单个文件上传 且只能上传xlsx文件</div>
					</el-upload>
				</el-form-item>
			</el-form>
		</el-dialog>
    <!-- 上传文件反馈弹窗 -->
    <el-dialog title='上传文件反馈' :visible.sync="returnFormVisible" :close-on-click-modal='false'>
      <el-row>
        <el-col :span="12">
          成功单号共计{{successSum}}个
        </el-col>
        <el-col :span="12">
          失败单号共计{{failSum}}个
        </el-col>
        <el-col :span="24">下方是失败单号以及失败原因，请查看</el-col>
      </el-row>
      <el-row>
      <!-- 反馈列表 -->
      <el-table :data="fileList1" :default-expand-all='false' border style="width: 100%">
        <el-table-column prop="id" label="失败单号" align="center"></el-table-column>
        <el-table-column prop="fail" label="失败原因" align="center"></el-table-column>
      </el-table>
    </el-row>
    </el-dialog>
  </section>
</template>
<script>
import { 
  expressExcelUpload, 
  expressGetByOrder
  } from "../../api/api.js";
export default {
  data() {
    return {
      // 上传文件反馈弹窗
      returnFormVisible:false,
      // 上传发货文件弹窗初始化
      importFormVisible: false,
      importForm: {},
      fileList: [],
      fileList1: [],
      failSum:'',
      successSum:'',
      fail:[]
    };
  },
  methods: {
    // 下载文件模版
    fileDowmLoad(){
      let url = '../../../static/file/上传单号文件模版.xlsx'
      window.open(url)
    },
    handleChange(file, fileList) {
      let reg = /\.(?:xlsx)$/i;
      if (fileList.length > 1) {
        fileList.length = 1;
        this.$notify({
          title: "错误",
          message: "只支持单个文件上传",
          type: "error"
        });
        return;
      }
      if (!reg.test(file.raw.name)) {
        this.$notify({
          title: "错误",
          message: "只支持类型为xlsx的文件上传",
          type: "error"
        });
        fileList.length = 0;
      }
    },
    submitUpload() {
      if (this.$refs.upload.uploadFiles[0]) {
        this.$refs.upload.submit();
      } else {
        this.$notify({
          title: "错误",
          message: "请选择xlsx文件",
          type: "error"
        });
      }
    },
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.returnFormVisible=true;
        // 列表数据
        let failLists = response.data.failList
        let arr = []
        Object.keys(failLists).forEach(function(key){
          arr.push(key,failLists[key])
        });
        let arr1 = []
        for(let i=0 ;i<arr.length;){
          arr1[i]={}
          arr1[i].id = arr[i]
          arr1[i].fail = arr[i+1]
          i=i+2
        }
        let arr2=[]
        for(var i=0;i<arr1.length;i++){
          if(arr1[i]!=null){
          arr2.push(arr1[i])
          }else{
            continue
          }
        }
        // 订单失败列表
        this.fileList1= arr2
        // 错误总数
        this.failSum = response.data.result.failNum
        // 成功总数
        this.successSum = response.data.result.successNum
        this.$notify({
          title: "成功",
          message: "操作成功,请等待处理...",
          type: "success"
        });
        this.$refs["importForm"].resetFields();
        this.$refs["upload"].uploadFiles.length = 0;
        this.importFormVisible = false;
      } else {
        this.$notify({
          title: "错误",
          message: response.msg,
          type: "error"
        });
      }
    },
  },
  mounted() {
  }
};
</script>

<style>
.topStyle {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
.midStyle {
  margin: 0 0 10px 0;
}
</style>
