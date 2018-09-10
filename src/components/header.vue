<template>

  <header class="header">


    <div class="bln-logo"><a href="http://hd.boloni.cn/190-20.html" target="_blank"><img src="../assets/logo.png"/></a></div>


    <div class="bln-right">

      <div class="bln-ios">

        <RadioGroup v-model="phone" @on-change="choiceFun">
          <Radio label="iphone">
            <Icon type="md-phone-portrait" />
            <span>iPhone</span>
          </Radio>
          <Radio label="ipad">
            <Icon type="md-tablet-portrait" />
            <span>iPad</span>
          </Radio>
        </RadioGroup>

      </div>

      <div class="bln-avatar">

        <Dropdown trigger="click" placement="bottom-end">
          <a href="javascript:void(0)">
            <Avatar class="bln-img">{{username}}</Avatar>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="toSignOut">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </div>

    </div>

  </header>

</template>

<script>

  import { removeToken } from "../utils/auth"
  export default {
    inject:['reload'],
    data(){
      return {
        username:sessionStorage.getItem("username"),
        phone: sessionStorage.getItem("choice") == null? "iphone" : sessionStorage.getItem("choice"),
      }
    },
    methods: {
      toSignOut:function(){
        this.$router.push({path:"/login"})
        removeToken()
      },
      choiceFun(val){
         sessionStorage.setItem("choice",val);
         this.reload()
      }
    }
  }


</script>
