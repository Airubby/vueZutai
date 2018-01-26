
//tabs页面级的切换的滚动
function ztTabScroll(num){
    $('.el-tab-pane'+num).niceScroll(".loncom_zt_sidebarcon"+num,{
        cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "2px",//以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
}

//获取背景图片大小getBackgroundImageSize($("#canvas"))
function getBackgroundImageSize(e){
    var backImg = $(e).css("background-image");
    //上传到服务器用
    if (backImg && backImg != "none") {
        var img = new Image();
        img.src = backImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        return {
            width:img.width,
            height:img.height
        }
    }

    return {
        width: $(e).width(),
        height: $(e).height()
    }
}
//位置计算 @save_back容器页面大小width,height  @save_location保存位置left,top  @save_pic 背景图片大小width,height 
// @now_back改变后的容器页面大小width,height  @pic_size 控件大小
function nowLocation(save_back, save_location, save_pic, now_back, pic_size) {
    var mylocation = {};//返回位置
    if ((save_location.x - save_back.width <= 3 && save_location.x - save_back.width >= -3) && (save_location.y - save_back.height <= 3 && save_location.y - save_back.height >= -3)) {//保存地点靠近中心点3像素范围内，直接返回中心店
        mylocation.x = now_back.width / 2;
        mylocation.y = now_back.height / 2;
        return mylocation;
    }

    //返回位置
    var kT = save_pic.width / save_pic.height;							//图片宽高比
    var kH = save_back.width / save_back.height;	//保存视图区宽高比
    var xH;								//保存时的图片宽度
    //计算保存时图片宽度
    if (kT <= kH) {//宽度溢出
        xH = kT * save_back.height;
    }
    else {
        xH = save_back.width;
    }
    //计算保存时地点关于中心点坐标系的坐标
    var p0 = {};
    p0.x = save_location.x - save_back.width / 2;
    p0.y = save_location.y - save_back.height / 2;

    //计算当前图片宽度
    var kN = now_back.width / now_back.height;	//当前视图区宽高比
    var xN;
    if (kT <= kN) {
        xN = kT * now_back.height;
    }
    else {
        xN = now_back.width;
    }
    //保存时图片大小和现在的图片大小缩放比例
    var ks = xH / xN;
    //现地点关于中心点坐标系的坐标为
    var pn = {};
    pn.x = p0.x / ks;
    pn.y = p0.y / ks;

    //现地点关于中心点左上角坐标系的坐标为
    mylocation.x = pn.x + now_back.width / 2;
    mylocation.y = pn.y + now_back.height / 2;
    if (pic_size) {
        mylocation.width = pic_size.width / ks;
        mylocation.height = pic_size.height / ks;
    }
    return mylocation;
}

































//获取位置
function getLoc(event, obj) {
    var loc = {};
    if(event.type=="drop"){
        var xwidth=obj.offsetWidth
        var yheight=obj.offsetHeight;
        var x=0;
        var y=0;
        if(event.target.contains(obj)){
            if(xwidth<0)xwidth=0;
             x=event.offsetX-(xwidth/2);
            if(yheight<0)yheight=0;
             y=event.offsetY-(yheight/2);
            loc.x=((x/event.target.offsetWidth*100)).toFixed(2);
            loc.y=((y/event.target.offsetHeight*100)).toFixed(2);
        }
        // else{
        //     var widths=getStyle(document.querySelector(".loncom_zt_sidebar"),"opacity")==0?0:225;
        //     if(xwidth<0)xwidth=0;
        //     x=event.pageX-(xwidth/2)-widths;
        //     if(yheight<0)yheight=0;
        //     y=event.pageY-(yheight/2)-62;
        //    // console.log(event.currentTarget.offsetWidth)
        //     loc.x=((x/event.currentTarget.offsetWidth*100)).toFixed(2);
        //     loc.y=((y/event.currentTarget.offsetHeight*100)).toFixed(2);
        //     console.log(loc.x,loc.y)
        // }

    }
    return loc;

}
function getStyle(obj,styleName){
    if(obj.currentStyle){
        return obj.currentStyle[styleName];
    }else{
        return getComputedStyle(obj,null)[styleName];
    }
}