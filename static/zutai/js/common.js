String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({[" + key + "]})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
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
        }else{
            var widths=getStyle(document.querySelector(".conf-nav"),"opacity")==0?0:223;
            if(xwidth<0)xwidth=0;
            x=event.pageX-(xwidth/2)-widths;
            if(yheight<0)yheight=0;
            y=event.pageY-(yheight/2)-62;
           // console.log(event.currentTarget.offsetWidth)
            loc.x=((x/event.currentTarget.offsetWidth*100)).toFixed(2);
            loc.y=((y/event.currentTarget.offsetHeight*100)).toFixed(2);
            console.log(loc.x,loc.y)
        }

    }
    return loc;

}

function getTest(offset,obj){
    var widths=getStyle(document.querySelector(".conf-nav"),"opacity")==0?0:223;
    if(obj.width<0)xwidth=0;
    x=event.pageX-(obj.width/2)-widths;
    if(obj.height<0)obj.height=0;
    y=event.pageY-(obj.height/2)-62;
    // console.log(event.currentTarget.offsetWidth)
    loc.x=((x/offset.offsetWidth*100)).toFixed(2);
    loc.y=((y/offset.offsetHeight*100)).toFixed(2);

}


//检查对象的父控件是否包含指定ID对象
function checkObjectParent (id){
    var content = false;

    if ($("#canvas").find("#"+id).length>0) {
        content=true;
    }


    return content;
}

function pushArray(dom){
 var bs=false;
    $.each(TemplateAll,function(index,value){
        if(value.devid==dom.devid){
            value=dom;
            bs=true;
            return false;
        }
    })
  if(!bs){
      TemplateAll.push(dom);

  }
}




//左边菜单操作
function displeymenun(obj){
  if(!$(".conf-nav").hasClass("loncom-fadeoutL")){
      $(".conf-nav").addClass("loncom-fadeoutL");
      $(".conf-nav").removeClass("loncom-fadeinL");
      $(".conf-mode").css("padding","0px");
      $(obj).removeClass("meun-left").addClass("meun-right").find("i").removeClass("icon-chevron-left").addClass(" icon-chevron-right")
  }else{
      $(".conf-nav").addClass("loncom-fadeinL");
      $(".conf-nav").removeClass("loncom-fadeoutL");
      $(".conf-mode").css("padding"," 0px 0px 0px 223px");
      $(obj).removeClass("meun-right").addClass("meun-left").find("i").removeClass("icon-chevron-right").addClass("icon-chevron-left");
  }
}
//退出全屏
function outscreen(){
    //退出全屏
    $("#outscreen").removeClass("loncom-fadeinT").addClass("loncom-fadeoutT");
    $(".conf-nav").addClass("loncom-fadeinL");
    $(".conf-nav").removeClass("loncom-fadeoutL");
    $(".conf-mode").css("padding"," 0px 0px 0px 223px");
    $(".meun-right").removeClass("meun-right").addClass("meun-left").find("i").removeClass("icon-chevron-right").addClass("icon-chevron-left");
    $(".meun-left,.meun-right").show();
    $("#tool").addClass("loncom-fadeinT").removeClass("loncom-fadeoutT");
}

var settings = {
    trigger:'hover',
    title:'Pop Title',
    content:'<p>This is webui popover demo.</p><p>just enjoy it and have fun !</p>',
    multi:true,
    closeable:false,
    style:'',
    padding:true
};


function getImgUrl(img){

	if(img){
		
		return img.substr(img.lastIndexOf("(")+1,img.lastIndexOf(")")-5);  
	}
	return null;
	
}

function getRootPath(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName="";
     projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    return(localhostPaht+projectName);  
}

// 获取查询参数
function getQueryParams(url) {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);
    if (url) query = url.substr(url.indexOf("?") + 1)

    var urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);

    return urlParams;
}

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
	this.splice(index, 1);
	}
	};
	
	Array.prototype.update = function(val,id) {
		for(var i=0;i<this.length;i++){
			if(this[i][id]==val[id]){
				this[i]=val;
			}
			
		}
		return this;
	};

function getStyle(obj,styleName){
    if(obj.currentStyle){
        return obj.currentStyle[styleName];
    }else{
        return getComputedStyle(obj,null)[styleName];
    }
}

function getTypeName(key){
var title="";
    switch (key){

        case "1":
            title="环境"
            break;
        case "2":
            title="配电"
            break;
        case "3":
            title="空调"
            break;
        case "NVR":
            title="视频"
            break;
        case "ACCESS":
            title="门禁"
            break;
        default :
            title="其他"
            break;

    }

    return title;
}

//位置计算 @save_back容器页面大小W H  @save_location保存位置X Y @save_pic 图片大小 @now_back改变后的大小 @pic_size 控件大小
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
    window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
}


//获取背景图片大小
function getBackgroundImageSize(e){
    var backImg = $(e).css("background-image");

    if (backImg && backImg != "none") {
        var img = new Image();
        img.src = backImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

        function getImageSize(img) {
            var size = {
                width: img.width,
                height: img.height
            }
            //if (size.width == 0 || size.height == 0) {
            //    size = getImageSize(img);
            //}
            return size;
        }
        return getImageSize(img);
    }
    return {
        width: $(e).width(),
        height: $(e).height()
    }
}

function nowOffset(obj){
    var loc =   nowLocation(obj.nowLocations.bodySize, obj.nowLocations.anchorLoc,obj.nowLocations.backImage,{
        width: $("#canvas").width(),
        height: $("#canvas").height()
    },obj.nowLocations.size);

    offset = {
        top: loc.y -loc.height,
        left: loc.x
    }
    obj.style.left=offset.left.toFixed(2)+"px";
    obj.style.top=offset.top.toFixed(2)+"px";
    obj.style.width=loc.width.toFixed(2)+"px";
    obj.style.height=loc.height.toFixed(2)+"px";
    $(obj.$el).css({
        "position":"absolute",
        "left":offset.left.toFixed(2)+"px",
        "top":offset.top.toFixed(2)+"px",
        "width":loc.width.toFixed(2),
        "height":loc.height.toFixed(2)
    });

}

function drag(ev)
{
    ev.dataTransfer.setData("id",ev.target.id);
}

//生成缩略图
function newthumbnail(methods,obj){
    var canvasurl="";
    var canvas2 = document.createElement("canvas");
    var _canvas = document.querySelector('.conf-work');
    var w = parseInt(window.getComputedStyle(_canvas).width);
    var h = parseInt(window.getComputedStyle(_canvas).height);
    //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 2;
    canvas2.height = h * 2;
    canvas2.style.width = w + "px";
    canvas2.style.height = h + "px";
    //可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    var context = canvas2.getContext("2d");
    context.scale(2,2);
    html2canvas(document.querySelector('.conf-work'),{canvas:canvas2}).then(function(canvas) {
        //   document.body.appendChild(canvas);
        canvasurl=canvas.toDataURL();
        methods(obj,canvasurl);
        //canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        //    document.querySelector(".down").setAttribute('href',canvas.toDataURL());
    });
}

function getControl(TemplateAll,id){
    var obj;
    $.each(TemplateAll,function(index,value){
        if(value.$el.id=="lon_"+id){
            obj=value;
            return false;
        }

    });
return obj;
}
