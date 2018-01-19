/**
 * 组件
 * 
 */




//获取设备创建的组态模板
function getAssemblyTp(key,type){
    switch (key){
        case "video"://视频
            if(type){
                return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                    style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/video_bg.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    }};
            }else{
                return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-video v-bind:devid="devid"  v-bind:setting="setting"    v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-video>  </div> ',
                    setting:{title:"",tip:[],style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/video_bg.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    },type:'video',alarm:false}};
            }
            break;
        case "203" ://空调
             if(type){
                 return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                     style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     }};
             }else{
                 return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-ari v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-ari>  </div> ',
                     setting:{title:"",tip:[],style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     },type:'203',alarm:false}};

             }
            break;
        case "103" ://烟感

            if(type){
                return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                    style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/pin4.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    }};

            }else{
                return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-smoke v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-smoke>  </div> ',
                    setting:{title:"",tip:[],style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/pin4.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    },type:'103',alarm:false}};
            }
            break;
        case "101" ://温湿度
             if(type){
                 return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                     style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     }};

             }else{
                 return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-sensor v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-sensor>  </div> ',
                     setting:{title:"",tip:[],style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     },type:'101',alarm:false}};

             }
            break;
        case "102" ://漏水
            if(type){
                return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                    style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/pin4.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    }};
            }else{
                return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-water v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-water>  </div> ',
                    setting:{title:"",tip:[],style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/pin4.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    },type:'102',alarm:false}};

            }
            break;
        case "201" ://UPS
             if(type){
                 return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                     style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     }};

             }else{
                 return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-ups v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-ups>  </div> ',
                     setting:{title:"",tip:[],style: {
                         width: '60px',
                         height: '60px',
                         "background": "url(img/pin4.png)",
                         "background-repeat": "no-repeat",
                         "background-position":"center center",
                         "background-size":" contain"
                     },type:'201',alarm:false}};

             }
            break;
        case "access" ://门禁
            if(type){
                return {element:'<div id="{0}" draggable="true" ondragstart="drag(event)" data-setting="{2}"  data-type="{3}"  data-devid="{4}"  style="{1}"></div> ',
                    style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/access.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    }};

            }else{

                return {element:'<div id="{0}" draggable="true" @drag="drag($event)"  :style="style"  >   <lon-access v-bind:devid="devid"   v-bind:alarm="alarm"   v-bind:title="title"  :tip="tip" ></lon-access>  </div> ',
                    setting:{title:"",tip:[],style: {
                        width: '60px',
                        height: '60px',
                        "background": "url(img/access.png)",
                        "background-repeat": "no-repeat",
                        "background-position":"center center",
                        "background-size":" contain"
                    },type:'access',alarm:false}};
            }
            break;
    }
}


//创建组件对象
function newVueControl(control){
    return new Vue({
        el:'#'+control.id,
        data:control.data,
        methods:{
            drag: function (event) {
                dom = this;
            },
            toJSON:this.setting.toJSON || function toJSON(){
                var json={};
                json.style=this.style;
                json.title=this.title;
                json.tip=this.tip;
                json.type=this.type;
                json.devid=this.devid;
                json.alarm=this.alarm;
                json.setting=this.setting;
                json.nowLocations={};
                json.nowLocations.backImage=getBackgroundImageSize($("#canvas"));
                json.nowLocations.bodySize={
                    width: $("#canvas").width(),
                    height: $("#canvas").height()
                };
                json.nowLocations.anchorLoc={
                    x: this.$el.offsetLeft,
                    y:  this.$el.offsetTop+62
                };
                json.nowLocations.size={
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                }
                return json;

            },
            nowOffset:function(){
                nowOffset(this);

            },countlocation:function(){
                this.nowLocations={};
                this.nowLocations.backImage=getBackgroundImageSize($("#canvas"));
                var widths=getStyle(document.querySelector(".conf-nav"),"opacity");

                this.nowLocations.bodySize={
                    width: $("#canvas").width(),
                    height: $("#canvas").height()
                };
                this.nowLocations.anchorLoc={
                    x: this.$el.offsetLeft,
                    y:  this.$el.offsetTop+62
                };

                this.nowLocations.size={
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                }

            }
        }
    });

}


