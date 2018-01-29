<template>
        <img 
        :data-setting='dialogInfo.setting' 
        :data-type="dialogInfo.type" 
        :data-devid="dialogInfo.devid" 
        :id='"lon_"+dialogInfo.type+dialogInfo.devid' 
        :src="dialogInfo.json.img||dialogInfo.img" 
        :ref='"lon_"+dialogInfo.type+dialogInfo.devid'
        @click="showDetail($event)"
        :style='{
            width:dialogInfo.json.pic_size.width+"px",
            height:dialogInfo.json.pic_size.height+"px",
            left:dialogInfo.json.pic_offset.offsetX+"px",
            top:dialogInfo.json.pic_offset.offsetY+"px"}'
        class="loncom_canvas_samllimg">

</template>


<script>

export default {
    created () {
        
    },
    mounted() {
        
        this.save_back.width=this.$parent.canvas_info.width;
        this.save_back.height=this.$parent.canvas_info.height;
        this.save_pic=this.$parent.canvas_info.bg;
        var _this=this;
        $("#canvas").resize(function () {
            _this.nowOffset();
        });
        this.nowOffset();
    },
    data() {
       return {
          
           //容器页面大小
           save_back:{
                width:'',
                height:''
           },
            //背景图片的尺寸
            save_pic:'',
       }
   },
    methods:{
        
        nowOffset:function(){
            // 位置计算 @save_back容器页面大小width,height  @pic_offset保存位置left,top  @save_pic 背景图片大小width,height 
            // @now_back改变后的容器页面大小width,height  @pic_size 控件大小
            var now_back={
                width: $("#canvas").width(),
                height: $("#canvas").height()
            }
            
            var loc = nowLocation(this.save_back, this.dialogInfo.json.pic_offset,this.save_pic,now_back,this.dialogInfo.json.pic_size);
            console.log(loc)
            $(this.$el).css({
                "left":loc.x.toFixed(2)+"px",
                "top":loc.y.toFixed(2)+"px",
                "width":loc.width.toFixed(2),
                "height":loc.height.toFixed(2)
            });
        },
        //点击查询设备详情
        showDetail:function(event){
            
        },
           
    },
    props:["dialogInfo"],
    components:{}
}
</script>




