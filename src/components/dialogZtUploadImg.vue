<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_public_table loncom_dialog_scroll" style="height:300px;">
            <el-tabs v-model="activeName">
                <el-tab-pane label="上传图片" name="first">
                    <div class="loncom_pt10">
                     <el-upload
                            action=""
                            list-type="picture-card"
                            :limit="1"
                            :file-list="imageUrlList"
                            :on-preview="handlePictureCardPreview"
                            :on-change="handleChange"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="图片库" name="second">

                </el-tab-pane>
            </el-tabs>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogSure('formInfo')">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>

export default {
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            dialog_info:this.dialogInfo,
            activeName:'first',
            //上传图片
            imageUrlList:[],
            dialogImageUrl: '',
            dialogVisible: false,

        }
    },
    methods:{
        //保存的操作
        dialogSure:function(){
            console.log(this.dialogImageUrl)
            console.log(this.imageUrlList)
            if(this.dialogImageUrl!=""){
                this.$parent.canvas_img=this.dialogImageUrl;
                this.dialogInfo.visible=false;   
                imageUrlList:[];
            }else{
                this.$message({
                    message: "请上传图片或者选择图片!",
                    type: 'warning'
                });
            }
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;   
        },
        //上传图片
        handleRemove:function(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview:function(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleChange:function(file) {
            var fileArry=file.name.split(".");
            var fileType=fileArry[fileArry.length-1];
            if(fileType=="png"||fileType=="jpg"||fileType=="PNG"||fileType=="JPG"){
                this.dialogImageUrl=file.url;
                this.imageUrlList[0].name=file.name;
                this.imageUrlList[0].url=file.url;
            }else{
                this.$message({
                    message: "图片格式只能为jpg或png!",
                    type: 'error'
                });
            }
       }
        
        
    },
    props:["dialogInfo"]  
}
</script>

