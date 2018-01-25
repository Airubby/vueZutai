<template>
    <div class="loncom_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备素材" name="first" class="el-tab-pane0">
                    <div class="loncom_zt_edititem loncom_zt_sidebarcon0">
                       <el-collapse v-model="activeItem" accordion>
                            <el-collapse-item title="视频" name="first">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                    <span v-for="item in video_list">
                                        <img :data-setting='item.setting' :data-type="item.type" :data-devid="item.devid" :id='item.id' :src="'static/zutai/images/'+item.img" draggable="true" @dragstart="drag($event)">
                                    </span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="门禁" name="second">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                   <span v-for="item in access_list">
                                        <img :data-setting='item.setting' :data-type="item.type" :data-devid="item.devid" :id='item.id' :src="'static/zutai/images/'+item.img" draggable="true" @dragstart="drag($event)">
                                    </span>
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
                    <el-tooltip class="item" content="返回" placement="top-end">
                        <span @click="backPage"><i class="fa fa-chevron-left"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="上一步操作" placement="top-end">
                        <span><i class="fa fa-mail-reply"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="下一步操作" placement="top-end">
                        <span><i class="fa fa-mail-forward"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除设备" placement="top-end">
                        <span><i class="fa fa-remove"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="保存操作" placement="top-end">
                        <span><i class="fa fa-save"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="上传机房图" placement="top-end">
                        <span @click="uploadImg"><i class="fa fa-cloud-upload"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="全屏预览" placement="top-end">
                        <span @click="fullScreen" ><i class="fa fa-arrows-alt"></i></span>
                    </el-tooltip>
                    
                </div>
            </div>
            <div class="loncom_zt_backFull" ref="backFull" @click="backFullScreen"><el-button type="primary">退出全屏</el-button></div>
            <div id="canvas" ref="canvas" class="loncom_zt_canvas"  @drop='drop($event)' @touchstart='drop($event)'  @dragover='allowDrop($event)' :style='{background:"url(static/zutai/images/"+canvas_img+") center center / contain no-repeat"}'>
                <!--拖拽的设备-->
                <span v-for="item in video_list" v-if="item.state"><ZtDevice v-bind:dialogInfo="item"></ZtDevice></span>
                <span v-for="item in access_list" v-if="item.state"><ZtDevice v-bind:dialogInfo="item"></ZtDevice></span>
            </div>
        </div>
        <!--上传图片-->
        <DialogZtUploadImg v-bind:dialogInfo="upload_img"></DialogZtUploadImg>
        
    </div>
</template>


