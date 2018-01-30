<template>
    <div :style='{
            width:dialogInfo.json.pic_size.width+"px",
            height:dialogInfo.json.pic_size.height+"px",
            left:dialogInfo.json.pic_offset.offsetX+"px",
            top:dialogInfo.json.pic_offset.offsetY+"px"}' 
            class="loncom_canvas_smallimg"
            >
        <el-tooltip placement="top" effect="light">
            <img 
            :data-setting='dialogInfo.setting' 
            :data-type="dialogInfo.type" 
            :data-devid="dialogInfo.devid" 
            :id='"lon_"+dialogInfo.type+dialogInfo.devid' 
            :src="dialogInfo.json.img||dialogInfo.img" 
            :ref='"lon_"+dialogInfo.type+dialogInfo.devid'
            
            >
            <div slot="content" style="width: 200px;height:100px;"><h2 style="color:#09c;">门禁信息内容</h2></div>
        </el-tooltip>
        

    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
       
        var _this=this;
        $("#canvas").resize(function () {
            _this.init();
        });
        this.init();

    },
    data() {
       return {
            //video弹窗
            videoInfo:{
                title:'门禁详情',
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
           
    },
    props:["dialogInfo"],
    components:{}
}
</script>




