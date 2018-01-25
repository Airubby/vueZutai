<template>
        <img 
        :data-setting='dialogInfo.setting' 
        :data-type="dialogInfo.type" 
        :data-devid="dialogInfo.devid" 
        :id='"lon_"+dialogInfo.type+dialogInfo.devid' 
        :src="'static/zutai/images/'+dialogInfo.img" 
        
        :ref='"lon_"+dialogInfo.type+dialogInfo.devid'
        draggable="true" @dragstart="drag($event)" class="loncom_canvas_samllimg">
</template>
<!--,left:dialogInfo.pic_offset.left+"px",top:dialogInfo.pic_offset.top+"px"
:style='{width:dialogInfo.pic_size.width+"px",height:dialogInfo.pic_size.height+"px"}'
-->

<script>

export default {
    created () {
        console.log(getBackgroundImageSize($("#canvas")))
    },
    mounted() {
        this.address();
        var _this=this;
        $(document.body).resize(function () {
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
           //设备图片的偏移位置
           save_location:{
                left:'',
                top:''
            },
            //背景图片的尺寸
            save_pic:getBackgroundImageSize($("#canvas")),
            pic_size:{
                width: 60,
                height: 60
            },


            //设备图片最左边离电子地图最左边的距离，最头部的距离
            pic_tocanvas_distance:{
                x:'',
                y:'',
            }

       }
   },
    methods:{
       //拖拽
        drag:function(ev){
            console.log(this)
            console.log(ev);
            this.$parent.img_ev=ev;
            this.$parent.img_html=this;
            
            this.save_location.x=this.$el.offsetLeft;
            this.save_location.y=this.$el.offsetTop;
        },
        address:function(){
            console.log(this)
            //设备最左边距离右边电子地图的最左边的距离
            this.pic_tocanvas_distance.x=this.dialogInfo.pic_tocanvas_offset.left-this.dialogInfo.pic_offset.left<0?0:this.dialogInfo.pic_tocanvas_offset.left-this.dialogInfo.pic_offset.left;
            this.pic_tocanvas_distance.y=this.dialogInfo.pic_tocanvas_offset.top-this.dialogInfo.pic_offset.top<0?0:this.dialogInfo.pic_tocanvas_offset.top-this.dialogInfo.pic_offset.top;

            $(this.$el).css({
                "left":this.pic_tocanvas_distance.x+"px",
                "top":this.pic_tocanvas_distance.y+"px",
                "width":this.$parent.img_info.width+"px",
                "height":this.$parent.img_info.height+"px",
            });

        },
        nowOffset:function(){
            //console.log(this)
            console.log(this.$el)
            // 位置计算 @save_back容器页面大小width,height  @save_location保存位置left,top  @save_pic 背景图片大小width,height 
            // @now_back改变后的容器页面大小width,height  @pic_size 控件大小
            var now_back={
                width: $("#canvas").width(),
                height: $("#canvas").height()
            }
            console.log(this.save_back)
            console.log(this.save_location)
             console.log(this.save_pic)
              console.log(this.pic_size)
              debugger
            var loc = nowLocation(this.save_back, this.pic_tocanvas_distance,this.save_pic,now_back,this.pic_size);
            console.log(loc)
         
            // this.$el.style.left=loc.x.toFixed(2)+"px";
            // this.$el.style.top=loc.y.toFixed(2)+"px";
            // this.$el.style.width=loc.width.toFixed(2)+"px";
            // this.$el.style.height=loc.height.toFixed(2)+"px";
            $(this.$el).css({
                "left":loc.x.toFixed(2)+"px",
                "top":loc.y.toFixed(2)+"px",
                "width":loc.width.toFixed(2),
                "height":loc.height.toFixed(2)
            });

        }
           
    },
    props:["dialogInfo"],
    components:{}
}
</script>




