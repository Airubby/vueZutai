<template>
    <div :style='{
            width:dialogInfo.json.pic_size.width+"px",
            height:dialogInfo.json.pic_size.height+"px",
            left:dialogInfo.json.pic_offset.offsetX+"px",
            top:dialogInfo.json.pic_offset.offsetY+"px"}' 
            class="loncom_canvas_smallimg">
        <img 
        :data-setting='dialogInfo.setting' 
        :data-type="dialogInfo.type" 
        :data-devid="dialogInfo.devid" 
        :id='"lon_"+dialogInfo.type+dialogInfo.devid' 
        :src="dialogInfo.json.img||dialogInfo.img" 
        :ref='"lon_"+dialogInfo.type+dialogInfo.devid'
        @click="showDetail($event)"
        >

        <!--视频详情-->
        <DialogZtVideo v-bind:dialogInfo="videoInfo"></DialogZtVideo>



    </div>
</template>


<script>
import DialogZtVideo from '../components/dialogZtVideo.vue'
export default {
    created () {
        
    },
    mounted() {
        //改变浏览器用到的信息
        var _this=this;
        $("#canvas").resize(function () {
            _this.init();
        });
        this.init();
        //结束

    },
    data() {
       return {
            //video弹窗
            videoInfo:{
                title:'视频详情',
                visible:false,
                width:"800px",
                data:{},
            },

       }
   },
    methods:{
        //改变浏览器用到的信息
        init:function(){
            this.$emit('init',this); 
        },
        
        //点击查询详情
        showDetail:function(){
            this.videoInfo.visible=true;
        },
           
    },
    props:["dialogInfo"],
    components:{DialogZtVideo}
}
</script>