//视频组件对象
Vue.component('lon-video',{
    props:['title','tip','style','devid','alarm','setting','nowLocation'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
       /* settings.title=this.title+"";
        settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+"></div></div>";
            }

        console.log(this);
        $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);*/
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                  /*  if(key=="tip"){
                        attribute.form["tip"] =new Array();
                        for(var i=0;i<dom.toJSON()["tip"].length;i++){
                            attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                        }

                    }*/
                }
                attribute.Initdevpoint(this.devid);
            }else{
            	windowOpen("../video_preview.html");
            	
            }
        }

    }
});



//门禁组件对象
Vue.component('lon-access',{
    props:['title','tip','style','devid','alarm','setting'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
            settings.title=this.title+"";
            settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+">"+this.value+"</div></div>";
            }

            $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                    /*  if(key=="tip"){
                     attribute.form["tip"] =new Array();
                     for(var i=0;i<dom.toJSON()["tip"].length;i++){
                     attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                     }

                     }*/
                }
                attribute.Initdevpoint(this.devid);
            }
        }
    }
});



//空调组件对象
Vue.component('lon-ari',{
    props:['title','tip','style','devid','alarm','setting'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
            settings.title=this.title+"";
            settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+"></div></div>";
            }

            console.log(this);
            $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                    /*  if(key=="tip"){
                     attribute.form["tip"] =new Array();
                     for(var i=0;i<dom.toJSON()["tip"].length;i++){
                     attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                     }

                     }*/
                }
                attribute.Initdevpoint(this.devid);
            }
        }
    }
});

//温湿度组件对象
Vue.component('lon-sensor',{
    props:['title','tip','style','devid','alarm','setting'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
            settings.title=this.title+"";
            settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+"></div></div>";
            }

            console.log(this);
            $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                    /*  if(key=="tip"){
                     attribute.form["tip"] =new Array();
                     for(var i=0;i<dom.toJSON()["tip"].length;i++){
                     attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                     }

                     }*/
                }
                attribute.Initdevpoint(this.devid);
            }
        }
    }
});



//空调组件对象
Vue.component('lon-ups',{
    props:['title','tip','style','devid','alarm','setting'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
            settings.title=this.title+"";
            settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+"></div></div>";
            }

            console.log(this);
            $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                    /*  if(key=="tip"){
                     attribute.form["tip"] =new Array();
                     for(var i=0;i<dom.toJSON()["tip"].length;i++){
                     attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                     }

                     }*/
                }
                attribute.Initdevpoint(this.devid);
            }
        }
    }
});


//漏水组件对象
Vue.component('lon-water',{
    props:['title','tip','style','devid','alarm','setting'],
    template:'<div v-on:click="setsetting($event)"   class="View video"><i  class="icon-circle" :class="{color_red:alarm,color_green:!alarm}"  ></i></div>',
    data:{
    },
    mounted:function(){
        if(LOAD_MODEL!="EDIT"){
            settings.title=this.title+"";
            settings.content="";

            for(var i=0;i<this.tip.length;i++){
                var obj=JSON.parse(this.tip[i]);
                settings.content+="<div class='webui-popover-msg'><div class='webui-popover-float' style='text-align: right;'>"+obj.name+":</div><div class='webui-popover-float' id="+this.devid+"_"+obj.id+"></div></div>";
            }

            console.log(this);
            $('#'+this.$parent.$el.id).webuiPopover('destroy').webuiPopover(settings);
        }
    },
    methods:{
        setsetting:function(event) {
            if (LOAD_MODEL == "EDIT") {
                event.stopPropagation();
                dom = this.$parent;
                $(".conf-panel").removeClass("loncom-fadeoutR").addClass("loncom-fadeinR").show();
                for (key in dom.toJSON()) {
                    if (key == "style") {
                        var background = dom.toJSON()[key].background;
                        var url = background.substr(background.lastIndexOf("(") + 1, background.lastIndexOf(")") - 4);
                        attribute.form["background"] = [{"name": "", "url": url}];
                    }

                    attribute.form[key] = dom.toJSON()[key];
                    /*  if(key=="tip"){
                     attribute.form["tip"] =new Array();
                     for(var i=0;i<dom.toJSON()["tip"].length;i++){
                     attribute.form["tip"].push(dom.toJSON()["tip"][i]);
                     }

                     }*/
                }
                attribute.Initdevpoint(this.devid);
            }
        }
    }
});

