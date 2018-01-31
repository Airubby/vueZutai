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
                    <el-tooltip class="item" content="撤销(Ctrl+z)" placement="top-end">
                        <span @click="backout"><i class="fa fa-mail-reply"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="反撤销(Ctrl+y)" placement="top-end">
                        <span @click="returnBackout"><i class="fa fa-mail-forward"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="删除设备(Delete)" placement="top-end">
                        <span @click="removeDevice"><i class="fa fa-remove"></i></span>
                    </el-tooltip>
                    <el-tooltip class="item" content="保存操作(Ctrl+s)" placement="top-end">
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
            <div id="canvas" ref="canvas" @click="hideDevice" class="loncom_zt_canvas loncom_zt_canvasedit"  @drop='drop($event)' @touchstart='drop($event)'  @dragover='allowDrop($event)' :style='{background:"url("+canvas_img+") center center / contain no-repeat"}'>
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
                        _this.init_device.push(mapInfo.map_list[obj.index].jsonArr[j]);

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
            Vue.set(list[i],'index',i);
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
        // ztTabScroll(0)
        // tabScroll(1)
        // $(window).resize(function () {
        //     ztTabScroll(0)
        //     tabScroll(1)
        // });
        var _this=this;
        document.onkeydown=function(event){
            var ev = event || window.event || arguments.callee.caller.arguments[0];
            if(ev){
                switch(ev.keyCode){
                    case 46 :// 点击删除
                        _this.removeDevice();
                        break;
                    case 90:
                        if(ev.ctrlKey){ //撤销 ctrl+z
                            _this.backout();
                        }
                        break;
                    case 89:
                        if(ev.ctrlKey){ //反撤销  ctrl+y
                           _this.returnBackout();
                        }
                        break;
                    case 83:
                        ev.preventDefault(); 
                        if(ev.ctrlKey){
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
        //将初始化的设备赋不同的地址
        var _arr=[];
        for(var i=0;i<this.init_device.length;i++){
            _arr.push(JSON.parse(JSON.stringify(this.init_device[i])));
        }
        this.init_device=_arr.slice(0);
        

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
            //撤销的数组，撤销将数组最后一个元素去掉，在反撤销的最后增加这个元素，每一个设备，操作都要存入撤销数组
            backoutArr:[],
            //反撤销数组，反撤销将数组最后一个元素去掉，在撤销最后增加这个元素
            returnBackoutArr:[],
            //操作的次数，退出时判断是否保存了用的
            handle_num:'',
            //保存删除的设备删除之前的状态，删除时存储
            delete_device:[],
            //保存删除的设备删除之前的状态，撤销时存储
            return_delete_device:[],
            //保存初始化时已有的设备状态
            init_device:[],

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
            if(this.handle_num!=this.backoutArr.length){
                this.$message.warning('请保存操作');
                return;
            }
            this.$router.push({path:'/',query:{'index':this.mapIndex}});
        },
        //拖拽
        drag:function(ev){
            this.img_ev=ev;
            ev.dataTransfer.setData("id","lon_"+ev.target.dataset.type+ev.target.dataset.devid);
            ev.dataTransfer.setData("type",ev.target.dataset.type);
            ev.dataTransfer.setData("devid",ev.target.dataset.devid);
        },
        allowDrop:function (ev) {
            ev.preventDefault();
        },
        drop:function(ev){
            ev.preventDefault();
            var id = ev.dataTransfer.getData("id");
            var type=ev.dataTransfer.getData("type");
            var devid=ev.dataTransfer.getData("devid");
            if(id){  //第一次拖进来的时候赋了id的
                var list_item;
                switch(type){
                    case "video":
                        list_item=this.judge(this.video_list,devid);
                        break;
                    case "access":
                        list_item=this.judge(this.access_list,devid);
                        break;
                }
                if(list_item==false){
                    return;
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
                this.device_arrinfo.push(list_item);  //存储拖拽过来的组件
                var obj=JSON.parse(JSON.stringify(list_item));
                this.backoutArr.push(obj);  //保存操作
                

            }else{ //在地图上拖拽
                //设备图片的偏移位置//设备图片最左边离电子地图最左边的距离，最头部的距离
                if(ev.offsetX-this.img_ev.offsetX<0){ //左边拖出地图了，或者向左拖动了一点点
                    if(ev.x+this.img_ev.offsetX>this.img_ev.x){ //向左移动了一点
                        this.img_html.dialogInfo.json.pic_offset.offsetX=this.img_html.dialogInfo.json.pic_offset.offsetX-(this.img_ev.offsetX-ev.offsetX);
                    }else{
                        this.img_html.dialogInfo.json.pic_offset.offsetX=0;
                    }
                }else{ //右边拖出地图了，或者向右拖动了一点点
                    if(ev.offsetX+(this.img_html.$el.offsetWidth-this.img_ev.offsetX)>$(this.$refs.canvas).width()){
                        this.img_html.dialogInfo.json.pic_offset.offsetX=$(this.$refs.canvas).width()-this.img_html.$el.offsetWidth;
                    }else if(ev.offsetX<this.img_html.dialogInfo.json.pic_size.width){
                        this.img_html.dialogInfo.json.pic_offset.offsetX=this.img_html.dialogInfo.json.pic_offset.offsetX+(ev.offsetX-this.img_ev.offsetX);
                    }else{
                        this.img_html.dialogInfo.json.pic_offset.offsetX=ev.offsetX-this.img_ev.offsetX
                    }
                }
                if(ev.offsetY-this.img_ev.offsetY<0){ //上边拖出地图了，或者向上拖动了一点点
                    if(ev.y+this.img_ev.offsetY>this.img_ev.y){ //向上移动了一点
                        this.img_html.dialogInfo.json.pic_offset.offsetY=this.img_html.dialogInfo.json.pic_offset.offsetY-(this.img_ev.offsetY-ev.offsetY);
                    }else{
                        this.img_html.dialogInfo.json.pic_offset.offsetY=0;
                    }
                }else{ //下边拖出地图了，或者向下拖动了一点点
                    if(ev.offsetY+(this.img_html.$el.offsetHeight-this.img_ev.offsetY)>$(this.$refs.canvas).height()){
                        this.img_html.dialogInfo.json.pic_offset.offsetY=$(this.$refs.canvas).height()-this.img_html.$el.offsetHeight;
                    }else if(ev.offsetY<this.img_html.dialogInfo.json.pic_size.height){
                        this.img_html.dialogInfo.json.pic_offset.offsetY=this.img_html.dialogInfo.json.pic_offset.offsetY+(ev.offsetY-this.img_ev.offsetY);
                    }else{
                        this.img_html.dialogInfo.json.pic_offset.offsetY=ev.offsetY-this.img_ev.offsetY
                    }
                }
                var obj=JSON.parse(JSON.stringify(this.img_html.dialogInfo));
                this.backoutArr.push(obj);  //保存操作
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
                        this.deleteDevice(this.video_list,this.img_html.dialogInfo.index,'static/zutai/images/video.png');
                        break;
                    case "access"://门禁
                        this.deleteDevice(this.access_list,this.img_html.dialogInfo.index,'static/zutai/images/access.png');
                        break;

                }
                for(var i=0;i<this.device_arrinfo.length;i++){
                    if(this.device_arrinfo[i].type==this.img_html.dialogInfo.type&&this.device_arrinfo[i].devid==this.img_html.dialogInfo.devid){   
                        this.delete_device.push(this.device_arrinfo[i]);  //保存删除的设备删除之前的状态，撤销反撤销用
                        this.device_arrinfo.splice(i,1);  //先保存在删除
                    }
                }
                $(this.$refs.deviceShowDetail).css("right","-250px");
                this.device_show=true;

            });
            
        },
        //第一次拖进来的时候判断是否已经存在此设备
        judge:function(list,devid){
            var list_item;
            for(var i=0;i<list.length;i++){
                if(list[i].devid==devid){
                    if(list[i].state==true){
                        this.$message.error('设备已存在！');
                        return false;
                    }else{
                        list[i].state=true;
                        list_item=list[i];
                        list_item.index=i;
                        return list_item;
                    }
                }
            }
        },
        //删除设备的函数
        deleteDevice:function(list,index,imgUrl){
            list[index].state=false;
            list[index].json={
                name:'',img:imgUrl,tipall:'',hisalarm:false,color1:'',color2:'',color3:'',color4:'',
                pic_size:{width:60,height:60},
                pic_offset:{offsetX:'',offsetY:''}
            }
            this.backoutArr.push(list[index]);  //保存操作
            console.log(this.backoutArr)
        },
        //保存操作
        saveDevice:function(){
            
            var mapInfo=JSON.parse(localStorage.mapInfo);
            mapInfo.map_list[this.mapIndex].jsonArr=[];
            mapInfo.map_list[this.mapIndex].jsonArr=this.device_arrinfo;
            mapInfo.map_list[this.mapIndex].img=this.canvas_img;
            mapInfo.map_list[this.mapIndex].canvas_info=this.canvas_info;
            localStorage.mapInfo = JSON.stringify(mapInfo);
            this.$message.success('保存成功');
            this.handle_num=this.backoutArr.length;

        },
        //撤销
        backout:function(){
            //debugger
            console.log(this.backoutArr);
            if(this.backoutArr.length>0){
                var lastObj=this.backoutArr[this.backoutArr.length-1];
                var type=this.backoutArr[this.backoutArr.length-1].type;
                var index=this.backoutArr[this.backoutArr.length-1].index;
                if(lastObj.state){ //最后一步是移动操作
                    var arr=[];
                    for(var i=0;i<this.backoutArr.length;i++){
                        if(this.backoutArr[i].type==lastObj.type&&this.backoutArr[i].devid==lastObj.devid){
                            arr.push(this.backoutArr[i]);
                        }
                    }
                    if(arr.length>1){  //等于1时就是第一次操作此设备
                        switch(type){
                            case "video":
                                this.video_list.splice(index,1,this.backoutArr[this.backoutArr.length-2]);
                            case "access":
                                this.access_list.splice(index,1,this.backoutArr[this.backoutArr.length-2]);
                        }
                    }else{  //此设备就只操作了这一次
                        //数组中只有一个此设备的状态了，判断是初始化就存在的设备还是拖进来的，初始化的就还原为初始化的状态,拖进来的就不显示了
                        var moveTo=true; //假设为拖进来的
                        for(var i=0;i<this.init_device.length;i++){
                            if(this.init_device[i].type==lastObj.type&&this.init_device[i].devid==lastObj.devid){ //初始化就有的
                                switch(type){  
                                    case "video":
                                        this.video_list.splice(index,1,this.init_device[i]);
                                    case "access":
                                        this.access_list.splice(index,1,this.init_device[i]);
                                        
                                }
                                moveTo=false;
                            }
                        }
                        if(moveTo){ //拖进来的
                            switch(type){  
                                case "video":
                                    this.video_list[index].state=false;
                                case "access":
                                    this.access_list[index].state=false;
                            }
                        }
                    }
                }else{ //最后一步是删除设备操作
                    switch(type){  //先撤销回删除时的状态
                        case "video":
                            this.video_list.splice(index,1,this.delete_device[this.delete_device.length-1]);
                        case "access":
                            this.access_list.splice(index,1,this.delete_device[this.delete_device.length-1]);
                    }
                    //再操作撤回后的数组状态
                    this.return_delete_device.push(this.delete_device[this.delete_device.length-1]);
                    this.delete_device.splice(this.delete_device.length-1,1);
                }
                this.returnBackoutArr.push(lastObj);
                this.backoutArr.splice(this.backoutArr.length-1,1);

            }else{
                this.$message.warning('没有撤销的操作！');
            }
        },
        //反撤销
        returnBackout:function(){
            if(this.returnBackoutArr.length>0){
                var lastObj=this.returnBackoutArr[this.returnBackoutArr.length-1];
                var type=this.returnBackoutArr[this.returnBackoutArr.length-1].type;
                var index=this.returnBackoutArr[this.returnBackoutArr.length-1].index;
                switch(type){  //先撤销回删除时的状态
                    case "video":
                        this.video_list.splice(index,1,lastObj);
                    case "access":
                        this.access_list.splice(index,1,lastObj);
                }
                this.backoutArr.push(lastObj);
                this.returnBackoutArr.splice(this.returnBackoutArr.length-1,1);
            }else{
                this.$message.warning('没有反撤销的操作！');
            }
        },

    },
    components:{DialogZtUploadImg,ZtDevice}
}
</script>




