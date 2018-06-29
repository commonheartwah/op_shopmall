/*
 * @Author: MuNaipeng
 * @Date: 2018-05-17 16:12:33
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-05-22 20:12:34
 */
import Tinymce from '../../../components/Tinymce';
import {
    addNewArticle,
    updateArticle,
    getArticleItem,
    spuAdd,
    spuUpdate,
    categoryTree
} from '../../../api/api';
export default {
    components: {
        Tinymce,
    },
    data() {
        return {
            openType: 0,
            previewContent: '',
            forbidden: false,
            spuForm: {
                selectedOptions: [],
                content: '',
                name: '',
                desc: '',
                status: '',
                type: '',
            },
            options: [],
            rules: {
                selectedOptions: [{
                    type: 'array',
                    required: true,
                    message: '请选择商品类目',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    message: '请输入spu名称',
                    trigger: 'blur'
                }],
                status: [{
                    required: true,
                    message: '请选择spu状态',
                    trigger: 'change'
                }],
                type: [{
                    required: true,
                    message: '请选择spu类型',
                    trigger: 'change'
                }],
                content: [{
                    required: true,
                    message: '请填写商品详情',
                    trigger: 'change'
                }],

            },
            prodDetailIf: false,
        }
    },
    computed: {
        editorWidth() {
            let width = document.querySelector('body').offsetWidth - 700
            return width
        },
    },
    methods: {

        /**
         * @description 详情预览
         * @author MuNaipeng
         */
        previewForm() {
            this.previewContent = this.spuForm.content;
            this.$nextTick(() => {
                var audios = this.$refs.richText.querySelectorAll('audio')
                for (var i = 0; i < audios.length; i++) {
                    var item = audios[i];
                    var audioPlayer = document.createElement('div')
                    var audioParent = item.parentNode;
                    audioPlayer.innerHTML =
                        `<div style="width: 100%;
                                                background-color: #fcfcfc;
                                                display: flex;
                                                justify-content:flex-start;
                                                align-items: center;
                                                border: 1px solid #e2e2e2;
                                                border-radius:1px;
                                                margin: 10px 0;
                                                padding: 10px 0;">
                        <aside style="width: 15%;margin: 0 15px;"><img style="width: 100%;" src="http://i.s.babyfs.cn/op/1/41b0024e9fcb4f9b869c2539a9455713.png" alt="" ></aside><div style="width: 75%;text-align: left;">
                            <p style="font-size: 14px;line-height: 20px;">儿歌音频</p>
                            <p style="font-size: 12px;line-height: 20px;color: #bbbbbb;">来自宝宝玩英语</p>
                            <p style="font-size: 14px;line-height: 20px;width: 95%;height: 1px; background-color: #ebebeb;margin: 5px 0;display: flex;align-items: center;">
                                <i style="display: inline-block;width: 0;background-color: black;height: 1px;"></i>
                            </p>
                            <p style="font-size: 12px;line-height: 20px;color: #bbbbbb;display: flex;justify-content: space-between;padding-right: 10px;">
                                <span>00:00</span>
                                <span>00:00</span>
                            </p>
                        </div>
                      <div>`
                    audioParent.replaceChild(audioPlayer, item)
                }

                var videos = this.$refs.richText.querySelectorAll('video')
                for (var i = 0; i < videos.length; i++) {
                    var item = videos[i];
                    var videoPlayer = document.createElement('div')
                    var videoParent = item.parentNode;
                    videoPlayer.innerHTML = `<img src="http://i.s.babyfs.cn/op/1/f9a5abf124104893a161a5d21e7672d2.jpg" alt="">`
                    videoParent.replaceChild(videoPlayer, item)
                }

                var imgs = this.$refs.richText.querySelectorAll('img')
                for (var i = 0; i < imgs.length; i++) {
                    let item = imgs[i]
                    item.style.width = '100%'
                    item.style.height = 'auto'
                    item.style.margin = '10px 0';
                }
            })
        },

        /**
         * @description 编辑提交
         * @author MuNaipeng
         * @param {any} formName
         */
        submitForm(formName) {
            console.log(this.spuForm);
            if (this.spuForm.content == "") {
                this.prodDetailIf = true;
            } else {
                this.prodDetailIf = false;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.spuForm.content == "") {
                        return;
                    };
                    const params = {}
                    params.name = this.spuForm.name;
                    params.category_id = this.spuForm.selectedOptions[this.spuForm.selectedOptions.length - 1] - 0;
                    params.type = this.spuForm.type - 0;
                    params.status = this.spuForm.status - 0;
                    params.content = this.spuForm.content;
                    params.description = this.spuForm.description;
                    if (this.openType == 1) {
                        params.id = this.spuId - 0;
                    }
                    console.log(params);
                    console.log(this.openType);
                    if (!this.openType) {
                        spuAdd(params)
                            .then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/spuManage',
                                        name: 'SPU管理',
                                    })
                                } else {
                                    this.$notify.error(res.data.msg);
                                }
                            })
                    } else {
                        spuUpdate(params)
                            .then(res => {
                                if (res.data.success) {
                                    this.$router.push({
                                        path: '/spuManage',
                                        name: 'SPU管理',
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
         * @description 类目获取
         * @author MuNaipeng
         */
        getCategory() {
            categoryTree()
                .then(res => {
                    if (res.data.success) {
                        this.options = res.data.data;
                    } else {
                        this.$notify.error(res.data.msg);
                    }
                })
        },

        /**
         * @description select选择
         * @author MuNaipeng
         */
        selectedChange() {
            console.log(this.spuForm.selectedOptions);
        },

        /**
         * @description 获取路由参数
         * @author MuNaipeng
         */
        getParams() {
            // 取到路由带过来的参数
            let routerParams = this.$route.params;
            console.log(routerParams);
            this.openType = routerParams.openType;
            // 将数据放在当前组件的数据内
            if (routerParams.openType == 1) {
                this.spuId = routerParams.dataObj.id;
                this.spuForm.selectedOptions = routerParams.dataObj.ancestorIds;
                console.log(this.spuForm.selectedOptions);
                this.spuForm.name = routerParams.dataObj.name;
                this.spuForm.description = routerParams.dataObj.description;
                this.spuForm.status = routerParams.dataObj.status.toString();
                this.spuForm.type = String(routerParams.dataObj.type);
                this.spuForm.content = routerParams.dataObj.content;
            }

        }
    },
    /**
     * @description 初始化
     * @author MuNaipeng
     */
    mounted() {
        this.getParams();
        this.getCategory();
    },

    watch: {
        spuForm: {
            handler(newVal, oldVal) {
                this.previewForm()
            },
            deep: true
        },
    }
}
