<template>
    <div class="loncom_index">
        zutai
    </div>
</template>





<script>

import Vue from 'vue' 


export default {
  created () {
    // this.$api.get('/base/subevent', {"Url":"menu","action":"query","model":JSON.stringify({"id":"0"})}, r => {
    //   console.log(r);

    //   if(r.err_code=="0"){
    //     this.listData=r.data;
    //     for(var i=0;i<this.listData.length;i++){
    //         Vue.set(this.listData[i],'loncom_active',false);
    //         if(this.listData[i].devlist.length>0){
    //             var devcountall=0;
    //             var isalarmall=0;
    //             for(var j=0;j<this.listData[i].devlist.length;j++){
    //                 devcountall+=this.listData[i].devlist[j].devcount;
    //                 isalarmall+=this.listData[i].devlist[j].isalarm;
    //             }
    //             Vue.set(this.listData[i],'infoClass',true);
    //             Vue.set(this.listData[i],'devcountall',devcountall);
    //             Vue.set(this.listData[i],'isalarmall',isalarmall);
    //         }else{
    //             Vue.set(this.listData[i],'infoClass',false);
    //         }
    //     }
    //   }


    // })

        if(JSON.stringify(localStorage.loginInfo) == undefined){
            this.$message({
                message: "请登录",
                type: 'warning'
            });
            this.$router.push({path:'/login'});
            return;
        }


  },
  mounted() {
    //首页隐藏滚动
    indexScroll();
   
  },
  data() {
    return {
        
    }
  },
  methods:{
    
  }
  
}
</script>

