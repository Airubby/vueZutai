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
            console.log(this.dialogInfo)
            // this.$emit('initDevice',this); 
            var now_back={
                width: $("#canvas").width(),
                height: $("#canvas").height()
            }
            var loc = nowLocation(this.dialogInfo.json.canvas_info, this.dialogInfo.json.pic_offset,this.dialogInfo.json.canvas_bg_info,now_back,this.dialogInfo.json.pic_size);
            console.log(loc)
            $(this.$el).css({
                "left":loc.left.toFixed(2)+"px",
                "top":loc.top.toFixed(2)+"px",
                "width":loc.width.toFixed(2)+"px",
                "height":loc.height.toFixed(2)+"px"
            });
            this.dialogInfo.json.pic_offset.offsetX=loc.left;
            this.dialogInfo.json.pic_offset.offsetY=loc.top;
            this.dialogInfo.json.pic_size.width=loc.width;
            this.dialogInfo.json.pic_size.height=loc.height;
            this.dialogInfo.json.canvas_info=now_back;
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




