//ajax请求没用ajax请求
function open_ajax(url, parameter, request,type, error, async) {
    type = type ? type : "Get";
    $.ajax({
        type: type,
        url: url,
        data: parameter,
        async: async ? async : true,
        cache:false,
        error: function () {
            if (error != null && error != "") {
                error();
            }
        },
        success: function (msg) {
            if (request)
                request(msg);
        }
    });
}
//替换字符串,指定用在样式替换上,切换风格用的
function replaceString(string,str){
    var startStr=string.substring(0,9);
    var endStr=string.substring(string.indexOf('/css/'),string.length);
    return startStr+str+endStr;
}
//超出滚动
function scrollCon(){
	//获取要滚动的dom高度
    if($(".loncom_scroll_con").length>0){
    	var docHeight=$(window).height();
        var scrollHieght=$(".loncom_public_top").height();
        var thisHeight=$(".loncom_scroll_con").height();
        if($(".loncom_scroll_con").siblings().hasClass("loncom_public_top")){
        	$(".loncom_scroll_con").height(docHeight-scrollHieght);
        }else{
        	$(".loncom_scroll_con").height(thisHeight);
        }
        //添加滚动
        $('.loncom_scroll_con').niceScroll({
            cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
            cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
            cursorwidth: "2px", //像素光标的宽度
            cursorborder: "0", // 游标边框css定义
            cursorborderradius: "2px",//以像素为光标边界半径
            autohidemode: true //是否隐藏滚动条
        });
    }
}
$(window).resize(function () {
	scrollCon();
});
//全屏切换
var isFullScreen=false;//是否是全屏状态
function switcFullScreen(){
    if(isFullScreen){//是全屏就退出全屏
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }else{//不是就全屏
        var element=document.documentElement;
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    isFullScreen=!isFullScreen;
}	
//打开window弹窗
function windowOpen(url,Width,Height){
    var iWidth,iHeight;
    if(Width!=undefined&&Height!=undefined){
        iWidth=Width;
        iHeight=Height;
    }else{
        iWidth=1000;
        iHeight=600;
    }
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 10 - iHeight) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, "_blank", 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//tabs页面级的切换的滚动
function tabScroll(num){
    $('.loncom_public_tabbox'+num).niceScroll(".loncom_public_tabboxcon"+num,{
        cursorcolor: "rgba(204, 204, 204, 0.4)",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "2px",//以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
}
//生成树形JSON
function getJsonTree(dataJson,parentId){
    var itemArr=[];
    for(var i=0;i<dataJson.length;i++){ 
        var node=dataJson[i];
            if(node.pid==parentId){ 
            var newNode=node;
            newNode.children=getJsonTree(dataJson,node.id);
            itemArr.push(newNode);              
        }
    }
    return itemArr;
}