<script>
import DialogZtUploadImg from '../components/dialogZtUploadImg.vue'
import ZtDevice from '../components/ztDevice.vue'
import Vue from 'vue' 
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
        //tabScroll(0)
        // $(window).resize(function () {
        //     tabScroll(0)
        // });
    },
    data() {
       return {
           //侧边点击显示或隐藏
           navbtn:'open',
           //侧边头部切换
           activeName: 'first',
           //手风琴切换
           activeItem: 'first',
           //存储拖拽过来的组件
           img_html:'',
           //开始拉取的设备的offset获取,点击设备时点击的那个点相对于自己的偏移量
           img_ev:'',
           //存储图片的width，height，缩放不更改这个值，新拉进来的设备就按这个值设置长宽
           img_info:{
               width:60,
               height:60
           },
           
           //视频侧边图片
           video_list:[
                {id:'1',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000105',state:false},
                {id:'2',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000106',state:false},
                {id:'3',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000107',state:false},
                {id:'4',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000108',state:false},
           ],
           //门禁侧边图片
          access_list:[
                {id:'5',img:'access.png',setting:'192.168.10.64,80,admin,admin@1234',type:'access',devid:'700000105',state:false},
                {id:'6',img:'access.png',setting:'192.168.10.64,80,admin,admin@1234',type:'access',devid:'700000106',state:false},
                {id:'7',img:'access.png',setting:'192.168.10.64,80,admin,admin@1234',type:'access',devid:'700000107',state:false},
                {id:'8',img:'access.png',setting:'192.168.10.64,80,admin,admin@1234',type:'access',devid:'700000108',state:false},
                
           ],
           //图片展示
           canvas_img:'',
           //上传图片
           upload_img:{
                title:'图片上传',
                visible:false,
                width:"500px",
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
            $(this.$refs.navbtnspan).hide(500);
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
        //返回主页面
        backPage:function(){
            this.$router.push({path:'/'});
        },
        //拖拽
        drag:function(ev){
            //console.log(ev)
            //console.log(this)
            this.img_ev=ev;
            //this.img_html=this;
            ev.dataTransfer.setData("id",ev.target.id);  //只能为id，其它属性不行
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        drop:function(ev){
            //console.log(ev)
            console.log(this.img_html)
            
            ev.preventDefault();
            var data = ev.dataTransfer.getData("id");
            if(data){  //第一次拖进来的时候赋了id的
                var setting= $("#"+data).data("setting")//获取setting参数
                var type= $("#"+data).data("type");//获取组件类型
                var devid= $("#"+data).data("devid");//获取组件设备ID
                var id="lon_"+type+devid;
                var list_item;
                if(type=="video"){  //视频
                    for(var i=0;i<this.video_list.length;i++){
                        if(this.video_list[i].devid==devid){
                            if(this.video_list[i].state==true){
                                this.$message.error('设备已存在！');
                                return;
                            }else{
                                this.video_list[i].state=true;
                                list_item=this.video_list[i];
                            }
                        }
                    }
                }else if(type=="access"){
                    for(var i=0;i<this.access_list.length;i++){
                        if(this.access_list[i].devid==devid){
                            if(this.access_list[i].state==true){
                                this.$message.error('设备已存在！');
                                return;
                            }else{
                                this.access_list[i].state=true;
                                list_item=this.access_list[i];
                            }
                        }
                    }
                }
                //拖拽的设备点击的那个点相对于设备自己的偏移
                list_item.pic_offset={left:this.img_ev.offsetX,top:this.img_ev.offsetY};  
                //拖拽的设备点击的那个点相对于右边电子地图的偏移量，拖拽后放手的那刻
                list_item.pic_tocanvas_offset={left:ev.offsetX,top:ev.offsetY};
            }else{ //在地图上拖拽
                console.log(this.img_html);
                // this.img_html.pic_offset=this.pic_offset;
                // this.img_html.pic_tocanvas_offset={left:ev.offsetX,top:ev.offsetY};
                //this.img_html.address()
                console.log(ev.offsetX)
                console.log(this.img_ev.offsetX)
                var left,top; //设备图片的偏移位置//设备图片最左边离电子地图最左边的距离，最头部的距离
                if(ev.offsetX-this.img_ev.offsetX<0){
                    left=0;
                }else if(ev.offsetX+(this.img_html.$el.offsetWidth-this.img_ev.offsetX)>$(this.$refs.canvas).width()){
                    left=$(this.$refs.canvas).width()-this.img_html.$el.offsetWidth;
                }else{
                    left=ev.offsetX-this.img_ev.offsetX
                }
                if(ev.offsetY-this.img_ev.offsetY<0){
                    top=0;
                }else if(ev.offsetY+(this.img_html.$el.offsetHeight-this.img_ev.offsetY)>$(this.$refs.canvas).height()){
                    top=$(this.$refs.canvas).height()-this.img_html.$el.offsetHeight;
                }else{
                    top=ev.offsetY-this.img_ev.offsetY
                }
                $(this.img_html.$el).css({
                    "left":left+"px",
                    "top":top+"px",
                    "width":this.img_html.$el.offsetWidth+"px",
                    "height":this.img_html.$el.offsetHeight+"px",
                });
                this.img_html.save_location.x=left;
                this.img_html.save_location.y=top;
            }
            
            // console.log(ev);
            // console.log(this.img_html);
            // console.log($(this.img_html.$el).width());
            // console.log(ev.offsetX);
            // var clientWidth=ev.target.clientWidth;
            // var clientHeight=ev.target.clientHeight;

            // var loc=getLoc(ev,this.img_html.$el);
            // this.img_html.$el.style.left=loc.x+"%";
            // this.img_html.$el.style.top=loc.y+"%";
           
        },


    },
    components:{DialogZtUploadImg,ZtDevice}
}
</script>




