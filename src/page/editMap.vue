<template>
    <div class="loncom_content" ref="loncom_zt_content">
        <div class="loncom_sidebar loncom_zt_sidebar" ref="sidebar">
            <el-tabs v-model="activeName">
                <el-tab-pane label="设备素材" name="first" class="el-tab-pane0">
                    <div class="loncom_zt_edititem loncom_zt_sidebarcon0">
                       <el-collapse v-model="activeItem" accordion>
                            <el-collapse-item title="视频" name="first">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                    <span v-for="item in video_list">
                                        <img :data-setting='item.setting' :data-type="item.type" :data-devid="item.devid" :id='item.id' :src="item.img" draggable="true" @dragstart="drag($event)">
                                    </span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="门禁" name="second">
                                <div class="loncom_zt_sidebarcon loncom_zt_item">
                                   <span v-for="item in access_list">
                                        <img :data-setting='item.setting' :data-type="item.type" :data-devid="item.devid" :id='item.id' :src="item.img" draggable="true" @dragstart="drag($event)">
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
                        <span @click="removeDevice"><i class="fa fa-remove"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="保存操作" placement="top-end">
                        <span @click="saveDevice"><i class="fa fa-save"></i></span>
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
            <div id="canvas" ref="canvas" @click="hideDevice" class="loncom_zt_canvas"  @drop='drop($event)' @touchstart='drop($event)'  @dragover='allowDrop($event)' :style='{background:"url("+canvas_img+") center center / contain no-repeat"}'>
                <!--拖拽的设备详情-->
                <div class="device_detail" ref="deviceShowDetail" @click="preventClick($event)">
                    <div class="device_detail_title">
                        <h2>部件属性</h2>
                    </div>
                    <div class="device_detail_con loncom_public_tabbox1">
                        <el-form ref="form" :model="form" label-width="70px" class="loncom_public_tabboxcon1">
                            <el-form-item label="自定图片">
                                <el-upload
                                        action=""
                                        :on-remove="handleRemove"
                                        :file-list="form.img"
                                        :on-success="handlesuccess"
                                        :limit="1"
                                        list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="名称" class="loncom_mt20">
                                <el-input v-model="form.title" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="宽" class="loncom_mt20">
                                <el-input v-model="form.width" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="高" class="loncom_mt20">
                                <el-input v-model="form.height" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="设备点" class="loncom_mt20">
                                <el-select multiple v-model="form.tipall" placeholder="选择显示设备点位" size="small">
                                    <el-option v-for="item in tipall" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动告警" class="loncom_mt20">
                                <el-switch v-model="form.hisalarm"></el-switch>
                            </el-form-item>
                            <el-form-item label="告警设置" size="small" class="loncom_mt20">
                                <el-color-picker v-model="form.color4"></el-color-picker>
                                <el-color-picker v-model="form.color3"></el-color-picker>
                                <el-color-picker v-model="form.color2"></el-color-picker>
                                <el-color-picker v-model="form.color1"></el-color-picker>
                            </el-form-item>
                            <el-form-item class="loncom_mt20">
                                <el-button type="primary" @click="onSubmit">确认</el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </div>
                <!--拖拽的设备-->
                <span v-for="item in video_list" v-if="item.state"><ZtDevice v-bind:dialogInfo="item" v-on:showDetail="showDetail"></ZtDevice></span>
                <span v-for="item in access_list" v-if="item.state"><ZtDevice v-bind:dialogInfo="item" v-on:showDetail="showDetail"></ZtDevice></span>
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
            this.$message.warning("请登录");
            this.$router.push({path:'/login'});
            return;
        }
        var obj = this.$route.query;
        this.mapIndex=obj.index;
        console.log(obj);
        var mapInfo=JSON.parse(localStorage.mapInfo);
        console.log(mapInfo)
        //初始化侧边设备
        var _this=this;
        function hasDeviceInfo(list){
            for(var i=0;i<list.length;i++){
                for(var j=0;j<mapInfo.map_list[obj.index].jsonArr.length;j++){
                    if(mapInfo.map_list[obj.index].jsonArr[j].type==list[i].type&&mapInfo.map_list[obj.index].jsonArr[j].devid==list[i].devid){
                        Vue.set(list[i],'state',true);
                        Vue.set(list[i],'json',mapInfo.map_list[obj.index].jsonArr[j].json);
                        Vue.set(list[i],'index',i);
                        _this.device_arrinfo.push(mapInfo.map_list[obj.index].jsonArr[j]);
                        break;
                    }else{
                        defaultInfo(list,i);
                    }
                }
            }
        }
        function defaultInfo(list,i){
            var imgUrl='';
            switch(list[i].type){
                case "video":
                    imgUrl='static/zutai/images/video.png';
                    break;
                case "access":
                    imgUrl='static/zutai/images/access.png';
                    break;
            }
            Vue.set(list[i],'state',false);
            Vue.set(list[i],'json',{
                name:'',img:imgUrl,tipall:'',hisalarm:false,color1:'',color2:'',color3:'',color4:'',
                pic_size:{width:60,height:60},
                pic_offset:{offsetX:'',offsetY:''},
                canvas_info:{width:'',height:'',bg:''}
            });
        }
        function noDeviceInfo(list){
            for(var i=0;i<list.length;i++){
                defaultInfo(list,i);
            }
        }
        if(localStorage.deviceInfo){
            var deviceInfo=JSON.parse(localStorage.deviceInfo);
            this.video_list=deviceInfo.video;
            this.access_list=deviceInfo.access;
            if(mapInfo.map_list[obj.index].jsonArr.length>0){  //初始化时有设备
                hasDeviceInfo(this.video_list);
                hasDeviceInfo(this.access_list);
            }else{
                noDeviceInfo(this.video_list);
                noDeviceInfo(this.access_list);
            }
            this.canvas_img=mapInfo.map_list[obj.index].img;
          
        }
        
    },
    mounted() {
        ztTabScroll(0)
        tabScroll(1)
        $(window).resize(function () {
            ztTabScroll(0)
            tabScroll(1)
        });
        var _this=this;
        document.onkeyup=function(event){
            var ev = event || window.event || arguments.callee.caller.arguments[0];
            if(ev.keyCode == 46){
                _this.removeDevice();
            }
            if(ev){
                switch(ev.keyCode){
                    case 46 :// 点击删除
                        _this.removeDevice();
                        break;
                    case 90:
                        if(event.ctrlKey){
                            
                        }
                        break;
                    case 89:
                        if(event.ctrlKey){
                           
                        }
                        break;
                    case 83:
                        if(event.ctrlKey){
                            _this.saveDevice();
                        }
                        break;

                }
            }
        }
        //canvas_info width，height，背景图片大小
        this.canvas_info.width=$("#canvas").width();
        this.canvas_info.height=$("#canvas").height();
        this.canvas_info.bg=getBackgroundImageSize($("#canvas"));
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
           //存储编辑的那个站点地图index   存本地库测试用到的
           mapIndex:'',
           
           //视频侧边图片
           video_list:[
                // {
                //     id:'1',name:'',img:'static/zutai/images/video.png',setting:'admin@1234',type:'video',devid:'700000105',state:false,
                //     json:{
                //         name:'',img:'static/zutai/images/video.png',tipall:'',hisalarm:false,color1:'',color2:'',color3:'',color4:'',
                //         pic_size:{width:60,height:60},
                //         pic_offset:{offsetX:'',offsetY:''}
                //     }
                // },
           ],
           //门禁侧边图片
          access_list:[],
           //图片展示
           canvas_img:'',
           //上传图片
           upload_img:{
                title:'图片上传',
                visible:false,
                width:"500px",
           },
           
           //查看设备详情
           //设备点位
           tipall:[
               {name:'点位一',id:1},
               {name:'点位二',id:2},
               {name:'点位三',id:3},
           ],
           form: {
                title: '',
                width:'',
                height:'',
                hisalarm:true,
                tipall:'',
                color1:'',
                color2:'',
                color3:'',
                color4:'',
                img:[{name: '', url:''}]
            },
            device_show:true,  //是否可以显示侧边详情
            //保存地图上的设备信息
            device_arrinfo:[],
            //width，height，背景图片大小保存的时候要存入，因为跳转到index时要用到这个参数
            canvas_info:{},


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
            this.$router.push({path:'/',query:{'index':this.mapIndex}});
        },
        //拖拽
        drag:function(ev){
            this.img_ev=ev;
            ev.dataTransfer.setData("id",ev.target.id);  //只能为id，其它属性不行
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        drop:function(ev){
            console.log(this.video_list)
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
                                list_item.index=i;
                            }
                        }
                    }
                }else if(type=="access"){ //门禁
                    for(var i=0;i<this.access_list.length;i++){
                        if(this.access_list[i].devid==devid){
                            if(this.access_list[i].state==true){
                                this.$message.error('设备已存在！');
                                return;
                            }else{
                                this.access_list[i].state=true;
                                list_item=this.access_list[i];
                                list_item.index=i;
                            }
                        }
                    }
                }
                //拖拽的设备点击的那个点相对于设备自己的偏移this.img_ev.offsetX,this.img_ev.offsetY
                //拖拽的设备点击的那个点相对于右边电子地图的偏移量，拖拽后放手的那刻ev.offsetX,ev.offsetY
                if(ev.offsetX-this.img_ev.offsetX<0){
                   list_item.json.pic_offset.offsetx=0;
                }else if(ev.offsetX+(list_item.width-this.img_ev.offsetX)>$("#canvas").width()){
                   list_item.json.pic_offset.offsetX=$("#canvas").width()-list_item.width;
                }else{
                   list_item.json.pic_offset.offsetX=ev.offsetX-this.img_ev.offsetX
                }
                if(ev.offsetY-this.img_ev.offsetY<0){
                   list_item.json.pic_offset.offsetY=0;
                }else if(ev.offsetY+(list_item.height-this.img_ev.offsetY)>$("#canvas").height()){
                   list_item.json.pic_offset.offsetY=$("#canvas").height()-list_item.json.pic_offset.height;
                }else{
                   list_item.json.pic_offset.offsetY=ev.offsetY-this.img_ev.offsetY
                }
                this.device_arrinfo.push(list_item);

            }else{ //在地图上拖拽
                console.log(this.img_html);
                //设备图片的偏移位置//设备图片最左边离电子地图最左边的距离，最头部的距离
                if(ev.offsetX-this.img_ev.offsetX<0){
                    this.img_html.dialogInfo.json.pic_offset.offsetX=0;
                }else if(ev.offsetX+(this.img_html.$el.offsetWidth-this.img_ev.offsetX)>$(this.$refs.canvas).width()){
                    this.img_html.dialogInfo.json.pic_offset.offsetX=$(this.$refs.canvas).width()-this.img_html.$el.offsetWidth;
                }else{
                    this.img_html.dialogInfo.json.pic_offset.offsetX=ev.offsetX-this.img_ev.offsetX
                }
                if(ev.offsetY-this.img_ev.offsetY<0){
                    this.img_html.dialogInfo.json.pic_offset.offsetY=0;
                }else if(ev.offsetY+(this.img_html.$el.offsetHeight-this.img_ev.offsetY)>$(this.$refs.canvas).height()){
                    this.img_html.dialogInfo.json.pic_offset.offsetY=$(this.$refs.canvas).height()-this.img_html.$el.offsetHeight;
                }else{
                    this.img_html.dialogInfo.json.pic_offset.offsetY=ev.offsetY-this.img_ev.offsetY
                }
               
            }
            
           
        },
        //查看设备详情
        showDetail:function(ev){
            ev.stopPropagation();
            console.log(this.img_html)
            this.form.title=this.img_html.dialogInfo.name;
            this.form.width=this.img_html.dialogInfo.json.pic_size.width;
            this.form.height=this.img_html.dialogInfo.json.pic_size.height;
            this.form.color1=this.img_html.dialogInfo.json.color1;
            this.form.color2=this.img_html.dialogInfo.json.color2;
            this.form.color3=this.img_html.dialogInfo.json.color3;
            this.form.color4=this.img_html.dialogInfo.json.color4;
            this.form.hisalarm=this.img_html.dialogInfo.json.hisalarm;
            this.form.img[0].url=this.img_html.dialogInfo.json.img;
            if(this.device_show){
                $(this.$refs.deviceShowDetail).css("right","0");
                this.device_show=false;
            }
        },
        //隐藏设备详情
        hideDevice:function(){
            if(!this.device_show){
                $(this.$refs.deviceShowDetail).css("right","-250px");
                this.device_show=true;
            }
        },
        //阻止事件
        preventClick:function(ev){
            ev.stopPropagation();
        },
        handleRemove:function(){

        },
        handlesuccess:function(){

        },
        //确认修改
        onSubmit:function(){
            this.$confirm('确认提交修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.img_html.dialogInfo.json.name=this.form.title;
                    this.img_html.dialogInfo.json.pic_size.width=this.form.width;
                    this.img_html.dialogInfo.json.pic_size.height=this.form.height;
                    this.img_html.dialogInfo.json.color1=this.form.color1;
                    this.img_html.dialogInfo.json.color2=this.form.color2;
                    this.img_html.dialogInfo.json.color3=this.form.color3;
                    this.img_html.dialogInfo.json.color4=this.form.color4;
                    this.img_html.dialogInfo.json.hisalarm=this.form.hisalarm;
                    $(this.$refs.deviceShowDetail).css("right","-250px");
                    this.device_show=true;
                });
        },
        //删除设备
        removeDevice:function(){
            console.log(this.img_html)
            if(this.img_html==""){
                this.$message.warning("请选择要删除的设备!");
                return;
            }
            this.$confirm('确认删除此设备?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                switch (this.img_html.dialogInfo.type){
                    case "video"://视频
                        this.video_list[this.img_html.dialogInfo.index].state=false;
                        this.video_list[this.img_html.dialogInfo.index].json={
                            name:'',img:'static/zutai/images/video.png',tipall:'',hisalarm:false,color1:'',color2:'',color3:'',color4:'',
                            pic_size:{width:60,height:60},
                            pic_offset:{offsetX:'',offsetY:''}
                        }
                        
                    case "access"://门禁

                }
                
                for(var i=0;i<this.device_arrinfo.length;i++){
                    if(this.device_arrinfo[i].type==this.img_html.dialogInfo.type&&this.device_arrinfo[i].devid==this.img_html.dialogInfo.devid){
                        this.device_arrinfo.splice(i,1);
                    }
                }
                $(this.$refs.deviceShowDetail).css("right","-250px");
                this.device_show=true;

            });
            
        },
        //保存操作
        saveDevice:function(){
            console.log(this.device_arrinfo)
            var mapInfo=JSON.parse(localStorage.mapInfo);
            console.log(mapInfo)
            mapInfo.map_list[this.mapIndex].jsonArr=[];
            mapInfo.map_list[this.mapIndex].jsonArr=this.device_arrinfo;
            mapInfo.map_list[this.mapIndex].img=this.canvas_img;
            mapInfo.map_list[this.mapIndex].canvas_info=this.canvas_info;
            localStorage.mapInfo = JSON.stringify(mapInfo);
            console.log(mapInfo);
            this.$message.success('保存成功');

        }


    },
    components:{DialogZtUploadImg,ZtDevice}
}
</script>




