<template>
    <div class="loncom_content">
        <div v-for="item in video_list">
            <TestIndexzj v-bind:dialogInfo="item"></TestIndexzj>
        </div>
        
    </div>
</template>


<script>
import Vue from 'vue';
import TestIndexzj from '../components/testIndexzj.vue'
export default {
    created () {
        
    },
    mounted() {
        
    },
    data() {
       return {
           video_list:[
                {id:'1',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000105'},
                {id:'2',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000106'},
                {id:'3',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000107'},
                {id:'4',img:'video.png',setting:'192.168.10.64,80,admin,admin@1234',type:'video',devid:'700000108'},
           ],
       }
   },
    methods:{
       
    },
    components:{TestIndexzj}
}
</script>




