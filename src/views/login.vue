<template>


  <div class="bln-login-box">
    <h2>boloni内容发布系统</h2>
    <Input class="bln-login-input" @keyup.enter="toLogin" v-model="username" :maxlength="30" size="large" placeholder="请输入用户名" />
    <Input class="bln-login-input" @keyup.enter="toLogin" v-model="password" :maxlength="16" type="password" size="large" placeholder="请输入密码"/>
    <Button type="primary" :loading="loading" class="bln-login-btn" @click="toLogin" long>登录</Button>

  </div>

</template>
<style scoped>
@import "../style/login.min.css";
</style>

<script>
  import api from "../api"
  import { validateUsername,validatePassword } from "../utils/validate";
  import { setToken } from "../utils/auth";

  export default {
    data(){
      return {
        loading: false,
        username:'',
        password:'',
      }
    },
    methods: {
      toLogin:function(){
        const _this = this;
        if(!validateUsername(_this.username)){
          _this.$Message.warning("请输入正确的用户名");
        }else if(!validatePassword(_this.password)){
          _this.$Message.warning("请输入正确的密码");
        }else{
          _this.loading = true;
          const data = { "employeeId": _this.username,"password":_this.password }
          _this.$post(api.loginByUsername,data).then((response) => {
            if(response.data.code == 0){
              setToken(response.data.data.token);
              sessionStorage.setItem("username",response.data.data.name);
              _this.$router.push({path:"/app"})
            }else{
              _this.loading = false;
              _this.$Loading.error();
              if(response.data.code == 10001){
                _this.$Message.warning("用户名或密码错误！");
              }
            }
          }).catch((err) => {
            _this.loading = false;
            console.log(err.message)
          })
        }
      },
    },
}

</script>


