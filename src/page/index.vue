<template>
    <div class="loncom_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <div class="loncom_zt_sidebarcon">
                <div class="loncom_zt_sidebarbox loncom_mb10">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="设备目录" name="first">
                            设备目录
                        </el-tab-pane>
                        <el-tab-pane label="设备地图" name="second">
                            <div class="loncom_zt_map">
                                <div class="loncom_zt_mapimg">
                                    <img :src="'static/zutai/images/img.png'">
                                </div>
                                <div class="loncom_zt_map_btn">
                                    <span><i class="fa fa-edit"></i></span>
                                    <span><i class="fa fa-pencil"></i></span>
                                    <span><i class="fa fa-trash"></i></span>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="loncom_zt_sidebarbox loncom_zt_mapadd">
                    <i class="fa fa-plus"></i>
                </div>
                <span class="loncom_zt_sidebar_btn" @click="navclick"><i class="fa fa-chevron-left" ref="navbtn"></i></span>
            </div>
        </div>
        <div class="loncom_sidebar_right loncom_zt_sidebar_right" ref="content">
            123
        </div>
        
    </div>
</template>


<script>
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
    },
    mounted() {
        
    },
    data() {
       return {
           //侧边点击显示或隐藏
           navbtn:'open',
           //侧边头部切换
           activeName: 'second',
       }
   },
    methods:{
        //点击隐藏显示侧边
        navclick(){
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

    }
}
</script>




