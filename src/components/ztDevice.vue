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
        draggable="true" @dragstart="drag($event)" @click="showDetail($event)"
        >
    </div>
</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        var _this=this;
        $("#canvas").resize(function () {
            _this.nowOffset();
        });
        this.nowOffset();
    },
    data() {
       return {
       }
   },
    methods:{
       //拖拽
        drag:function(ev){
            this.$parent.img_ev=ev;
            this.$parent.img_html=this;
        },

        nowOffset:function(){
            this.$emit('initDevice',this); 
        },
        //点击查询设备详情
        showDetail:function(event){
            this.$parent.img_html=this;
            this.$emit('showDetail',event); 
        },
           
    },
    props:["dialogInfo"],
}
</script>




