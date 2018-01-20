<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_public_table loncom_dialog_scroll" style="height:300px;">
            <el-form :model="dialog_info" :rules="formRules" ref="formInfo">
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>地图名称
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="data.name">
                            <el-input size="small" v-model="dialog_info.data.name"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="loncom_list_boxform">
                    <div class="loncom_list_box_left">
                        <em>*</em>站点
                    </div>
                    <div class="loncom_list_box_right">
                        <el-form-item prop="data.addr">
                            <el-select v-model="dialog_info.data.addr" placeholder="请选择">
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
                        <textarea style="height: 100px;" placeholder="请输入内容" v-model="dialog_info.data.descriotion"> </textarea>
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
            //备份数据
            dialog_info:this.dialogInfo,
           
            formRules:{
                'data.name':[
                    { required: true, message: '请填写地图名称', trigger: 'blur' },
                ],
                'data.addr':[
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
                }
            })
        },
        //取消操作
        dialogCancel:function(){
            this.dialogInfo.visible=false;   
        },
        
    },
    watch:{
        dialogInfo(val){
            this.add_info=val;
        },
        add_info(val){
            this.$emit('dialogInfo',val);
        }
    },
    props:["dialogInfo"]  
}
</script>

