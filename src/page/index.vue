<template>
    <div class="loncom_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备目录" name="first" class="el-tab-pane0">
                    <div class="loncom_zt_sidebarcon0">设备目录</div>
                </el-tab-pane>
                <el-tab-pane label="设备地图" name="second" class="el-tab-pane1">
                    <div class="loncom_zt_sidebarcon loncom_zt_sidebarcon1">
                        <div class="loncom_zt_sidebarbox" v-for="item in map_list">
                            <div class="loncom_zt_maptitle">{{item.name}}</div>
                            <div class="loncom_zt_mapimg">
                                <img :src="'static/zutai/images/img.png'">
                            </div>
                            <div class="loncom_zt_map_btn">
                                <span><i class="fa fa-edit"></i></span>
                                <span><i class="fa fa-pencil"></i></span>
                                <span><i class="fa fa-trash"></i></span>
                            </div>
                        </div>
                        <div class="loncom_zt_sidebarbox loncom_zt_mapadd" @click="addMap">
                            <i class="fa fa-plus"></i>
                        </div>
                    </div>
                    
                </el-tab-pane>
            </el-tabs>
            <span class="loncom_zt_sidebar_btn" @click="navclick"><i class="fa fa-chevron-left" ref="navbtn"></i></span>
            
        </div>
        <div class="loncom_sidebar_right loncom_zt_sidebar_right" ref="content">
            <div class="loncom_zt_canvas">

            </div>
        </div>
        <!--选择设备分类-->
        <DialogZtMapAdd v-bind:dialogInfo="mapInfo"></DialogZtMapAdd>
    </div>
</template>


<script>
import DialogZtMapAdd from '../components/dialogZtMapAdd.vue'
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
        tabScroll(0)
        tabScroll(1)
        $(window).resize(function () {
            tabScroll(0)
            tabScroll(1)
        });
    },
    data() {
       return {
           //侧边点击显示或隐藏
           navbtn:'open',
           //侧边头部切换
           activeName: 'second',
           //电子地图列表
           map_list:[],
           //新增电子地图
            mapInfo:{
                title:"电子地图",
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
        //新增电子地图
        addMap:function(){
            this.mapInfo.visible=true;
        }

    },
    components:{DialogZtMapAdd}
}
</script>




