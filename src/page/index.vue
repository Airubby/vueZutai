<template>
    <div class="loncom_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备目录" name="first" class="el-tab-pane0">
                    <div class="loncom_zt_sidebarcon0">设备目录</div>
                </el-tab-pane>
                <el-tab-pane label="设备地图" name="second" class="el-tab-pane1">
                    <div class="loncom_zt_sidebarcon loncom_zt_sidebarcon1">
                        <div class="loncom_zt_sidebarbox" v-for="(item,index) in map_list">
                            <div class="loncom_zt_maptitle" @click="showMap(item,index)">{{item.name}}</div>
                            <div class="loncom_zt_mapimg" @click="showMap(item,index)">
                                <img :src="item.img">
                            </div>
                            <div class="loncom_zt_map_btn">
                                <span @click="editItem(item,index)"><i class="fa fa-edit"></i></span>
                                <span><i class="fa fa-pencil" @click="editMap(item,index)"></i></span>
                                <span><i class="fa fa-trash" @click="removeMap(item,index)"></i></span>
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
            <div id="canvas" class="loncom_zt_canvas" :style='{background:"url("+canvas_img+") center center / contain no-repeat"}'>
                <span v-for="item in video_list" v-if="item.state"><ZtDeviceVideo v-bind:dialogInfo="item" v-on:init="init"></ZtDeviceVideo></span>
                <span v-for="item in access_list" v-if="item.state"><ZtDeviceAccess v-bind:dialogInfo="item" v-on:init="init"></ZtDeviceAccess></span>
            </div>
        </div>
        <!--电子地图新增编辑-->
        <DialogZtMapAdd v-bind:dialogInfo="mapInfo"></DialogZtMapAdd>
    </div>
</template>


<script>
import DialogZtMapAdd from '../components/dialogZtMapAdd.vue'
import ZtDeviceVideo from '../components/ztDeviceVideo.vue'
import ZtDeviceAccess from '../components/ztDeviceAccess.vue'

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
        console.log(obj);
        if(JSON.stringify(obj) == "{}"){
            this.mapIndex=0;
        }else{
            this.mapIndex=obj.index;
        }
        //设备信息初始化
        if (!localStorage.deviceInfo) {
            var deviceInfo={};
            deviceInfo.video=[
                {id:'1',name:'',img:'static/zutai/images/video.png',setting:'admin@1234',type:'video',devid:'700000105'},
                {id:'2',name:'',img:'static/zutai/images/video.png',setting:'admin@1234',type:'video',devid:'700000106'},
                {id:'3',name:'',img:'static/zutai/images/video.png',setting:'admin@1234',type:'video',devid:'700000107'},
                {id:'4',name:'',img:'static/zutai/images/video.png',setting:'admin@1234',type:'video',devid:'700000108'},
            ];
            deviceInfo.access=[
                {id:'1',name:'',img:'static/zutai/images/access.png',setting:'admin@1234',type:'access',devid:'7000001051'},
                {id:'2',name:'',img:'static/zutai/images/access.png',setting:'admin@1234',type:'access',devid:'7000001062'},
                {id:'3',name:'',img:'static/zutai/images/access.png',setting:'admin@1234',type:'access',devid:'7000001073'},
                {id:'4',name:'',img:'static/zutai/images/access.png',setting:'admin@1234',type:'access',devid:'7000001084'},
            ];
            localStorage.deviceInfo = JSON.stringify(deviceInfo);
        }
        //电子地图初始化
        if(!localStorage.mapInfo){
            var mapInfo={};
            mapInfo.map_list=[];
            localStorage.mapInfo = JSON.stringify(mapInfo);
        }else{
            this.map_list=JSON.parse(localStorage.mapInfo).map_list;
            if(this.map_list.length>0){
                this.canvas_img=this.map_list[this.mapIndex].img;
                for(var i=0;i<this.map_list[this.mapIndex].jsonArr.length;i++){
                    switch(this.map_list[this.mapIndex].jsonArr[i].type){
                        case "video":
                            this.video_list.push(this.map_list[this.mapIndex].jsonArr[i]);
                            break;
                        case "access":
                            this.access_list.push(this.map_list[this.mapIndex].jsonArr[i]);
                            break;
                    }
                }
            }
        }


    },
    mounted() {
        ztTabScroll(0)
        ztTabScroll(1)
        // $(window).resize(function () {
        // });
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
                visible:false,
                width:"500px",
                data:{},
            },
            //mapIndex显示那个电子地图
            mapIndex:'',
            //canvas_img电子地图背景图片
            canvas_img:'',
            //width，height，背景图片大小
            canvas_info:{},
            //设备信息
            video_list:[],
            //门禁信息
            access_list:[],

       }
   },
    methods:{
        //点击隐藏显示侧边
        navclick:function(){
			if(this.navbtn=='open'){
                $(this.$refs.sidebar).css({
                    "left":"-225px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.content).css({
                    "padding-left":"0",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.navbtn).addClass("fa-chevron-right");
                this.navbtn='close';
            }else{
                $(this.$refs.sidebar).css({
                    "left":"0",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.content).css({
                    "padding-left":"225px",
                    "transition":"all 0.4s ease-in"
                });
                $(this.$refs.navbtn).removeClass("fa-chevron-right");
                this.navbtn='open';
            }
        },
        //新增电子地图
        addMap:function(){
            this.mapInfo.title="新增电子地图";
            this.mapInfo.type="add";
            this.mapInfo.visible=true;
        },
        //编辑电子地图
        editItem:function(item,index){
            this.mapInfo.title="编辑电子地图";
            this.mapInfo.type="edit";
            this.mapInfo.index=index;
            this.mapInfo.visible=true;
            //var _item=JSON.parse(JSON.stringify(item));
            var _item=Object.assign({}, item);
            this.mapInfo.data=_item;
        },
        //编辑电子地图
        editMap:function(item,index){
            this.$router.push({path:'/editMap',query:{index:index}});
        },
        //删除电子地图
        removeMap:function(item,index){
            ev.stopPropagation();
            this.$confirm("删除此电子地图?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.map_list.splice(index,1);
                var mapInfo=JSON.parse(localStorage.mapInfo);
                mapInfo.map_list.splice(index,1);
                localStorage.mapInfo = JSON.stringify(mapInfo);
	       });
            
        },
        //设备组件改变时
        init:function(_this){
            var now_back={
                width: $("#canvas").width(),
                height: $("#canvas").height()
            }
            var loc = nowLocation(_this.dialogInfo.json.canvas_info, _this.dialogInfo.json.pic_offset,_this.dialogInfo.json.canvas_bg_info,now_back,_this.dialogInfo.json.pic_size);
            $(_this.$el).css({
                "left":loc.left.toFixed(2)+"px",
                "top":loc.top.toFixed(2)+"px",
                "width":loc.width.toFixed(2)+"px",
                "height":loc.height.toFixed(2)+"px"
            });
        },
        //点击切换地图
        showMap:function(item,index){
            console.log(item)
            this.mapIndex=index;
            this.canvas_img=item.img;
            this.video_list=[];
            this.access_list=[];
            for(var i=0;i<item.jsonArr.length;i++){
                switch(item.jsonArr[i].type){
                    case "video":
                        this.video_list.push(item.jsonArr[i]);
                        break;
                    case "access":
                        this.access_list.push(item.jsonArr[i]);
                        break;
                }
            }
        },


    },
    components:{DialogZtMapAdd,ZtDeviceVideo,ZtDeviceAccess}
}
</script>




