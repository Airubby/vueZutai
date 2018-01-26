<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width" @before-close="closeDialog">
        <div class="loncom_public_table loncom_dialog_scroll" style="height:300px;">
            <el-form :model="map_list" :rules="formRules" ref="formInfo">
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>地图名称
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="name">
                            <el-input size="small" v-model="map_list.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>站点
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="addr">
                            <el-select v-model="map_list.addr" placeholder="请选择">
                                <el-option
                                v-for="item in addr_info"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        详情
                    </div>
                    <div class="loncom_list_box_right">
                        <textarea style="height: 100px;" placeholder="请输入内容" v-model="map_list.descriotion"> </textarea>
                    </div>
                </div>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary" @click="dialogSure('formInfo')">保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>

export default {
    created () {
        
    },
    mounted() {
        
    },
    data() {
        return {
            dialog_info:this.dialogInfo,
            map_list:{},
            formRules:{
                name:[
                    { required: true, message: '请填写地图名称', trigger: 'blur' },
                ],
                addr:[
                    { required: true, message: '请选择站点', trigger: 'blur' },
                ]
            },
            addr_info:[
                {
                value: '数据机房',
                label: '数据机房'
                }, {
                value: '数据机房1',
                label: '数据机房1'
                },
            ],
            
        }
    },
    methods:{
        //保存的操作
        dialogSure:function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                    this.dialogInfo.visible=false;   
                    if(this.dialogInfo.type=="edit"){
                        this.$parent.map_list.splice(this.dialogInfo.index,1,this.map_list);
                        var mapInfo=JSON.parse(localStorage.mapInfo);
                        mapInfo.map_list[this.dialogInfo.index].name=this.map_list.name;
                        mapInfo.map_list[this.dialogInfo.index].addr=this.map_list.addr;
                        mapInfo.map_list[this.dialogInfo.index].descriotion=this.map_list.descriotion;
                        localStorage.mapInfo = JSON.stringify(mapInfo);
                    }else{
                        this.$parent.map_list.push(this.map_list);
                        var list=this.map_list;
                        list.img='';
                        list.jsonArr=[];
                        var mapInfo=JSON.parse(localStorage.mapInfo);
                        mapInfo.map_list.push(list);
                        localStorage.mapInfo = JSON.stringify(mapInfo);
                    }
                    this.map_list={};
                    this.dialogInfo.data={};
                }
            })
        },
        //取消操作
        dialogCancel:function(){
            this.map_list={};
            this.dialogInfo.data={};
            this.dialogInfo.visible=false;   
        },
        //关闭dialog
        closeDialog:function(){
            this.map_list={};
            this.dialogInfo.data={};
        },
        
        
    },
    
    watch:{
        'dialog_info.data':function(val,oldVal){
            this.map_list=val;
        }
    },
    props:["dialogInfo"]  
}
</script>

