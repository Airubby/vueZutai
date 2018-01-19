/**
 * 加载组态界面JS
 */

 var LOAD_MODEL="DISPLAY"

        var TemplateAll=new Array();


        var obj="";
        var attribute="";
        $(document).ready(function(){
        function LoadView(id){
           $("#canvas").empty().attr("style","").attr(":style","style");
            $.post(getRootPath()+"/template/"+id+"/template.json",{},function(request){
                var  canvas=new Vue({
                    'el': '#canvas',
                    data:{
                        style: request.style,
                        item:request.item
                    },
                    mounted:function(){
                        for(var i=0;i<this.item.length;i++){
                            var template=getAssemblyTp(this.item[i].type);
                            template.setting=this.item[i];
                            var id="lon_"+this.item[i].type+this.item[i].devid;
                            $(this.$el).append(template.element.format(id));
                            var doms=new Vue({
                                el:'#'+id,
                                data:template.setting,
                                methods:{
                                    drag: function (event) {
                                        dom = this;
                                    },
                                    nowOffset:function(){
                                        nowOffset(this);

                                    },countlocation:function(){
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
                            pushArray(doms);
                        }

                    },
                    methods: {
                       
                    }
                });
            });
        }


	$.get(getRootPath()+"/ismacsite/emap/query",{},function(request){
		if(request.err_code=="0"){
			InintMeun(request.data);
		}
	});

        function InintMeun(data){

            //初始化面板页面，包括组件
          menu=new  Vue({
                el: '#menu',
                data: {
                    data:[],
                    isA:false,
                    activeName:"second",
                    addrdata:data,//[{"name":"机房1","background":"background: url(../template/111111/11112567.png) 50% 50% / contain no-repeat","id":"111111"}],
                    form:{
                        addrname:"",
                        region:"",
                        details:""

                    }

                },
                mounted:function(){
                    $("div[id*='control']").click();
                    //添加滚动
                    
                    $('#pane-second ,#pane-first').css("height","100%");
                    $('#pane-second ,#pane-first').niceScroll({
                        cursorcolor: "#ccc",//#CC0071 光标颜色
                        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                        cursorwidth: "5px", //像素光标的宽度
                        cursorborder: "0", // 游标边框css定义
                        cursorborderradius: "5px",//以像素为光标边界半径
                        autohidemode: true //是否隐藏滚动条
                    });
                },
                methods:{
                    init:function(obj){
                        var template=getAssemblyTp(obj.type);
                        var id="lon_"+obj.type+obj.devid;
                        if($("#canvas").find("#"+id).length>0){
                            return "";
                        }
                        return template.element.format(id);
                    },
                    initobj:function(obj){
                        var template=getAssemblyTp(obj.type);
                        var id="lon_"+obj.type+obj.devid;
                        template.setting.devid=obj.devid;
                        if($("#canvas").find("#"+id).length>0){
                            return "";
                        }
                        var doms=new Vue({
                            el:'#'+id,
                            data:template.setting,
                            methods:{
                                drag: function (event) {
                                    dom = this;
                                }
                            }
                        });


                    },
                    toggle:function(cur){
                        this.isA = cur;
                    },
                    design:function(id){
                      //设计
                     top.location.href=getRootPath()+"/zut/index.html?id="+id;
                    },
                    add:function(){
                      /*  $.post(getRootPath()+"/TemplateServlet",{"cmd":"add"},function(request){
                         console.log(request);
                        })*/
                    	dialog.dialogVisible=true;
                    	dialog.form={};
                    },
                    addrdelete:function(obj){
                    	var objs=this;
                    	this.$confirm('此操作将永久删除电子地图, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                        	  $.post(getRootPath()+"/ismacsite/emap/delete",{"id":obj.id},function(request){
                         		 if(request.err_code=="0"){
                         			 objs.$message({
                                          message: '操作成功!',
                                          type: 'success'
                                      });
                                      objs.addrdata.remove(obj)
                                      objs.dialogVisible=false;
                                  }else{
                                 	 objs.$message.error('操作失败!');
                                  }
                              })
                          })
                    	
                    	
                    	
                    },
                    addrupdate:function(obj){
                    	dialog.form=$.extend(true,{},obj);
                    	dialog.dialogVisible=true;
                    },
                    LoadJson:function(id){
                        LoadView(id);

                    }


                }
            })
        }
        dialog=new Vue({
            el:"#dialog",    
        	data:function(){
                return {
                    dialogVisible: false,
                    form:{
                    },
                    addrall:new Array()
                };
            },
            mounted:function(){
                var obj=this;
                $.post(getRootPath()+"/ismacsite/addr/query",{},function(request){
                    if(request.err_code=="0"){
                    for(var i=0;i<request.data.length;i++){
                        var parmt={};
                        parmt.name=request.data[i].p_name;
                        parmt.id=request.data[i].id;
                        obj.addrall.push(parmt)
                    }
                    }
                });
            },
            methods:{
            	
            
                handleClose:function(done) {
                    done();
            },
            handleAdd:function(){


                    var obj=this;
                    var cmd="add";
                    if(this.form.id){
                        cmd="update";

                    }
                    var parm={};
                    parm.elecmap=obj.form
            	  $.post(getRootPath()+"/ismacsite/emap/"+cmd,{"model":JSON.stringify(parm)},function(request){
                      if(request.err_code=="0"){
                          obj.$message({
                              message: '保存成功!',
                              type: 'success'
                          });
                         
                          if(cmd!="update"){
                        	  obj.form.id=request.data;
                        	  menu.addrdata.push(obj.form);
                          }else{
                        	// menu.addrdata.update(obj.form,"id");
                        	  for(var i=0;i<menu.addrdata.length;i++){
                        		  if(menu.addrdata[i].id==obj.form.id){
                        			  menu.addrdata[i].name= obj.form.name;
                        			  menu.addrdata[i].content=obj.form.content;
                        			  menu.addrdata[i].addr_id= obj.form.addr_id;
                        			  break;
                        		  }
                        	  }
                          }
                          
                          obj.dialogVisible=false;
                      }else{
                          obj.$message.error('保存失败!');
                      }
	              })
            	
            }
            
        }
        });
        
        
        $(document.body).resize(function() {
            $.each(TemplateAll,function(index,value){
                value.nowOffset();
            });
        });
        
        })
        // setTimeout(function(){
        //     /*$.each(TemplateAll,function(index,value){
        //         if(value.$el.id=="lon_10209351971"){

        //             value.alarm=true;
        //             console.log(value);
        //         }

        //     });*/
        //  var obj=getControl(TemplateAll,"10209351971");
        //     obj.alarm=true;
        //     obj.tip.push({"name":"小水珠1","id":"Leak_Droplet","value":0})
        //     },2000)
        document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
