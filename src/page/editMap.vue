<template>
    <div class="loncom_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备素材" name="first" class="el-tab-pane0">
                    <div class="loncom_zt_edititem loncom_zt_sidebarcon0">
                       <el-collapse v-model="activeItem" accordion>
                            <el-collapse-item title="视频" name="first">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                    <span v-for="item in video_list"><img :src="'static/zutai/images/'+item.img"></span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="门禁" name="second">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                    <span v-for="item in access_list"><img :src="'static/zutai/images/'+item.img"></span>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            <span class="loncom_zt_sidebar_btn" @click="navclick" ref="navbtnspan"><i class="fa fa-chevron-left" ref="navbtn"></i></span>
            
        </div>
        <div class="loncom_sidebar_right loncom_zt_edit_right" ref="content">
            <div class="loncom_public_top loncom_ztright_top" ref="ztright">
                <div class="loncom_fr loncom_zt_editmap_btn">
                    <span><i class="fa fa-chevron-left"></i></span>
                    <span><i class="fa fa-mail-reply"></i></span>
                    <span><i class="fa fa-mail-forward"></i></span>
                    <span><i class="fa fa-remove"></i></span>
                    <span><i class="fa fa-save"></i></span>
                    <span @click="uploadImg"><i class="fa fa-cloud-upload"></i></span>
                    <span @click="fullScreen"><i class="fa fa-arrows-alt"></i></span>
                </div>
            </div>
            <div class="loncom_zt_backFull" ref="backFull" @click="backFullScreen"><el-button type="primary">退出全屏</el-button></div>
            <div class="loncom_zt_canvas">
                <img width="100%" :src="canvas_img" alt="">
            </div>
        </div>
        <!--上传图片-->
        <DialogZtUploadImg v-bind:dialogInfo="upload_img"></DialogZtUploadImg>
    </div>
</template>


<script>
import DialogZtUploadImg from '../components/dialogZtUploadImg.vue'
export default {
    created () {
        if(JSON.stringify(localStorage.loginInfo) == undefined){
            this.$message({
                message: "请登录",
                type: 'warning'
            });
            this.$router.push({path:'/login'});
            return;
        }
        var obj = this.$route.query;
        
    },
    mounted() {
        tabScroll(0)
        $(window).resize(function () {
            tabScroll(0)
        });
    },
    data() {
       return {
           //侧边点击显示或隐藏
           navbtn:'open',
           //侧边头部切换
           activeName: 'first',
           //手风琴切换
           activeItem: 'first',
           //视频侧边图片
           video_list:[
                {img:'video.png'},
                {img:'video.png'},
                {img:'video.png'},
                {img:'video.png'},
           ],
           //门禁侧边图片
          access_list:[
                {img:'access.png'},
                {img:'access.png'},
                {img:'access.png'},
                {img:'access.png'},
           ],
           //图片展示
           canvas_img:{},
           //上传图片
           upload_img:{
                title:'图片上传',
                visible:false,
                width:"500px",
                data:{},
           },
 

       }
   },
    methods:{
        //点击隐藏显示侧边
        navclick:function(){
            if(this.navbtn=='open'){
                $(this.$refs.sidebar).css("left","-225px");
                $(this.$refs.content).css({
                    "padding-left":"0",
                });
                $(this.$refs.navbtn).addClass("fa-chevron-right");
                this.navbtn='close';
            }else{
                $(this.$refs.sidebar).css("left","0");
                $(this.$refs.content).css({
                    "padding-left":"225px",
                });
                $(this.$refs.navbtn).removeClass("fa-chevron-right");
                this.navbtn='open';
            }
        },
        //上传图片
        uploadImg:function(){
            this.upload_img.visible=true;
        },
        //全屏
        fullScreen:function(){
            $(this.$refs.sidebar).css("left","-225px");
            $(this.$refs.ztright).css("top","-65px");
            $(this.$refs.backFull).css("top","0");
            $(this.$refs.content).css({
                "padding-left":"0",
                "padding-top":"0",
            });
            $(this.$refs.navbtnspan).hide();
        },
        //退出全屏
        backFullScreen:function(){
            $(this.$refs.sidebar).css("left","0");
            $(this.$refs.ztright).css("top","0");
            $(this.$refs.backFull).css("top","-55px");
            $(this.$refs.content).css({
                "padding-left":"225px",
                "padding-top":"65px",
            });
            $(this.$refs.navbtnspan).show();
        },

    },
    components:{DialogZtUploadImg}
}
</script>




