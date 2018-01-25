
import alert from '../../components/testIndexzj.vue'
import Vue from 'vue';
let MyMsgConstructor = Vue.extend(alert);
let instance;
var MyMsg=function(msg,callback){

 instance= new MyMsgConstructor({
     data:{
         message:msg
    },
    // methods:{
    //     onClose:callback
    // } 
})

//如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
instance.$mount();
 document.body.appendChild(instance.$el)
 return instance;
}


export default MyMsg;