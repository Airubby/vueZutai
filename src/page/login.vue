<template>
    <div class="loncom_login">
        <div class="loncom_login_con loncom_public_shadow">
            <div class="loncom_logo_img"></div>
            <div class="loncom_logo_text">机房监控管理系统</div>
            <div class="loncom_login_input">
                <el-form :model="user" :rules="rules" ref="userName">
                    <el-form-item prop="userid" class="loncom_user">
                        <el-input v-model.trim="user.userid" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="psword" class="loncom_pass">
                        <el-input v-model.trim="user.psword" placeholder="请输入登录密码" @keyup.native="keyLogin($event,'userName')"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="loginIn('userName')" @keydown="keyLogin($event,'userName')">登录</el-button>
                </el-form>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  
 data(){
  
  	return {
        user:{
            userid:"",
            psword:""
        },
        rules: {
			userid:[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
			],
			psword:[
				{ required: true, message: '请输入密码', trigger: 'blur' },
			]
		 }
  	}
  },
  methods:{
      keyLogin:function(ev,user){
		if(ev.keyCode == 13){
			this.loginIn(user);
		}
	  },
      loginIn:function(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$message({
                    message: '恭喜你，登录成功！',
                    type: 'success'
                });
                var loginInfo = {};
                //这里保存一些用户信息，后面需要
                if (localStorage.loginInfo) {
                    loginInfo = JSON.parse(localStorage.loginInfo);
                }
                loginInfo.userid = this.user.userid;
                loginInfo.psword = this.user.psword;
                localStorage.loginInfo = JSON.stringify(loginInfo);
                this.$router.push({path:'/'});
            } 
        });
          
      }
  }
}
</script>