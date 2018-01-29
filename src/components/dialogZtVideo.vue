<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width">
        <div class="loncom_public_table loncom_dialog_scroll" style="height:500px;">
            视频播放信息
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
            
        }
    },
    methods:{
        //关闭dialog
        closeDialog:function(){
        },
        
        
    },
    
    watch:{
       
    },
    props:["dialogInfo"]  
}
</script>

