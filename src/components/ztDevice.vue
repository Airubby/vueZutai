<template>
        <img 
        :data-setting='dialogInfo.setting' 
        :data-type="dialogInfo.type" 
        :data-devid="dialogInfo.devid" 
        :id='"lon_"+dialogInfo.type+dialogInfo.devid' 
        :src="'static/zutai/images/'+dialogInfo.img" 
        :ref='"lon_"+dialogInfo.type+dialogInfo.devid'
        draggable="true" @dragstart="drag($event)" @click="showDetail($event)"
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
        this.address();
        var _this=this;
        $("#canvas").resize(function () {
            _this.nowOffset();
        });
    },
    data() {
       return {
           //容器页面大小
           save_back:{
                width:$("#canvas").width(),
                height:$("#canvas").height()
           },
           //设备图片的偏移位置//设备图片最左边离电子地图最左边的距离，最头部的距离
           save_location:{
                x:'',
                y:''
            },
            //背景图片的尺寸
            save_pic:getBackgroundImageSize($("#canvas")),
            


       }
   },
    methods:{
       //拖拽
        drag:function(ev){
            console.log(12)
            this.$parent.img_ev=ev;
            this.$parent.img_html=this;
        },
        address:function(){
            console.log(this)
            //第一次拖拽进来的时候执行
            //设备最左边距离右边电子地图的最左边,上边的距离
            // if(this.dialogInfo.pic_tocanvas_offset.left-this.dialogInfo.pic_offset.left<0){
            //     this.save_location.x=0;
            // }else if(this.dialogInfo.pic_tocanvas_offset.left+(this.dialogInfo.json.width-this.dialogInfo.pic_offset.left)>$("#canvas").width()){
            //     this.save_location.x=$("#canvas").width()-this.dialogInfo.json.width;
            // }else{
            //     this.save_location.x=this.dialogInfo.pic_tocanvas_offset.left-this.dialogInfo.pic_offset.left
            // }
            // if(this.dialogInfo.pic_tocanvas_offset.top-this.dialogInfo.pic_offset.top<0){
            //     this.save_location.y=0;
            // }else if(this.dialogInfo.pic_tocanvas_offset.top+(this.dialogInfo.json.height-this.dialogInfo.pic_offset.top)>$("#canvas").height()){
            //     this.save_location.y=$("#canvas").height()-this.dialogInfo.json.height;
            // }else{
            //     this.save_location.y=this.dialogInfo.pic_tocanvas_offset.top-this.dialogInfo.pic_offset.top
            // }
            // $(this.$el).css({
            //     "left":this.save_location.x+"px",
            //     "top":this.save_location.y+"px",
            //     "width":this.dialogInfo.json.width+"px",
            //     "height":this.dialogInfo.json.height+"px",
            // });

        },
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
            this.$parent.img_html=this;
            this.$emit('showDetail',event); 
        },
           
    },
    props:["dialogInfo"],
    components:{}
}
</script>




